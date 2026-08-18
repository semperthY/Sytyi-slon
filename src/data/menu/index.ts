import type { MenuCategory } from "./types";

import { salads } from "./salads";
import { sides } from "./sides";
import { meat } from "./meat";
import { homemade } from "./homemade";
import { soups } from "./soups";
import { bakery } from "./bakery";
import { drinks } from "./drinks";
import { coldRolls } from "./cold-rolls";
import { bakedRolls } from "./baked-rolls";
import { friedRolls } from "./fried-rolls";
import { onigiri } from "./onigiri";
import { sets } from "./sets";

export const menu: MenuCategory[] = [
    {
        title: "Салаты",
        items: salads,
    },
    {
        title: "Гарниры",
        items: sides,
    },
    {
        title: "Горячие блюда",
        items: meat,
    },
    {
        title: "Домашние блюда",
        items: homemade,
    },
    {
        title: "Первые блюда",
        items: soups,
    },
    {
        title: "Выпечка",
        items: bakery,
    },
    {
        title: "Напитки",
        items: drinks,
    },
    {
        title: "Холодные роллы",
        items: coldRolls,
    },
    {
        title: "Запечённые роллы",
        items: bakedRolls,
    },
    {
        title: "Жареные роллы",
        items: friedRolls,
    },
    {
        title: "Онигири",
        items: onigiri,
    },
    {
        title: "Сеты",
        items: sets,
    },
];

export * from "./types";
export * from "./salads";
export * from "./sides";
export * from "./meat";
export * from "./homemade";
export * from "./soups";
export * from "./bakery";
export * from "./drinks";
export * from "./cold-rolls";
export * from "./baked-rolls";
export * from "./fried-rolls";
export * from "./onigiri";
export * from "./sets";