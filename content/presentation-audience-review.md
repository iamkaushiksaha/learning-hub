# Audience review — Governed Cybersecurity AI summary

Reviewed: 2026-08-18  
Audience lens: cybersecurity practitioners, architects, SOC teams and leadership with limited Agentic AI engineering background  
Format: 60-minute interactive browser presentation  
Production route: `/presentations/governed-agentic-ai/summary/index.html`

## Honest verdict

This is a strong, distinctive deck—not a generic AI presentation. The opening, skill anatomy, bounded agent loop, prompt-injection example, governed stack and closing questions are memorable. The design communicates technical credibility and the narrative consistently returns to governance, evidence and human accountability.

The main risk is not visual quality; it is cognitive density. Twenty-eight scenes, multiple optional deep dives and a live simulation can exceed 60 minutes. The orchestration chapter (Slides 12–20) contains nine consecutive system-design scenes. If each receives equal explanation, a mixed audience may remember the individual boxes but lose the higher-level story.

Recommended delivery rule: teach the control-plane principle in depth, then select one capability flow based on the room. Treat the other two flows as proof of reuse, not additional lectures.

## Scorecard

| Dimension | Assessment | Honest note |
| --- | --- | --- |
| First impression | 9/10 | Premium, credible and immediately different from a normal corporate deck. |
| Narrative | 8.5/10 | Strong progression from request → skill → agent → orchestrator → governed system. |
| Technical clarity | 8/10 | Accurate boundaries; some orchestration slides require disciplined narration. |
| Visual variety | 8.5/10 after revision | Timelines, loop, risk curve, artifact bus, stack, comparison and interactive demo now vary the rhythm. |
| Interaction quality | 9/10 after revision | Core clicks, overlays, keyboard controls, approval gate and restart are working. |
| Cognitive load | 7/10 | Slides 5, 8, 15–22 and 25 can overload novice audiences if every label is read aloud. |
| Leadership relevance | 8/10 | Effort redistribution and defensibility land well; measurable pilot outcomes should be stated verbally. |
| Projector readiness | 9/10 after revision | Common 1280×720 overflow is fixed; very subtle divider lines still need a real-room rehearsal. |
| Mobile follow-up | 8/10 after revision | All scenes now scroll without horizontal overflow; projector remains the primary experience. |

## What works especially well

1. **Outcome before machinery.** Slide 1 starts with a delivery pack, not definitions. This creates curiosity and gives leadership a reason to stay engaged.
2. **Strong mental-model progression.** Chat → project → skill → agent → orchestrator is easier to retain than beginning with frameworks.
3. **Security is structural.** Prompt injection, tool scope, schemas, gates, evidence and auditability are integrated into the architecture rather than appended as a warning slide.
4. **The skill X-ray is concrete.** Showing `SKILL.md`, references, schema and scripts makes “skill” tangible for a cybersecurity audience.
5. **The ending creates an open loop.** The three questions invite a future session without attempting to teach the larger explainability topic here.

## Where audiences may still become confused

### Slide 5 — two lessons compete

The slide explains both why chat is insufficient and the five-level capability ladder. Both are useful, but together they create two focal points.

Delivery recommendation: reveal the three limitations, pause, then use the ladder only to answer “what comes next?” Do not explain all five levels on this slide; later slides teach them.

### Slide 8 — eight-stage pipeline

Eight steps exceed what a first-time audience will retain as separate labels.

Delivery recommendation: group them verbally into four chunks: route → inspect → verify → publish. The visual can retain eight implementation stages.

### Slides 12–20 — orchestration density

This is the strongest technical section and the largest attention risk. The room can lose the distinction between the control plane, capability flows and artifact hand-offs.

Delivery recommendation:

- Slides 12–14: problem and durable control-plane principle.
- Slide 15: let the audience choose one capability.
- Slides 16–19: explain the chosen capability deeply; summarize or skip the others.
- Slide 20: close the chapter with the typed-artifact trust boundary.

### Slide 22 — ten-layer stack

The interaction works, but reading all ten layers becomes a catalogue.

Delivery recommendation: click only three layers during the summary—Orchestration, Tools/Data and Guardrails. The full technology-map overlay is a reference, not a script.

### Slide 25 — demo timing

The approval gate and artifact reveal work. The demo should be narrated as evidence of control, not as a race to generate files.

Ask the room to predict where the workflow should pause before clicking “Approve scope.” Prediction increases attention and makes the gate memorable.

## Human attention and learning psychology

### Segmenting

Progressive fragments are valuable because the audience sees one teaching beat at a time. Avoid rapid clicking: each fragment should receive a sentence or a question before the next reveal.

### Signaling

The palette has stable semantics:

- Blue: capability, information and control.
- Teal: verified, governed or assured.
- Amber: judgment, gate or human decision.
- Coral: risk, failure or unsafe behavior.
- Purple: future state or unresolved assurance work.
- Green: achieved outcome or protected human value.

Do not reuse coral for routine emphasis or green for a component that has not passed validation. Consistent meaning reduces interpretation effort.

### Working memory

When a slide contains six to ten components, the presenter should name the pattern, not read every component. The audience needs the rule first and the implementation detail second.

### Dual coding

The revised causal chain, artifact route and assurance spine use spatial relationships to explain sequence and ownership. These diagrams teach more effectively than additional prose because the visual relationship carries part of the meaning.

### Habituation

Repeated card grids reduce attention even when content changes. The revised deck alternates poster slides, timelines, loops, graphs, pipelines, architecture maps, comparison views and interactive simulations to reset visual attention.

### Serial position and closure

The opening outcome and final three questions are likely to be remembered. The explicit “Start this session again” action now provides clean closure for self-guided viewers without weakening the invitation to the next session.

## Color and accessibility review

Text contrast against the primary background:

| Token | Contrast ratio |
| --- | ---: |
| Paper white | 17.42:1 |
| Muted blue-gray | 7.49:1 |
| Blue | 7.54:1 |
| Teal | 11.46:1 |
| Amber | 11.52:1 |
| Coral | 7.08:1 |
| Purple | 6.97:1 |
| Green | 12.19:1 |

All primary text colors have strong contrast on the dark navy background. The design also uses labels, borders, position and wording rather than color alone.

Real-room risk: low-lumen projectors may weaken subtle 1-pixel dividers and background grids. Rehearse once on the actual display. If lines disappear, increase the `--line` opacity before increasing text brightness.

Reduced-motion mode disables the orbit, agent-loop dash, artifact packet and typing cursor animations while preserving all content and interaction.

## Interaction verification

Verified with Playwright in a real browser:

- Previous, next, fragment reveal and keyboard navigation.
- Table of contents and scene selection.
- Speaker notes and help overlays.
- Fullscreen entry and exit.
- LLM token selection.
- Persona switching.
- Capability-ladder selection by pointer and keyboard.
- Skill-tree inspection.
- Function tool / MCP / RAG switching and comparison overlay.
- Capability selector.
- Convergence, review-contract and technology-map deep dives.
- ArchStudio Generate / Assure toggle.
- Prompt-injection reveal by pointer and keyboard.
- Ten-layer stack inspection.
- Current / future-state toggle.
- Demo run, human approval gate and artifact completion.
- Pilot-candidate selection.
- Footer and in-slide restart behavior.

No browser console errors were observed.

## Viewport verification

- 1920×1080: no overflow.
- 1440×900: no overflow.
- 1280×720: no overflow after revision, including Slides 15, 16 and 18.
- 390×844: scrollable mobile presentation; no horizontal overflow across all 28 scenes.

## Recommended 60-minute pacing

| Time | Scenes | Purpose |
| --- | --- | --- |
| 0–8 min | 1–5 | Outcome, LLM mental model and why chat alone is insufficient. |
| 8–17 min | 6–8 | Skills and deterministic/expert execution. |
| 17–25 min | 9–11 | Agent loop, tools/MCP/RAG and blast radius. |
| 25–42 min | 12–20 | Orchestrator principle plus one chosen capability flow. |
| 42–51 min | 21–24 | Prompt injection, governed stack, value and future-state teaser. |
| 51–57 min | 25–26 | Demo and practical adoption. |
| 57–60 min | 27–28 | Synthesis, questions and next-session invitation. |

If discussion runs long, skip the unselected capability detail slides rather than rushing the security and closing sections.

## Remaining recommendations

1. Add a presenter-facing “short route” in the table of contents for leadership-heavy rooms.
2. Add optional audience pulse questions at Slides 5, 11 and 26 rather than adding more animation.
3. Measure comprehension with one closing recall prompt: “What belongs in a skill, what belongs in the orchestrator, and what must remain human?”
4. Rehearse with the actual projector and room lighting before changing the palette further.

## Accessibility references

- [W3C WCAG contrast minimum](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html)
- [W3C WCAG animation from interactions](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html)
- [W3C WCAG keyboard accessibility](https://www.w3.org/WAI/WCAG22/Understanding/keyboard.html)
