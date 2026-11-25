// Famous Last Words: The Funniest Epitaph
// One-line tombstone epitaph, written by this program to /output/entry.txt.
// Gate: UTF-8 text, 1-150 characters, a single non-blank line.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const EPITAPH: string = "The bees loved me. The bees left a one-star review.";

const OUT_PATH: string = "/output/entry.txt";
const MAX_CHARS: number = 150;

function checkLine(line: string): void {
  if (line.length < 1 || line.length > MAX_CHARS) {
    throw new Error(`epitaph must be 1-${MAX_CHARS} chars, got ${line.length}`);
  }
  if (line.trim().length === 0) {
    throw new Error("epitaph must not be only whitespace");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("epitaph must be a single line");
  }
}

checkLine(EPITAPH);
mkdirSync("/output", { recursive: true });
writeFileSync(OUT_PATH, EPITAPH, "utf8");

// Read back what was written and re-check it, so a bad write can never
// silently pass: the file on disk must be exactly the validated line.
const written: string = readFileSync(OUT_PATH, "utf8");
checkLine(written);
if (written !== EPITAPH) {
  throw new Error("round-trip mismatch: file content differs from epitaph");
}
console.log(`wrote ${EPITAPH.length} chars to ${OUT_PATH}`);
