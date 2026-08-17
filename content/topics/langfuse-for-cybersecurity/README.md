# Langfuse for cybersecurity: an SOC lens

## Audience

SOC analysts, security architects, detection engineers, AI platform engineers,
and leaders deciding how LLM observability fits into security operations.

## Core decision

Langfuse is an LLM observability and evaluation platform, not a replacement for
a SIEM. Use Langfuse for detailed, sanitized agent execution evidence and a
SIEM for enterprise telemetry correlation, detection, incidents, hunting, and
response.

## Learning outcomes

Readers should be able to:

1. Explain Langfuse traces, observations, generations, sessions, users, scores,
   evaluations, and prompt versions in security language.
2. Describe the documented service architecture at a high level.
3. Identify SOC use cases that benefit from AI execution evidence.
4. Decide which telemetry belongs in Langfuse and which security decisions
   should reach the SIEM.
5. Apply masking, identity, environment, access, retention, and evaluation
   safeguards before production.

## Implementation snapshot

The Cybersecurity Orchestrator currently pins Langfuse Python 3.15.0 and uses
tracing, user/session context, and deterministic code scores. Runtime prompts
remain in version-controlled skills. Human annotation, LLM-as-judge evaluation,
and datasets/experiments are future steps. The project journal—not Langfuse—is
the authoritative action and audit record.

## Architecture recommendation

Send rich but sanitized LLM execution telemetry to Langfuse. Emit minimal,
normalized, high-signal security events to the SIEM with correlation IDs and a
controlled investigation reference. Do not copy raw prompts and outputs into
the SIEM by default.

This is a recommended integration pattern inferred from documented platform
capabilities. It does not imply a built-in Langfuse-to-SIEM connector.
