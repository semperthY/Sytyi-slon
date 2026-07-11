import { menu } from "../data/menu";
export default function MenuSection() {
  return (
    <section className="px-6 py-16 bg-neutral-900 text-white">
      <h2 className="text-4xl font-bold text-center mb-10">
        Наше меню
      </h2>
 <div className="grid gap-6 md:grid-cols-3">
       {menu.map((item) => (
        <div
        key={item.id}
        className="rounded-2xl bg-neutral-800 p-6"
        >
       <h3 className="text-2xl font-semibold">
       {item.name}
       </h3>

       <p className="mt-2 text-yellow-400 font-bold">
       {item.price}
       </p>

       <p className="mt-3 text-neutral-300">
       {item.description}
    </p>
  </div>
))}

      </div>
    </section>
  );
}
