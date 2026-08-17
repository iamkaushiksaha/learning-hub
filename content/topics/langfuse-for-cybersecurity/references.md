# References and claim map

Checked on 2026-08-18. Prefer these primary product sources when refreshing the
published page.

| Source | Claim supported |
|---|---|
| [Langfuse documentation](https://langfuse.com/docs) | Product scope: observability, prompt management, evaluation, datasets |
| [Architecture](https://langfuse.com/handbook/product-engineering/architecture) | API, object storage, queue, worker, PostgreSQL, and ClickHouse roles |
| [Sessions](https://langfuse.com/docs/observability/features/sessions) | Grouping related traces and session-level analysis |
| [Users](https://langfuse.com/docs/observability/features/users) | User-level usage, cost, trace, and feedback analysis |
| [Scores via SDK](https://langfuse.com/docs/evaluation/evaluation-methods/scores-via-sdk) | Numeric, categorical, boolean, and text scores on traces, observations, or sessions |
| [Evaluation concepts](https://langfuse.com/docs/evaluation/core-concepts) | Online/offline evaluation and experiment concepts |
| [Annotation queues](https://langfuse.com/docs/evaluation/evaluation-methods/annotation-queues) | Human review workflow |
| [Prompt management](https://langfuse.com/docs/prompt-management/get-started) | Runtime prompt retrieval and versioning |
| [Prompt data model](https://langfuse.com/docs/prompt-management/data-model) | Immutable versions and mutable labels |
| [Masking](https://langfuse.com/docs/observability/features/masking) | Redacting sensitive data before it leaves the application |
| [Data isolation](https://langfuse.com/security/data-isolation) | Project and infrastructure isolation considerations |
| [Public API](https://langfuse.com/docs/api-and-data-platform/features/public-api) | Programmatic data access |
| [Metrics API](https://langfuse.com/docs/metrics/overview) | Querying aggregated observability metrics |
| [Microsoft Sentinel overview](https://learn.microsoft.com/en-us/azure/sentinel/sentinel-overview) | SIEM detection, investigation, hunting, and response scope |
| [SIEM capabilities](https://learn.microsoft.com/en-us/azure/sentinel/isv/siem-components-to-include) | Expected SIEM components and operational functions |
| [Sentinel data connectors](https://learn.microsoft.com/en-us/azure/sentinel/connect-data-sources) | Enterprise security telemetry ingestion context |

## Editorial cautions

- Do not copy examples across Langfuse SDK major versions without checking the
  installed package.
- Do not publish transient plan quotas or pricing as durable facts; link to the
  current product page instead.
- Label the Langfuse/SIEM telemetry split as a recommended architecture, not a
  native integration claim.
