export default function useAlexPhone() {
  const baseUrl = "/api";

  /**obtener todos los SKUs */
  const fetchSkus = async (): Promise<Sku[]> => {
    const { data, error } = await useFetch<Sku[]>(`${baseUrl}/skus`);
    if (error) throw new Error("Error al obtener la lista de SKUs");
    return data;
  };

  /**Obtener detalles del SKU */
  const fetchSkuDetails = async (sku: string): Promise<Sku> => {
    const { data, error } = await useFetch<Sku>(`${baseUrl}/sku/${sku}`);
    if (error) throw new Error(`Error al obtener detalles del SKU ${sku}`);
    return data;
  };

  /** Función de compra */
  const confirmPurchase = async (orderData: CreateOrderBody): Promise<void> => {
    const { error } = await useFetch(`${baseUrl}/order`, {
      method: "PUT",
      body: JSON.stringify(orderData),
    });

    if (error) throw new Error("Error al confirmar la compra");
  };

  return { fetchSkus, fetchSkuDetails, confirmPurchase };
}

/** Función para peticiones HTTP */
async function useFetch<T>(
  url: string,
  options: RequestInit = {}
): Promise<{ data: T; error: Error | null }> {
  const response = await fetch(url, {
    method: options.method || "GET",
    headers: { "Content-Type": "application/json" },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  const error = !response.ok ? new Error("Fetch error") : null;
  const data = response.ok ? await response.json() : null;

  return { data, error };
}
