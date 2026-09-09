import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const APPS_SCRIPT_ENDPOINT = "https://script.google.com/macros/s/AKfycbz66DkB9uRW2j00QUWS8w-71QLwqfgh_ApsE9CltJ3IL0foBK8IpB3mAS85rW2yIGbs/exec";

type WaitlistBody = { fullName?: unknown; email?: unknown; role?: unknown; interest?: unknown };

function errorResponse(message: string) {
  return { success: false, error: message };
}

async function postToAppsScript(payload: Record<string, string>) {
  const request = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  };
  const firstResponse = await fetch(APPS_SCRIPT_ENDPOINT, { ...request, redirect: "manual" });
  if (firstResponse.status >= 300 && firstResponse.status < 400) {
    const location = firstResponse.headers.get("location");
    if (!location) throw new Error("Apps Script redirect location missing.");
    return fetch(location, { method: "GET", redirect: "follow" });
  }
  return firstResponse;
}

async function startServer() {
  const app = express();
  const server = createServer(app);

  app.use(express.json({ limit: "16kb" }));

  app.post("/api/waitlist", async (req, res) => {
    const body = (req.body || {}) as WaitlistBody;
    const fullName = typeof body.fullName === "string" ? body.fullName.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const role = typeof body.role === "string" ? body.role.trim() : "";
    const interest = typeof body.interest === "string" ? body.interest.trim() : "";

    if (!fullName || fullName.split(/\s+/).filter(Boolean).length < 2) {
      return res.status(400).json(errorResponse("Please enter your full name using at least two words."));
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json(errorResponse("Please enter a valid email address."));
    }
    if (!role) {
      return res.status(400).json(errorResponse("Please select your role."));
    }

    try {
      const upstream = await postToAppsScript({ fullName, email, role, interest, notes: "Website waitlist submission" });
      let result: Record<string, unknown>;
      try {
        result = await upstream.json() as Record<string, unknown>;
      } catch {
        return res.status(502).json(errorResponse("The waitlist service returned an invalid response."));
      }
      if (!upstream.ok) {
        return res.status(502).json(errorResponse(String(result.error || result.message || "The waitlist service is unavailable.")));
      }
      return res.status(result.success === true ? 200 : 400).json(result);
    } catch {
      return res.status(502).json(errorResponse("The waitlist service is unavailable. Please try again."));
    }
  });

  const staticPath = process.env.NODE_ENV === "production"
    ? path.resolve(__dirname, "public")
    : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));

  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;
  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
