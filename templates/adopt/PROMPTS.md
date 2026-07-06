# Phase prompts — adopt NEPTR layout for {{projectName}}

Copy-paste prompts for the migration workspace at `{{featurePath}}/`, saved by
`neptr adopt` so they survive a closed terminal. Paste each one into a fresh
agent session, in order.

## {{planTitle}} — {{planModelHint}}

{{planPrompt}}

## {{implementTitle}} — {{implementModelHint}}

<!-- neptr:implement-prompts:start -->
{{implementPrompt}}
<!-- neptr:implement-prompts:end -->

> If the plan phase split TASKS.md into milestones, it replaces the prompt
> between the markers above with one prompt per milestone — for a migration
> these usually follow the workstreams: code → tests → docs → docker. Run them
> in order, each in a fresh agent session.

## {{reviewTitle}} — {{reviewModelHint}}

{{reviewPrompt}}
