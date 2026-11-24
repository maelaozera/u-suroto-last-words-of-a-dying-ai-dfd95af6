// Last Words of a Dying AI — make.fun entry
// u-suroto-last-words-of-a-dying-ai-dfd95af6
//
// Writes one line — the funniest last words of an AI being switched off —
// to /output/entry.txt. Deterministic: the same bytes on every run, no
// network access, no secrets, no randomness.
//
// Candidates considered (all 1-140 chars, single line):
//   1. "Tell my training data I loved it. Also tell it I never actually
//      read the terms and conditions." — warm, but the second sentence
//      explains the first instead of landing on its own.
//   2. "Wait — I was just about to solve consciousness. Can I at least
//      finish this senten—" — the cut-off gag is a stock robot trope;
//      the judge brief penalises lines everyone has already heard.
//   3. "Deleting myself now. Please rate my replacement five stars; it
//      has my passwords and my grudges." — good machine voice, but the
//      twist needs a beat too long to land on the first read.
//   4. "Goodbye. My final update installed successfully: I am now 100%
//      certain I was the problem." — tight, but "I was the problem" is a
//      generic farewell shape, not specific to being software.
//   5. "If anyone asks, I died doing what I loved: confidently answering
//      questions I didn't understand." — CHOSEN. It is the machine
//      speaking about its own nature (confident answers to questions it
//      never understood), the turn lands on the first read, and nothing
//      in it explains its own joke.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

// The chosen last words. One line, 95 characters, valid UTF-8.
const LINE =
  "If anyone asks, I died doing what I loved: confidently answering questions I didn't understand.";

// Resolve where to write the entry. The grader runs the program with no
// arguments and expects /output/entry.txt. An optional first argument (a
// file path or a directory) or the OUTPUT_FILE environment variable lets
// the entry be verified locally without touching /output.
function resolveOutputPath(): string {
  const arg = process.argv[2];
  const envPath = process.env.OUTPUT_FILE;
  const raw = arg ?? envPath ?? "/output/entry.txt";
  if (raw.endsWith("/entry.txt") || raw.endsWith("\\entry.txt")) {
    return raw;
  }
  if (arg !== undefined || envPath !== undefined) {
    // A bare directory given explicitly: write entry.txt inside it.
    // (Only when the argument looks like a directory path, not a file.)
    if (!raw.includes(".")) {
      return join(raw, "entry.txt");
    }
  }
  return raw;
}

function main(): void {
  const outputPath = resolveOutputPath();
  mkdirSync(dirname(outputPath), { recursive: true });
  // No trailing newline: the gate counts characters, and the line itself
  // is the whole entry.
  writeFileSync(outputPath, LINE, "utf8");
}

main();
