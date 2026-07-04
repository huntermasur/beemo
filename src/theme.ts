import pc from "picocolors";

/** NEPTR's face — shown when the CLI starts. */
export const NEPTR_BANNER = pc.cyan(`
   ╭───────────────────╮
   │  ╭─────────────╮  │
   │  │  ${pc.green("●")}       ${pc.green("●")}  │  │
   │  │             │  │
   │  │  ${pc.green("╰───────╯")}  │  │
   │  ╰─────────────╯  │
   │   ${pc.yellow("▲")}  ${pc.red("●")} ${pc.blue("●")}  ${pc.magenta("▬▬")}    │
   │   ${pc.dim("░░░░░░░░░░░")}     │
   ╰───────────────────╯
      ${pc.bold(pc.green("N E P T R"))}
`);

export const QUOTES = [
  "Who wants to play video games?",
  "I will go into your project and fix it like a magic doctor!",
  "NEPTR, deploy!",
  "Let's make something rad together!",
  "I am not just a machine... I am a real living boy building your project!",
];

export function randomQuote(): string {
  return QUOTES[Math.floor(Math.random() * QUOTES.length)]!;
}

export const neptr = {
  say: (msg: string) => console.log(`${pc.green("◉ NEPTR:")} ${msg}`),
  warn: (msg: string) => console.log(`${pc.yellow("◉ NEPTR (worried):")} ${msg}`),
  error: (msg: string) => console.log(`${pc.red("◉ NEPTR (glitching):")} ${msg}`),
  success: (msg: string) => console.log(`${pc.green("◉ NEPTR (dancing):")} ${msg}`),
};
