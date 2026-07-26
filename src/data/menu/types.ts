export interface MenuItem {
  id: string;
  name: string;
  price: number;
  weight?: string;
  pieces?: number;
  description?: string;
}

export interface MenuCategory {
  title: string;
  items: MenuItem[];
}