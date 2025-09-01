// src/utils/api.js

/**
 * Base de la API.
 * Define en .env.local (raíz del proyecto) algo como:
 *   VITE_API_BASE="http://localhost:5001/api"
 * Si no está definida, cae por defecto en http://localhost:5000/api
 */

// Obtiene la base desde variables de entorno de Vite (con guard por si acaso)
const envBase =
  typeof import.meta !== "undefined" &&
  import.meta.env &&
  import.meta.env.VITE_API_BASE
    ? String(import.meta.env.VITE_API_BASE)
    : "";

// 1) Definimos rawBase PRIMERO
const rawBase = envBase || "http://localhost:5001/api";

// 2) Luego exportamos API_BASE usando rawBase
export const API_BASE = rawBase.replace(/\/+$/, "");

/**
 * Une API_BASE con un path asegurando que no queden dobles slashes.
 * @param {string} path - Por ejemplo "pizzas" o "/pizzas/123"
 * @returns {string} URL completa
 */
export const buildUrl = (path = "") => {
  const clean = String(path).replace(/^\/+/, ""); // quita / iniciales
  return `${API_BASE}/${clean}`;
};

/**
 * fetch JSON con manejo de errores y mensajes claros.
 * @param {string} path - Path relativo a la API (p.ej. "pizzas" o "pizzas/123")
 * @param {RequestInit} [options]
 * @returns {Promise<any>}
 */
export const fetchJson = async (path, options) => {
  const url = buildUrl(path);
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers || {}),
    },
    ...options,
  });

  if (!res.ok) {
    let detail = "";
    try {
      const data = await res.json();
      detail = typeof data === "string" ? data : JSON.stringify(data);
    } catch {
      // ignore
    }
    throw new Error(
      `HTTP ${res.status} ${res.statusText} — ${url}${
        detail ? ` :: ${detail}` : ""
      }`
    );
  }

  if (res.status === 204) return null;
  return res.json();
};

/* ------------------ Helpers específicos de Pizzería (opcionales) ------------------ */

/** GET /pizzas */
export const getPizzas = () => fetchJson("pizzas");

/**
 * GET /pizzas/:id
 * @param {string|number} id
 */
export const getPizzaById = (id) => {
  if (id === undefined || id === null || String(id).trim() === "") {
    throw new Error("ID de pizza inválido.");
  }
  return fetchJson(`pizzas/${encodeURIComponent(id)}`);
};
