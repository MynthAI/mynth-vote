import { Command } from "commander";
import version from "./version.js";

const program = new Command()
  .name("mynth-vote")
  .description("A CLI tool for voting on Mynth proposals using MNT")
  .version(version);

function logExit(message: string): void;
function logExit(name: string, error: { summary: string }): void;
function logExit(nameOrMessage: string, error?: { summary: string }) {
  if (error) console.error(nameOrMessage, error.summary);
  else console.error(nameOrMessage);
  process.exitCode = 1;
}

export default program;
export { logExit };
