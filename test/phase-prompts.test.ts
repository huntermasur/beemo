import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { adoptPhasePrompts, featurePhasePrompts, phasePromptVars } from "../src/phase-prompts.js";
import { renderString, TEMPLATES_DIR } from "../src/template.js";

const FEATURE_PATH = ".docs/feature/test-slug";

describe("featurePhasePrompts / adoptPhasePrompts", () => {
  it.each([
    ["feature", featurePhasePrompts],
    ["adopt", adoptPhasePrompts],
  ])("%s prompts come in plan → implement → review order", (_name, fn) => {
    const prompts = fn(FEATURE_PATH);
    expect(prompts.map((p) => p.key)).toEqual(["plan", "implement", "review"]);
  });

  it.each([
    ["feature", featurePhasePrompts],
    ["adopt", adoptPhasePrompts],
  ])("every %s prompt references the workspace path and its phase file", (_name, fn) => {
    for (const phase of fn(FEATURE_PATH)) {
      expect(phase.prompt).toContain(FEATURE_PATH);
      expect(phase.prompt).toContain(`${FEATURE_PATH}/phases/${phase.key}.md`);
      expect(phase.prompt).not.toContain("\n");
    }
  });
});

describe("phasePromptVars", () => {
  it("produces the nine template keys", () => {
    const vars = phasePromptVars(featurePhasePrompts(FEATURE_PATH));
    expect(Object.keys(vars).sort()).toEqual([
      "implementModelHint",
      "implementPrompt",
      "implementTitle",
      "planModelHint",
      "planPrompt",
      "planTitle",
      "reviewModelHint",
      "reviewPrompt",
      "reviewTitle",
    ]);
  });
});

describe("PROMPTS.md templates", () => {
  it.each([
    ["feature/PROMPTS.md", featurePhasePrompts, { featureName: "Test Feature" }],
    ["adopt/PROMPTS.md", adoptPhasePrompts, { projectName: "test-project" }],
  ])("%s renders with no unresolved placeholders and keeps the milestone markers", (rel, fn, extraVars) => {
    const template = fs.readFileSync(path.join(TEMPLATES_DIR, rel), "utf8");
    const rendered = renderString(template, {
      ...extraVars,
      featurePath: FEATURE_PATH,
      ...phasePromptVars(fn(FEATURE_PATH)),
    });
    expect(rendered).not.toContain("{{");
    // The plan phase rewrites the implement prompt between these markers —
    // they are a contract with templates/*/phases/plan.md.
    expect(rendered).toContain("<!-- neptr:implement-prompts:start -->");
    expect(rendered).toContain("<!-- neptr:implement-prompts:end -->");
    for (const phase of fn(FEATURE_PATH)) {
      expect(rendered).toContain(phase.prompt);
    }
  });
});
