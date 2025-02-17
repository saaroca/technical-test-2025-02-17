export default function useAlexPhone() {
  const config = useRuntimeConfig();
  const baseUrl = config.public.apiUrl || "https://test.alexphone.com/api/v1";

  const fetchSkus = async () => {
    const { data, error } = await useFetch(`${baseUrl}/skus`);
    if (error) throw new Error("Error al obtener la lista de SKUs");
    return data.value;
  };

  const fetchSkuDetails = async (sku) => {
    const { data, error } = await useFetch(`${baseUrl}/sku/${sku}`);
    if (error) throw new Error(`Error al obtener detalles del SKU ${sku}`);
    return data.value;
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

function useRuntimeConfig() {
  return {
    public: {
      apiUrl: process.env.PUBLIC_API_URL,
    },
  };
}

async function useFetch(
  url,
  options
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
