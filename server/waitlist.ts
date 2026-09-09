const APPS_SCRIPT_ENDPOINT = "https://script.google.com/macros/s/AKfycbz66DkB9uRW2j00QUWS8w-71QLwqfgh_ApsE9CltJ3IL0foBK8IpB3mAS85rW2yIGbs/exec";

type WaitlistBody = { fullName?: unknown; email?: unknown; role?: unknown; interest?: unknown };

type WaitlistResult = { status: number; body: Record<string, unknown> };

function errorResult(status: number, message: string): WaitlistResult {
  return { status, body: { success: false, error: message } };
}

async function postToAppsScript(payload: Record<string, string>) {
  const request = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  };
  const gasResponse = await fetch(APPS_SCRIPT_ENDPOINT, { ...request, redirect: "manual" });
  if ([301, 302, 303].includes(gasResponse.status)) {
    const location = gasResponse.headers.get("location");
    if (!location) throw new Error("Apps Script redirect location missing.");
    return fetch(location, { method: "GET", redirect: "follow" });
  }
  return gasResponse;
}

export async function handleWaitlist(payload: unknown): Promise<WaitlistResult> {
  const body = (payload || {}) as WaitlistBody;
  const fullName = typeof body.fullName === "string" ? body.fullName.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const role = typeof body.role === "string" ? body.role.trim() : "";
  const interest = typeof body.interest === "string" ? body.interest.trim() : "";

  if (!fullName || fullName.split(/\s+/).filter(Boolean).length < 2) {
    return errorResult(400, "Please enter your full name using at least two words.");
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return errorResult(400, "Please enter a valid email address.");
  }
  if (!role) return errorResult(400, "Please select your role.");

  try {
    const finalResponse = await postToAppsScript({ fullName, email, role, interest, notes: "Website waitlist submission" });
    const contentType = finalResponse.headers.get("content-type") || "";
    const raw = await finalResponse.text();
    if (!contentType.toLowerCase().includes("application/json")) {
      return errorResult(502, "The waitlist service returned a non-JSON response.");
    }
    let result: Record<string, unknown>;
    try {
      result = JSON.parse(raw) as Record<string, unknown>;
    } catch {
      return errorResult(502, "The waitlist service returned invalid JSON.");
    }
    if (!finalResponse.ok) {
      return errorResult(502, String(result.error || result.message || "The waitlist service is unavailable."));
    }
    return { status: result.success === true ? 200 : 400, body: result };
  } catch (error) {
    return errorResult(502, error instanceof Error ? error.message : "The waitlist service is unavailable. Please try again.");
  }
}
