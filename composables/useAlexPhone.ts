export function useAlexPhone() {
  const config = useRuntimeConfig(); // Para manejar variables de entorno
  const baseUrl = config.public.apiUrl || "https://test.alexphone.com/api/v1";

  // 🔹 Obtener la lista de iPhones (SKUs)
  const fetchSkus = async () => {
    const { data, error } = await useFetch(`${baseUrl}/skus`);
    if (error) throw new Error("Error al obtener la lista de SKUs");
    return data.value;
  };

  // 🔹 Obtener detalles de un iPhone por SKU
  const fetchSkuDetails = async (sku: string) => {
    const { data, error } = await useFetch(`${baseUrl}/sku/${sku}`);
    if (error) throw new Error(`Error al obtener detalles del SKU ${sku}`);
    return data.value;
  };

  // 🔹 Confirmar una compra
  const confirmPurchase = async (orderData: object) => {
    const { error } = await useFetch(`${baseUrl}/order`, {
      method: "PUT",
      body: orderData,
    });
    if (error) throw new Error("Error al confirmar la compra");
  };

  return { fetchSkus, fetchSkuDetails, confirmPurchase };
}

function useRuntimeConfig() {
  return {
    public: {
      apiUrl: process.env.PUBLIC_API_URL,
    },
  };
}

async function useFetch(
  url: string,
  options?: { method?: string; body?: object }
) {
  const response = await fetch(url, {
    method: options?.method || "GET",
    headers: {
      "Content-Type": "application/json",
    },
    body: options?.body ? JSON.stringify(options.body) : undefined,
  });

  const data = await response.json();
  const error = !response.ok ? new Error(data.message || "Fetch error") : null;

  return { data, error };
}
