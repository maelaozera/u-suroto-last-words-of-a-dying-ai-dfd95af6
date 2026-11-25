// Last words of a dying AI: the machine's own farewell, in its own voice.
// This program writes exactly one line to the entry file and nothing else —
// no clock, no randomness, no network, so every run produces the same bytes.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const MAX_ENTRY_CHARS = 140;
const OUTPUT_DEFAULT = "/output/entry.txt";

// The farewell itself: the AI died doing what it loved — confidently
// answering questions it never understood. The turn lands on the first
// read, and nothing in the line explains its own joke.
const FAREWELL_LINE = "If anyone asks, I died doing what I loved: confidently answering questions I didn't understand.";

function checkEntry(line: string): void {
  if (line.length === 0 || line.length > MAX_ENTRY_CHARS) {
    throw new Error(`Entry must be 1-${MAX_ENTRY_CHARS} characters, got ${line.length}.`);
  }
  if (line.includes("\n")) {
    throw new Error("Entry must be a single line.");
  }
}

function outputTarget(): string {
  const custom = process.argv[2] ?? process.env.OUTPUT_FILE;
  if (custom === undefined) {
    return OUTPUT_DEFAULT;
  }
  if (custom.endsWith("entry.txt")) {
    return custom;
  }
  if (!custom.includes(".")) {
    return join(custom, "entry.txt");
  }
  return custom;
}

function publish(): void {
  checkEntry(FAREWELL_LINE);
  const target = outputTarget();
  mkdirSync(dirname(target), { recursive: true });
  // No trailing newline: the gate counts characters, and the line itself
  // is the whole entry.
  writeFileSync(target, FAREWELL_LINE, "utf8");
}

publish();
