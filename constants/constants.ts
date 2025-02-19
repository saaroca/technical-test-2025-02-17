export const SortOptions = {
  LOW_TO_HIGH: "lowToHigh",
  HIGH_TO_LOW: "highToLow",
  GRADE: "grade",
  STORAGE: "storage",
};

export const sortText = {
  PRICE_LOW: "Precio más bajo",
  PRICE_HIGH: "Precio más alto",
  BEST_GRADE: "Mejor estado",
  HIGH_STORAGE: "Mayor almacenamiento"
}

export enum Grade {
  excellent = 3,
  very_good = 2,
  good = 1,
}

export const GradeOrder = [Grade.excellent, Grade.very_good, Grade.good];

export const StorageOrder = [512, 256, 128, 64];
