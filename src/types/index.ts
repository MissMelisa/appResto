export type Size = {
  size: string;
  price: number;
};

export type SelectedSize = {
  size: string;
  price: number;
};
export type Cart = {
  excludedItems: string[];
  id?: number;
  image?: string;
  nameItem: string;
  quantity: number;
  selectedOptions: Record<string, string>;
  selectedSize: SelectedSize;
  description?: string;
};

export type FoodData = {
  id: number;
  name: string;
  image: string;
  description: string;
  excludedItems: string[];
  sizes: Record<string, number>;
  options: Record<string, string[]>;
};
