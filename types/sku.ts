interface Sku {
  id: string;
  sku: string;
  name: string;
  description: string;
  price: number;
  grade: SkuGrade;
  color: SkuColor;
  storage: SkuStorage;
  image: string;
}

type SkuGrade = "excellent" | "very_good" | "good";
type SkuColor = "white" | "black" | "red" | "pink";
type SkuStorage = 64 | 128 | 256 | 512;

interface CreateOrderSku {
  id: string;
  sku: string;
  grade: SkuGrade;
  color: SkuColor;
  storage: SkuStorage;
}

interface CreateOrderBody {
  skus: Sku[];
}
