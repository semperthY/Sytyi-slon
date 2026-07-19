import { MenuItem } from "@/data/menu";

type Props = {
  item: MenuItem;
};

export default function MenuCard({ item }: Props) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-yellow-500/20 bg-zinc-900 transition-all duration-300 hover:-translate-y-1 hover:border-yellow-500 hover:shadow-xl hover:shadow-yellow-500/10">
      <div className="flex aspect-video items-center justify-center bg-zinc-800 text-5xl">
        🍽️
      </div>

      <div className="space-y-3 p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-semibold text-white">
            {item.name}
          </h3>

          <span className="whitespace-nowrap rounded-full bg-yellow-500 px-3 py-1 text-sm font-bold text-black">
            {item.price}
          </span>
        </div>

        {item.weight && (
          <p className="text-sm text-zinc-400">
            {item.weight}
          </p>
        )}

        {item.description && (
          <p className="text-sm leading-6 text-zinc-300">
            {item.description}
          </p>
        )}
      </div>
    </article>
  );
}
