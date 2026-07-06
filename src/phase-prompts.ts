import pc from "picocolors";
import type { TemplateVars } from "./template.js";

export type PhaseKey = "plan" | "implement" | "review";

export interface PhasePrompt {
  key: PhaseKey;
  title: string;
  modelHint: string;
  /** Single-line copy-paste text — printed to the terminal and written to PROMPTS.md. */
  prompt: string;
}

/** The three `neptr feature` phase prompts. */
export function featurePhasePrompts(featurePath: string): PhasePrompt[] {
  return [
    {
      key: "plan",
      title: "1. Plan",
      modelHint: "use your smartest model",
      prompt: `Read ${featurePath}/phases/plan.md and follow it exactly: research this codebase and fill in ${featurePath}/PLAN.md and ${featurePath}/TASKS.md for the feature described there. Do not write code.`,
    },
    {
      key: "implement",
      title: "2. Implement",
      modelHint: "a cheaper model is fine",
      prompt: `Read ${featurePath}/phases/implement.md and follow it exactly: implement the feature per ${featurePath}/PLAN.md, checking off TASKS.md and updating NOTES.md and STATUS.md as you go.`,
    },
    {
      key: "review",
      title: "3. Review",
      modelHint: "back to the smart model",
      prompt: `Read ${featurePath}/phases/review.md and follow it exactly: verify the implementation in this repo against ${featurePath}/PLAN.md, fix what's broken, and set the status to done.`,
    },
  ];
}

/** The three `neptr adopt` phase prompts (migration-flavored wording). */
export function adoptPhasePrompts(featurePath: string): PhasePrompt[] {
  return [
    {
      key: "plan",
      title: "1. Plan",
      modelHint: "use your smartest model",
      prompt: `Read ${featurePath}/phases/plan.md and follow it exactly: confirm the migration mapping and fill in ${featurePath}/PLAN.md and ${featurePath}/TASKS.md. Do not move files yet.`,
    },
    {
      key: "implement",
      title: "2. Implement",
      modelHint: "a cheaper model is fine",
      prompt: `Read ${featurePath}/phases/implement.md and follow it exactly: move the code, tests, and docs per ${featurePath}/PLAN.md and finish the Docker setup, keeping the build green after each batch.`,
    },
    {
      key: "review",
      title: "3. Review",
      modelHint: "back to the smart model",
      prompt: `Read ${featurePath}/phases/review.md and follow it exactly: verify the code only moved (no behaviour change), every doc and test is accounted for, the Docker setup works, then fix any breakage and set the status to done.`,
    },
  ];
}

/**
 * Print the prompts with plain console.log — clack's gutter characters would
 * be captured when the user copies a line.
 */
export function printPhasePrompts(prompts: PhasePrompt[], featurePath: string): void {
  console.log(pc.bold("Next: run each phase with an agent — copy, paste, deploy.\n"));
  for (const phase of prompts) {
    console.log(pc.green(pc.bold(phase.title)) + pc.dim(`  — ${phase.modelHint}`));
    console.log(`${phase.prompt}\n`);
  }
  console.log(pc.dim(`Prompts saved to ${featurePath}/PROMPTS.md — recover them there if this terminal closes.\n`));
}

/**
 * Template vars for PROMPTS.md: {plan,implement,review}{Title,ModelHint,Prompt},
 * keyed to match the placeholders in templates/{feature,adopt}/PROMPTS.md.
 */
export function phasePromptVars(prompts: PhasePrompt[]): TemplateVars {
  const vars: TemplateVars = {};
  for (const phase of prompts) {
    vars[`${phase.key}Title`] = phase.title;
    vars[`${phase.key}ModelHint`] = phase.modelHint;
    vars[`${phase.key}Prompt`] = phase.prompt;
  }
  return vars;
}
