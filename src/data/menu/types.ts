export interface MenuItem {
  id: string;
  slug?: string;
  name: string;
  description?: string;
  value?: string;
  weight?: string;
  pieces?: number;
  price: number;
  image?: string;
  visible?: boolean;
  available?: boolean;
  popular?: boolean;
  deleted?: boolean;
  sort?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface MenuCategory {
  slug?: string;
  title: string;
  items: MenuItem[];
}