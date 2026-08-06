import type { MenuItem } from "@/data/menu";

type Props = {
  item: MenuItem;
};

export default function MenuCard({ item }: Props) {
  const value = item.value || item.weight || "";
  const hasImage = Boolean(item.image?.trim());
  const isAvailable = item.available !== false;

  return (
    <article
      className={`group overflow-hidden rounded-2xl border bg-zinc-900 transition-all duration-300 ${isAvailable
          ? "border-yellow-500/20 hover:-translate-y-1 hover:border-yellow-500 hover:shadow-xl hover:shadow-yellow-500/10"
          : "border-zinc-700 opacity-70"
        }`}
    >
      {hasImage && (
        <div className="aspect-[4/3] overflow-hidden bg-zinc-800">
          <img
            src={item.image}
            alt={item.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}

      <div className="space-y-3 p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-semibold leading-snug text-white">
            {item.name}
          </h3>

          <span className="whitespace-nowrap rounded-full bg-yellow-500 px-3 py-1 text-sm font-bold text-black">
            {item.price} ₽
          </span>
        </div>

        {value && (
          <p className="text-sm text-zinc-400">
            {value}
          </p>
        )}

        {item.description?.trim() && (
          <p className="text-sm leading-6 text-zinc-300">
            {item.description}
          </p>
        )}

        {!isAvailable && (
          <p className="text-sm font-medium text-zinc-500">
            Временно нет в наличии
          </p>
        )}
      </div>
    </article>
  );
}