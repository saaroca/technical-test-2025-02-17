export default function useAlexPhone() {
  const baseUrl = "/api";

  /**obtener todos los SKUs */
  const fetchSkus = async (): Promise<Sku[] | null> => {
    const { data, error } = await useFetch<Sku[]>(`${baseUrl}/skus`);
    if (error) throw new Error("Error al obtener la lista de SKUs");
    return data;
  };

  /**Obtener detalles del SKU */
  const fetchSkuDetails = async (sku: string): Promise<Sku | null> => {
    const { data, error } = await useFetch<Sku>(`${baseUrl}/sku/${sku}`);
    if (error) throw new Error(`Error al obtener detalles del SKU ${sku}`);
    return data;
  };

  /** Función de compra */
  const confirmPurchase = async (orderData: CreateOrderBody): Promise<void> => {
    const { data, error } = await useFetchForConfirmPurchase(
      `${baseUrl}/order`,
      {
        method: "PUT",
        body: JSON.stringify(orderData),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    if (error) handleError(new Error("Error al confirmar la compra"));
    if (data === null) return;
  };

  return { fetchSkus, fetchSkuDetails, confirmPurchase };
}

/**peticiones HTTP */
async function useFetch<T>(
  url: string,
  options: RequestInit = {}
): Promise<{ data: T | null; error: Error | null }> {
  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  const error = !response.ok ? new Error(await response.text()) : null;
  const data = response.ok ? await response.json() : null;

  return { data, error };
}

async function useFetchForConfirmPurchase<T>(
  url: string,
  options: RequestInit = {}
): Promise<{ data: T | null; error: Error | null }> {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
    });

    const error = !response.ok ? new Error(await response.text()) : null;

    const data =
      response.ok && response.status !== 204 ? await response.json() : null;

    return { data, error };
  } catch (err) {
    handleError(new Error("Error en la solicitud"));
    return { data: null, error: new Error("Error en la solicitud") };
  }
}

const handleError = (error: Error) => {
  console.error(error);
  throw error;
};
