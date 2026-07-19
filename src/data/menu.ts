export type MenuItem = {
  id: number;
  category: string;
  name: string;
  price: string;
  weight?: string;
  description?: string;
};

export const menu: MenuItem[] = [
  {
    id: 1,
    category: "Кофе",
    name: "Капучино",
    price: "4.50 €",
    description: "Классический кофе с молочной пенкой",
  },
  {
    id: 2,
    category: "Десерты",
    name: "Сырники",
    price: "8.90 €",
    description: "Домашние сырники со сметаной",
  },
  {
    id: 3,
    category: "Десерты",
    name: "Чизкейк",
    price: "5.90 €",
    description: "Нежный сливочный чизкейк",
  },
];
