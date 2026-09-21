"use client";

import { useEffect } from "react";
import { Analytics } from "@vercel/analytics/react";
import { injectSpeedInsights } from "@vercel/speed-insights";

export function ProductionInsights() {
  useEffect(() => {
    injectSpeedInsights();
  }, []);

  return <Analytics />;
}
