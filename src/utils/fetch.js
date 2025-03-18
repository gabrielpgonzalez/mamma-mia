export const fetchData = async ({ data, callback, errorCallback }) => {
  const { endpoint, options = {} } = data;
  try {
    // Fetch the data
    const res = await fetch(endpoint, options);
    // Check for errors
    if (res.error) {
      const message = {
        400: "Solicitud no exitosa",
        403: "Sin autorización para consultar",
        404: "No se encontró el servidor",
        500: "El servidor no pudo procesar la solicitud",
      };
      throw {
        name: `Error ${res.status}`,
        message: message[res.status] || res.statusText,
      };
    }
    // Update data
    callback(await res.json());
    errorCallback(null);
  } catch (err) {
    errorCallback(err);
  }
};
