import { spawn } from "node:child_process";
import path from "node:path";

const host = "127.0.0.1";
const port = 3456;
const baseUrl = `http://${host}:${port}`;
const routes = [
  "/",
  "/explore",
  "/lore",
  "/storytelling",
  "/constellation",
  "/entity/era_00"
];

const repoRoot = process.cwd();
const webRoot = path.join(repoRoot, "apps", "web");
const nextBin = path.join(repoRoot, "node_modules", "next", "dist", "bin", "next");

const server = spawn(
  process.execPath,
  [nextBin, "start", "-H", host, "-p", String(port)],
  {
    cwd: webRoot,
    env: {
      ...process.env,
      NEXT_TELEMETRY_DISABLED: "1"
    },
    stdio: ["ignore", "pipe", "pipe"]
  }
);

let serverOutput = "";
server.stdout.on("data", (chunk) => {
  serverOutput += chunk.toString();
});
server.stderr.on("data", (chunk) => {
  serverOutput += chunk.toString();
});

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function fetchWithTimeout(url, timeoutMs = 5000) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await fetch(url, {
      redirect: "manual",
      signal: controller.signal
    });
  } finally {
    clearTimeout(timeout);
  }
}

async function waitForServer() {
  for (let attempt = 0; attempt < 60; attempt += 1) {
    if (server.exitCode !== null) {
      throw new Error(
        `MoonWitness server exited before becoming ready.\n${serverOutput}`
      );
    }

    try {
      const response = await fetchWithTimeout(baseUrl, 1000);
      if (response.status >= 200 && response.status < 500) {
        return;
      }
    } catch {
      // Server is still starting.
    }

    await sleep(500);
  }

  throw new Error(
    `Timed out waiting for MoonWitness server at ${baseUrl}.\n${serverOutput}`
  );
}

async function verifyRoutes() {
  for (const route of routes) {
    const response = await fetchWithTimeout(`${baseUrl}${route}`);

    if (!response.ok) {
      throw new Error(
        `Smoke route failed: ${route} returned HTTP ${response.status}.`
      );
    }

    const body = await response.text();
    if (!body.trim()) {
      throw new Error(`Smoke route failed: ${route} returned an empty body.`);
    }

    console.log(`[moonwitness] PASS ${route} -> HTTP ${response.status}`);
  }
}

try {
  await waitForServer();
  await verifyRoutes();
  console.log(
    `[moonwitness] PASS: ${routes.length} production routes responded successfully.`
  );
} finally {
  if (server.exitCode === null) {
    server.kill("SIGTERM");
  }

  await Promise.race([
    new Promise((resolve) => server.once("exit", resolve)),
    sleep(3000)
  ]);

  if (server.exitCode === null) {
    server.kill("SIGKILL");
    await new Promise((resolve) => server.once("exit", resolve));
  }
}
