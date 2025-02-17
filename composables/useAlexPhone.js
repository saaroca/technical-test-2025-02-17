export default function useAlexPhone() {
  const baseUrl = "/api"; // Usamos la ruta relativa a la API, porque el proxy se encargará de redirigirla

  const fetchSkus = async () => {
    const { data, error } = await useFetch(`${baseUrl}/skus`); // Usamos la ruta relativa
    if (error) throw new Error("Error al obtener la lista de SKUs");
    return data;
  };

  const fetchSkuDetails = async (sku) => {
    const { data, error } = await useFetch(`${baseUrl}/sku/${sku}`); // Usamos la ruta relativa
    if (error) throw new Error(`Error al obtener detalles del SKU ${sku}`);
    return data;
  };

  const confirmPurchase = async (orderData) => {
    const { error } = await useFetch(`${baseUrl}/order`, {
      method: "PUT",
      body: orderData,
    });
    if (error) throw new Error("Error al confirmar la compra");
  };

  return { fetchSkus, fetchSkuDetails, confirmPurchase };
}

async function useFetch(url, options = {}) {
  const response = await fetch(url, {
    method: options?.method || "GET",
    headers: {
      "Content-Type": "application/json",
    },
    body: options?.body ? JSON.stringify(options.body) : undefined,
  });

  // Si la respuesta no es exitosa, tratamos de obtener el error.
  const error = !response.ok ? new Error("Fetch error") : null;

  // Si la respuesta es correcta, parseamos los datos en formato JSON.
  const data = response.ok ? await response.json() : null;

  return { data, error };
}
