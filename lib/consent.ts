export type ConsentStatus = "accepted" | "rejected" | null;

const CONSENT_KEY = "krossford_cookie_consent";
const EVENT_NAME = "krossford-consent-change";

function readConsent(): ConsentStatus {
  if (typeof window === "undefined") return null;
  const value = window.localStorage.getItem(CONSENT_KEY);
  if (value === "accepted" || value === "rejected") return value;
  return null;
}

export function setConsent(choice: "accepted" | "rejected") {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(CONSENT_KEY, choice);
  window.dispatchEvent(new Event(EVENT_NAME));
}

export function subscribeConsent(callback: () => void) {
  window.addEventListener(EVENT_NAME, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(EVENT_NAME, callback);
    window.removeEventListener("storage", callback);
  };
}

export function getConsentSnapshot(): ConsentStatus {
  return readConsent();
}

export function getConsentServerSnapshot(): ConsentStatus {
  return null;
}