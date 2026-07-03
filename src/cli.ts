import { Command } from "commander";
import { BMO_BANNER, bmo, randomQuote } from "./theme.js";

const program = new Command();

program
  .name("beemo")
  .description("BMO-themed project scaffolding — Vite apps with an AI-ready setup baked in")
  .version("0.1.0");

program
  .command("new")
  .argument("[name]", "project name")
  .description("Scaffold a new project")
  .action(async (name?: string) => {
    console.log(BMO_BANNER);
    bmo.say(randomQuote());
    bmo.warn(`The 'new' command is still being built. Soon I will scaffold ${name ?? "your project"}!`);
  });

program
  .command("doctor")
  .description("Check that your environment has everything Beemo needs")
  .action(async () => {
    console.log(BMO_BANNER);
    bmo.warn("The 'doctor' command is still being built. I will be a magic doctor soon!");
  });

program.parseAsync();
