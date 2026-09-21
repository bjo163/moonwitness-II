import fs from "node:fs";
import path from "node:path";

const nextServerRoot = path.resolve("apps/web/.next/server");

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const absolute = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(absolute) : [absolute];
  });
}

const traceFiles = walk(nextServerRoot).filter((file) =>
  file.endsWith(".nft.json")
);

if (!traceFiles.length) {
  throw new Error(
    `No Next.js trace files found under ${nextServerRoot}. Run the production build first.`
  );
}

const tracedYaml = new Set();

for (const traceFile of traceFiles) {
  const trace = JSON.parse(fs.readFileSync(traceFile, "utf8"));
  const files = Array.isArray(trace.files) ? trace.files : [];

  for (const file of files) {
    if (typeof file !== "string" || !file.endsWith(".yaml")) continue;

    const absolute = path.resolve(path.dirname(traceFile), file);
    const normalized = absolute.split(path.sep).join("/");

    if (normalized.includes("/data/")) {
      tracedYaml.add(normalized);
    }
  }
}

if (!tracedYaml.size) {
  throw new Error(
    "Next.js server traces do not include canonical data/*.yaml files. Vercel runtime routes could build successfully but fail when reading content."
  );
}

console.log(
  `[moonwitness] PASS: Next.js server tracing includes ${tracedYaml.size} canonical YAML file(s).`
);
