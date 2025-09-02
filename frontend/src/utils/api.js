const envBase =
  typeof import.meta !== "undefined" &&
  import.meta.env &&
  import.meta.env.VITE_API_BASE
    ? String(import.meta.env.VITE_API_BASE)
    : "";

const rawBase = envBase || "http://localhost:5000/api";
export const API_BASE = rawBase.replace(/\/+$/, "");

export const buildUrl = (path = "") => {
  const clean = String(path).replace(/^\/+/, "");
  return `${API_BASE}/${clean}`;
};

const baseHeaders = { "Content-Type": "application/json" };

export const fetchJson = async (path, options) => {
  const url = buildUrl(path);

  const res = await fetch(url, {
    headers: { ...baseHeaders, ...(options?.headers || {}) },
    ...options,
  });

  if (!res.ok) {
    let detail = "";
    try {
      const data = await res.json();
      detail = typeof data === "string" ? data : JSON.stringify(data);
    } catch {
      try {
        detail = await res.text();
      } catch {}
    }
    const msg = `HTTP ${res.status} ${res.statusText} — ${url}${
      detail ? ` :: ${detail}` : ""
    }`;
    throw new Error(msg);
  }

  if (res.status === 204) return null;

  try {
    return await res.json();
  } catch {
    return await res.text();
  }
};

export const authLogin = ({ email, password }) =>
  fetchJson("auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

export const authRegister = ({ email, password, name }) =>
  fetchJson("auth/register", {
    method: "POST",
    body: JSON.stringify({ email, password, name }),
  });

export const authMe = (token) =>
  fetchJson("auth/me", { headers: { Authorization: `Bearer ${token}` } });

export const postCheckout = (token, cart) =>
  fetchJson("checkouts", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify({ cart }),
  });

export const getPizzas = () => fetchJson("pizzas");

export const getPizzaById = (id) => {
  if (id === undefined || id === null || String(id).trim() === "") {
    throw new Error("ID de pizza inválido.");
  }
  return fetchJson(`pizzas/${encodeURIComponent(id)}`);
};
