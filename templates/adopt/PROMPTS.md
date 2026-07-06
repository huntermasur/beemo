# Phase prompts — adopt NEPTR layout for {{projectName}}

Copy-paste prompts for the migration workspace at `{{featurePath}}/`, saved by
`neptr adopt` so they survive a closed terminal. Paste each one into a fresh
agent session, in order.

The **Model** line on each prompt is the plan phase's recommendation, sized to the
task's complexity — run that prompt with that model (or the equivalent in your editor).

## {{planTitle}}

**Model:** {{planModelHint}}

{{planPrompt}}

## {{implementTitle}}

<!-- neptr:implement-prompts:start -->
**Model:** {{implementModelHint}}

{{implementPrompt}}
<!-- neptr:implement-prompts:end -->

> If the plan phase split TASKS.md into milestones, it replaces the block
> between the markers above with one **Model:** line + prompt per milestone —
> for a migration these usually follow the workstreams: code → tests → docs →
> docker. Run them in order, each in a fresh agent session.

## {{reviewTitle}}

**Model:** {{reviewModelHint}}

{{reviewPrompt}}
