import pc from "picocolors";

/** BMO's face — shown when the CLI starts. */
export const BMO_BANNER = pc.cyan(`
   ╭───────────────────╮
   │  ╭─────────────╮  │
   │  │  ${pc.green("●")}       ${pc.green("●")}  │  │
   │  │             │  │
   │  │  ${pc.green("╰───────╯")}  │  │
   │  ╰─────────────╯  │
   │   ${pc.yellow("▲")}  ${pc.red("●")} ${pc.blue("●")}  ${pc.magenta("▬▬")}    │
   │   ${pc.dim("░░░░░░░░░░░")}     │
   ╰───────────────────╯
      ${pc.bold(pc.green("B E E M O"))}
`);

export const QUOTES = [
  "Who wants to play video games?",
  "I will go into your project and fix it like a magic doctor!",
  "Beemo chop!",
  "Let's make something rad together!",
  "I am not just a machine... I am a real living boy building your project!",
];

export function randomQuote(): string {
  return QUOTES[Math.floor(Math.random() * QUOTES.length)]!;
}

export const bmo = {
  say: (msg: string) => console.log(`${pc.green("◉ BMO:")} ${msg}`),
  warn: (msg: string) => console.log(`${pc.yellow("◉ BMO (worried):")} ${msg}`),
  error: (msg: string) => console.log(`${pc.red("◉ BMO (glitching):")} ${msg}`),
  success: (msg: string) => console.log(`${pc.green("◉ BMO (dancing):")} ${msg}`),
};
