#!/usr/bin/env python3
"""Static metadata linter for a Sentinel analytic rule (ARM template).

The "SAST" tier of detection validation: checks structure and metadata
WITHOUT a workspace or Azure credentials, so it runs on every pull request
as a fast CI gate. Exits non-zero (fails the PR) on any violation.

Usage:
  python3 lint_rule.py rules/AR-Ident-BruteForce-SigninLogs.json [more.json ...]
"""

import json
import re
import sys
from pathlib import Path

ALLOWED_SEVERITY = {"Informational", "Low", "Medium", "High"}
NAME_PATTERN = re.compile(r"^AR-[A-Za-z0-9]+-[A-Za-z0-9-]+$")  # AR-<domain>-<name>
GUID_PATTERN = re.compile(r"[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}")


def rule_name(res: dict) -> str:
    # name looks like "[concat(parameters('workspace'), '/Microsoft.SecurityInsights/AR-...')]"
    raw = res.get("name", "")
    tail = raw.rstrip("')]").split("/")[-1]
    return tail


def lint(path: Path) -> list[str]:
    errors: list[str] = []
    try:
        doc = json.loads(path.read_text(encoding="utf-8"))
    except json.JSONDecodeError as e:
        return [f"invalid JSON: {e}"]

    resources = doc.get("resources", [])
    rules = [r for r in resources if str(r.get("type", "")).endswith("/alertRules")]
    if not rules:
        return ["no analytic-rule resource (…/alertRules) found"]

    for res in rules:
        p = res.get("properties", {})
        name = rule_name(res)

        if not NAME_PATTERN.match(name):
            errors.append(f"[{name}] name must match AR-<domain>-<name> (got '{name}')")
        if not p.get("displayName", "").strip():
            errors.append(f"[{name}] missing displayName")
        if p.get("severity") not in ALLOWED_SEVERITY:
            errors.append(f"[{name}] severity must be one of {sorted(ALLOWED_SEVERITY)}")
        query = p.get("query", "")
        if not query.strip():
            errors.append(f"[{name}] query is empty")
        if not p.get("tactics"):
            errors.append(f"[{name}] no MITRE tactics tagged")
        if not p.get("techniques"):
            errors.append(f"[{name}] no MITRE techniques tagged")
        if not p.get("entityMappings"):
            errors.append(f"[{name}] no entityMappings (incidents won't correlate entities)")
        for field in ("queryFrequency", "queryPeriod", "triggerOperator"):
            if not p.get(field):
                errors.append(f"[{name}] missing scheduling field '{field}'")
        # environment-specific values must be parameterized, not hardcoded
        if GUID_PATTERN.search(query):
            errors.append(f"[{name}] query contains a hardcoded GUID — parameterize it")

    return errors


def main() -> int:
    files = sys.argv[1:]
    if not files:
        print(__doc__)
        return 2
    total = 0
    for f in files:
        errs = lint(Path(f))
        if errs:
            total += len(errs)
            print(f"FAIL  {f}")
            for e in errs:
                print(f"   - {e}")
        else:
            print(f"PASS  {f}")
    print(f"\n{total} issue(s) across {len(files)} file(s)")
    return 1 if total else 0


if __name__ == "__main__":
    sys.exit(main())
