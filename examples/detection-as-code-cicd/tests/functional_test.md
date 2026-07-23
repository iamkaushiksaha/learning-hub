# Functional test — the "DAST" tier

Static checks prove the rule is *well-formed*. This proves it *works*: given
known-malicious input, does the detection actually fire — and does it stay
quiet on benign input? This runs after merge, against the dev workspace with
sample data, because it needs a live Sentinel to execute against.

## The idea

1. Seed the dev workspace (or an ADX cluster) with sample `SigninLogs` that
   contain a planted brute-force pattern: one account, one IP, ≥10 rows with
   `ResultType 50126` inside an hour — plus benign rows that must NOT trigger.
2. Run the rule's query.
3. Assert: exactly the planted account/IP is returned (true positive), and
   the benign traffic is absent (no false positive).

## Test data (excerpt)

`sample_signinlogs.csv` — 12 failed sign-ins for `attacker.target@contoso.com`
from `203.0.113.45` within one hour (the true positive), plus a handful of
normal successful sign-ins and one isolated failure (must not fire).

Kaushik's `cybersecurity-research` repo already ships this kind of sample:
`reference/sentinel-tables/SigninLogs/SigninLogs_sample.csv` and the ADX
ingestion lab. Point the test at those instead of maintaining a second copy.

## Assertion query

Append a self-check to the detection query and assert the outcome:

```kql
let Detection =
    SigninLogs
    | where ResultType == 50126
    | summarize FailedAttempts = count() by UserPrincipalName, IPAddress, bin(TimeGenerated, 1h)
    | where FailedAttempts >= 10;
Detection
| summarize hits = count(),
            has_true_positive = countif(UserPrincipalName == "attacker.target@contoso.com"),
            has_false_positive = countif(UserPrincipalName != "attacker.target@contoso.com")
```

Pass condition: `has_true_positive == 1` and `has_false_positive == 0`.
Wire that into the CD job so a rule that stops detecting (or starts
over-firing) fails the pipeline before it reaches prod.

## Why it belongs after merge

Deploying and querying a live workspace is slower and needs write access —
too heavy for every PR. So the cheap static checks gate the merge, and this
richer behavioural test runs once, in the dev stage, on the merged result.
Same shift-left logic as unit tests (fast, every commit) vs integration
tests (slower, post-merge).
