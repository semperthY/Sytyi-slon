export type MenuItem = {
  id: number;
  category: string;
  name: string;
  price: number;
  weight?: string;
  description?: string;
};

export const menu: MenuItem[] = [
  // Закуски
  {
    id: 1,
    category: "Закуски",
    name: "Сырная тарелка",
    weight: "250 г",
    price: 755,
  },
  {
    id: 2,
    category: "Закуски",
    name: "Сыр бри с грушей",
    weight: "250 г",
    price: 425,
  },
  {
    id: 3,
    category: "Закуски",
    name: "Крылья BBQ",
    weight: "200 г",
    price: 599,
  },
  {
    id: 4,
    category: "Закуски",
    name: "Филе атлантической сельди в горчичном соусе",
    weight: "200 г",
    price: 200,
  },
  {
    id: 5,
    category: "Закуски",
    name: "Мясная тарелка",
    weight: "250 г",
    price: 755,
  },

  // Горячие закуски
  {
    id: 6,
    category: "Горячие закуски",
    name: "Креветки жареные",
    weight: "150 г",
    price: 500,
  },
  {
    id: 7,
    category: "Горячие закуски",
    name: "Куриные крылышки",
    weight: "300 г",
    price: 355,
  },
  {
    id: 8,
    category: "Горячие закуски",
    name: "Пельмени жареные",
    weight: "15 шт",
    price: 300,
  },

  // Салаты
  {
    id: 9,
    category: "Салаты",
    name: "Цезарь",
    weight: "250 г",
    price: 465,
  },
  {
    id: 10,
    category: "Салаты",
    name: "Цезарь с креветками",
    weight: "250 г",
    price: 585,
  },
  {
    id: 11,
    category: "Салаты",
    name: "Греческий",
    weight: "250 г",
    price: 395,
  },
  {
    id: 12,
    category: "Салаты",
    name: "Капрезе",
    weight: "250 г",
    price: 385,
  },
  {
    id: 13,
    category: "Салаты",
    name: "Зелёный салат с уткой",
    weight: "250 г",
    price: 565,
  },
  {
    id: 14,
    category: "Салаты",
    name: "Сельдь под шубой",
    weight: "250 г",
    price: 250,
  },
  // Горячие блюда
  {
    id: 15,
    category: "Горячие блюда",
    name: "Свиная отбивная",
    weight: "360 г",
    price: 360,
  },
  {
    id: 16,
    category: "Горячие блюда",
    name: "Ромштекс куриный",
    weight: "360 г",
    price: 360,
  },
  {
    id: 17,
    category: "Горячие блюда",
    name: "Треска запечённая под шубой",
    weight: "300 г",
    price: 300,
  },
  {
    id: 18,
    category: "Горячие блюда",
    name: "Жаркое из телятины в горшочке",
    weight: "350/400 г",
    price: 400,
  },
  {
    id: 19,
    category: "Горячие блюда",
    name: "Котлеты «По-киевски»",
    weight: "250 г",
    price: 250,
  },
  {
    id: 20,
    category: "Горячие блюда",
    name: "Пельмени домашние",
    weight: "400 г",
    price: 400,
  },
  {
    id: 21,
    category: "Горячие блюда",
    name: "Пельмени говядина (12 шт.)",
    price: 450,
  },
  {
    id: 22,
    category: "Горячие блюда",
    name: "Рыба запечённая в горшочке",
    price: 400,
  },
  {
    id: 23,
    category: "Горячие блюда",
    name: "Жюльен с грибами в сливках с сыром",
    price: 400,
  },

  // Супы
  {
    id: 24,
    category: "Супы",
    name: "Солянка мясная",
    weight: "300 мл",
    price: 250,
  },
  {
    id: 25,
    category: "Супы",
    name: "Харчо",
    weight: "300 мл",
    price: 300,
  },
  {
    id: 26,
    category: "Супы",
    name: "Пити из баранины",
    weight: "300 мл",
    price: 400,
  },
  {
    id: 27,
    category: "Супы",
    name: "Окрошка",
    weight: "300 мл",
    price: 180,
  },

  // Гарниры
  {
    id: 28,
    category: "Гарниры",
    name: "Картофель по-деревенски",
    weight: "100 г",
    price: 200,
  },
  {
    id: 29,
    category: "Гарниры",
    name: "Картофель фри",
    weight: "100 г",
    price: 150,
  },
  {
    id: 30,
    category: "Гарниры",
    name: "Рис",
    weight: "100 г",
    price: 100,
  },
  {
    id: 31,
    category: "Гарниры",
    name: "Картофель жареный с грибами",
    weight: "100 г",
    price: 200,
  },

  // Паста
  {
    id: 32,
    category: "Паста",
    name: "Карбонара с беконом",
    price: 359,
  },
  {
    id: 33,
    category: "Паста",
    name: "Карбонара с креветками",
    price: 525,
  },
  {
    id: 34,
    category: "Паста",
    name: "Фетучини",
    price: 355,
  },
  {
    id: 35,
    category: "Паста",
    name: "Фетучини с ветчиной и сыром",
    price: 355,
  },
  {
    id: 36,
    category: "Паста",
    name: "Фетучини с курицей и грибами",
    price: 355,
  },
  // Десерты
  {
    id: 37,
    category: "Десерты",
    name: "Мороженое (3 шарика)",
    price: 200,
  },
  {
    id: 38,
    category: "Десерты",
    name: "Коктейль молочный",
    price: 150,
  },
  {
    id: 39,
    category: "Десерты",
    name: "Пирожное",
    price: 100,
  },
  {
    id: 40,
    category: "Десерты",
    name: "Чизкейк",
    price: 150,
  },

  // Пицца
  {
    id: 41,
    category: "Пицца",
    name: "Пицца в ассортименте",
    description:
      "Деревенская • Пепперони • Мясной пир • 4 сыра • Гавайская • Грибная • Охотничья • Дон Бекон",
    price: 900,
  },

  // Бургеры
  {
    id: 42,
    category: "Бургеры",
    name: "Маффин двойной с яйцом и котлетой из свинины",
    price: 250,
  },
  {
    id: 43,
    category: "Бургеры",
    name: "Чизбургер",
    price: 180,
  },
  {
    id: 44,
    category: "Бургеры",
    name: "Гамбургер",
    price: 150,
  },
  {
    id: 45,
    category: "Бургеры",
    name: "Гранд",
    price: 250,
  },
  {
    id: 46,
    category: "Бургеры",
    name: "Двойной Гранд",
    price: 300,
  },
  {
    id: 47,
    category: "Бургеры",
    name: "Чикенбургер",
    price: 250,
  },

  // Напитки
  {
    id: 48,
    category: "Напитки",
    name: "Морс (клюква/облепиха)",
    weight: "1 л",
    price: 250,
  },
  {
    id: 49,
    category: "Напитки",
    name: "Сок в ассортименте",
    weight: "1 л",
    price: 200,
  },
  {
    id: 50,
    category: "Напитки",
    name: "Кола / Спрайт / Фанта",
    weight: "0.33 л",
    price: 100,
  },
  {
    id: 51,
    category: "Напитки",
    name: "Кола / Спрайт / Фанта",
    weight: "0.5 л",
    price: 120,
  },
];
