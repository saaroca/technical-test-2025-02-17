export default function useAlexPhone() {
  const baseUrl = "/api";

  /** Interfaz para un SKU */
  interface Sku {
    id: string;
    sku: string;
    name: string;
    description: string;
    price: number;
    grade: "excellent" | "very_good" | "good";
    color: "white" | "black" | "red" | "pink";
    storage: 64 | 128 | 256 | 512;
    image: string;
  }

  /** Función para obtener todos los SKUs */
  const fetchSkus = async (): Promise<Sku[]> => {
    const { data, error } = await useFetch<Sku[]>(`${baseUrl}/skus`);
    if (error) throw new Error("Error al obtener la lista de SKUs");
    return data;
  };

  /** Función para obtener detalles de un SKU */
  const fetchSkuDetails = async (sku: string): Promise<Sku> => {
    const { data, error } = await useFetch<Sku>(`${baseUrl}/sku/${sku}`);
    if (error) throw new Error(`Error al obtener detalles del SKU ${sku}`);
    return data;
  };

  /** Función para confirmar una compra */
  const confirmPurchase = async (orderData: { sku: string; quantity: number }): Promise<void> => {
    const { error } = await useFetch(`${baseUrl}/order`, {
      method: "PUT",
      body: JSON.stringify(orderData),
    });
    if (error) throw new Error("Error al confirmar la compra");
  };

  return { fetchSkus, fetchSkuDetails, confirmPurchase };
}

/** Función genérica para hacer peticiones HTTP */
async function useFetch<T>(url: string, options: RequestInit = {}): Promise<{ data: T; error: Error | null }> {
  const response = await fetch(url, {
    method: options.method || "GET",
    headers: { "Content-Type": "application/json" },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  const error = !response.ok ? new Error("Fetch error") : null;
  const data = response.ok ? await response.json() : null;

  return { data, error };
}
