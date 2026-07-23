# Detection-as-Code for Microsoft Sentinel — runnable example

Companion code for the [Detection-as-Code deep dive](https://your-hub/topics/detection-as-code-cicd).
A single analytic rule, expressed two ways (ARM and Terraform), with the
CI/CD pipeline and validation checks that ship it safely to a workspace.

Clone it, read it, run the linter locally, and adapt the workflow to your
own lab. Nothing here touches a real tenant until you wire in your own
Azure credentials.

## What's inside

```
detection-as-code-cicd/
├── rules/
│   └── AR-Ident-BruteForce-SigninLogs.json   # the rule as an ARM template
├── terraform/
│   ├── main.tf                               # the same rule as Terraform
│   └── variables.tf
├── scripts/
│   ├── lint_rule.py                          # static metadata linter (the "SAST" check)
│   └── kql_check.sh                          # KQL syntax/schema check via the query API
├── tests/
│   └── functional_test.md                    # the "DAST" check: does it fire on samples?
└── workflows/
    └── validate-and-deploy.yml               # GitHub Actions: CI validate + CD deploy
```

> The workflow lives under `workflows/` (not `.github/workflows/`) on purpose
> — it's a sample to copy into your own detections repo, not a workflow that
> should run on this site's repo.

## The rule

`AR-Ident-BruteForce-SigninLogs` — fires when a single account sees ≥10
failed interactive sign-ins (`ResultType 50126`) from one IP within an hour.
Maps to MITRE ATT&CK **T1110 (Brute Force)**, tactic **Credential Access**.

## Try the static check now (no Azure needed)

```bash
python3 scripts/lint_rule.py rules/AR-Ident-BruteForce-SigninLogs.json
```

It asserts the rule has a display name, a valid severity, a non-empty query,
MITRE tactics + techniques, entity mappings, a compliant name, and no
hardcoded workspace GUIDs. Break one of those in the JSON and watch it fail —
that's the CI gate rejecting a bad PR before it can merge.

## The three validation tiers (mapped to app-sec)

| Tier | App-sec analog | File | Needs a workspace? |
|------|----------------|------|--------------------|
| Static lint | SAST / linting | `scripts/lint_rule.py` | no |
| KQL syntax + schema | compile | `scripts/kql_check.sh` | read-only |
| Does it fire? | DAST | `tests/functional_test.md` | yes (dev) |

`workflows/validate-and-deploy.yml` runs tier 1–2 in CI on every pull
request, and tier 3 after merge to `develop`.

## Deploy for real (your lab)

ARM:
```bash
az deployment group create \
  --resource-group rg-sentinel-dev \
  --template-file rules/AR-Ident-BruteForce-SigninLogs.json \
  --parameters workspace=<your-workspace-name>
```

Terraform:
```bash
cd terraform && terraform init && terraform apply
```

See the deep dive's five-stage lab path for the full walkthrough.
