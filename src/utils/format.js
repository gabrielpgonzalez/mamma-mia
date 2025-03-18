export const currency = (val) =>
  new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP" }).format(
    val
  );
