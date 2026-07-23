#!/usr/bin/env bash
# KQL syntax + schema validation — the "compile" tier.
#
# Runs the rule's query against a Log Analytics workspace over a tiny time
# window with `| take 0` appended. Nothing is returned, but the service still
# PARSES the query and resolves every table/column against the real schema —
# so a syntax error or a reference to a non-existent column fails the job.
# Needs only READ access to a workspace (a dev one is fine).
#
# Usage:
#   ./kql_check.sh <workspace-guid> rules/AR-Ident-BruteForce-SigninLogs.json
#
# Requires: az CLI (logged in), jq. In CI, authenticate with OIDC before this.
set -euo pipefail

WORKSPACE_GUID="${1:?usage: kql_check.sh <workspace-guid> <rule.json>}"
RULE_FILE="${2:?usage: kql_check.sh <workspace-guid> <rule.json>}"

# Pull the KQL out of the ARM template (first alertRules resource).
QUERY=$(jq -r '.resources[] | select(.type | endswith("/alertRules")) | .properties.query' "$RULE_FILE")

if [[ -z "$QUERY" || "$QUERY" == "null" ]]; then
  echo "FAIL: no query found in $RULE_FILE"
  exit 1
fi

# Append `| take 0` so the parse/schema-resolve happens but no rows come back.
VALIDATION_QUERY=$(printf '%s\n| take 0' "$QUERY")

echo "Validating KQL from $RULE_FILE against workspace $WORKSPACE_GUID ..."
if az monitor log-analytics query \
      --workspace "$WORKSPACE_GUID" \
      --analytics-query "$VALIDATION_QUERY" \
      --timespan "PT5M" \
      -o none 2>err.log; then
  echo "PASS: KQL parses and all tables/columns resolve."
  rm -f err.log
else
  echo "FAIL: KQL did not validate —"
  sed 's/^/   /' err.log
  rm -f err.log
  exit 1
fi

# Fully-offline alternative (no workspace): parse with the Kusto language
# library (Microsoft.Azure.Kusto.Language, .NET) and fail on any diagnostic.
# Heavier to set up, but validates syntax with zero Azure dependency.
