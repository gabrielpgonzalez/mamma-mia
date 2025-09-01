/**
 * Formato de moneda.
 * @param {number|string} value - Monto a formatear.
 * @param {Object} [opts]
 * @param {string} [opts.locale='es-CL'] - Locale a usar.
 * @param {string} [opts.currency='CLP'] - Código de moneda ISO-4217.
 * @param {number} [opts.decimals] - Fuerza cantidad de decimales (p.ej. 2).
 * @returns {string} - Texto formateado, p.ej. "$12.345".
 */
export const currency = (value, opts = {}) => {
  const { locale = "es-CL", currency = "CLP", decimals } = opts;

  const n = Number(value ?? 0);
  const safe = Number.isFinite(n) ? n : 0;

  const defaultDecimals = currency === "CLP" ? 0 : 2;
  const fractionDigits =
    typeof decimals === "number" ? decimals : defaultDecimals;

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(safe);
};

/**
 * Numero con separador de miles.
 * @param {number|string} value
 * @param {string} [locale='es-CL']
 */
export const formatNumber = (value, locale = "es-CL") => {
  const n = Number(value ?? 0);
  const safe = Number.isFinite(n) ? n : 0;
  return new Intl.NumberFormat(locale).format(safe);
};
