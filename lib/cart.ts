const CART_KEY = "krossford_cart";
const LEGACY_CART_KEY = "cart";
const CART_EXPIRY_KEY = "krossford_cart_expires_at";

export const CART_EXPIRY_MS = 24 * 60 * 60 * 1000;

export type CartSnapshot<T> = {
  items: T[];
  expiresAt: number | null;
  expired: boolean;
};

function clearStoredCart() {
  localStorage.removeItem(CART_KEY);
  localStorage.removeItem(LEGACY_CART_KEY);
  localStorage.removeItem(CART_EXPIRY_KEY);
}

export function readCart<T>(): CartSnapshot<T> {
  let items: T[];
  try {
    const stored = localStorage.getItem(CART_KEY) ?? localStorage.getItem(LEGACY_CART_KEY) ?? "[]";
    const parsed: unknown = JSON.parse(stored);
    items = Array.isArray(parsed) ? parsed as T[] : [];
  } catch (error) {
    console.error("Could not read saved cart; clearing invalid cart data.", error);
    clearStoredCart();
    return { items: [], expiresAt: null, expired: false };
  }

  if (items.length === 0) {
    localStorage.removeItem(CART_EXPIRY_KEY);
    return { items, expiresAt: null, expired: false };
  }

  const now = Date.now();
  const savedExpiry = Number(localStorage.getItem(CART_EXPIRY_KEY));
  const expiresAt = Number.isFinite(savedExpiry) && savedExpiry > 0
    ? savedExpiry
    : now + CART_EXPIRY_MS;

  if (expiresAt !== savedExpiry) {
    localStorage.setItem(CART_EXPIRY_KEY, String(expiresAt));
  }

  if (now >= expiresAt) {
    clearStoredCart();
    window.dispatchEvent(new Event("cartUpdated"));
    return { items: [], expiresAt: null, expired: true };
  }

  return { items, expiresAt, expired: false };
}

export function readCartItems<T>(): T[] {
  return readCart<T>().items;
}

export function saveCart<T>(items: T[]) {
  if (items.length === 0) {
    clearStoredCart();
  } else {
    const now = Date.now();
    const savedExpiry = Number(localStorage.getItem(CART_EXPIRY_KEY));
    const expiresAt = Number.isFinite(savedExpiry) && savedExpiry > now
      ? savedExpiry
      : now + CART_EXPIRY_MS;
    localStorage.setItem(CART_KEY, JSON.stringify(items));
    localStorage.setItem(LEGACY_CART_KEY, JSON.stringify(items));
    localStorage.setItem(CART_EXPIRY_KEY, String(expiresAt));
  }
  window.dispatchEvent(new Event("cartUpdated"));
}

export function clearCart() {
  clearStoredCart();
  window.dispatchEvent(new Event("cartUpdated"));
}

export function formatCartCountdown(milliseconds: number): string {
  const seconds = Math.max(0, Math.floor(milliseconds / 1000));
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainder = seconds % 60;
  return [hours, minutes, remainder].map((part) => String(part).padStart(2, "0")).join(":");
}
