import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? "list" : "line",
  use: {
    baseURL: "http://127.0.0.1:3457",
    trace: "retain-on-failure",
  },
  webServer: {
    command: "npm --prefix apps/web run start -- -H 127.0.0.1 -p 3457",
    url: "http://127.0.0.1:3457",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
