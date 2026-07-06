# Phase prompts — {{featureName}}

Copy-paste prompts for the workspace at `{{featurePath}}/`, saved by
`neptr feature` so they survive a closed terminal. Paste each one into a fresh
agent session, in order.

## {{planTitle}} — {{planModelHint}}

{{planPrompt}}

## {{implementTitle}} — {{implementModelHint}}

<!-- neptr:implement-prompts:start -->
{{implementPrompt}}
<!-- neptr:implement-prompts:end -->

> If the plan phase split TASKS.md into milestones, it replaces the prompt
> between the markers above with one prompt per milestone. Run them in order,
> each in a fresh agent session.

## {{reviewTitle}} — {{reviewModelHint}}

{{reviewPrompt}}
