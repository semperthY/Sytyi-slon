interface PageHeroProps {
  title: string;
  subtitle: string;
}

export default function PageHero({
  title,
  subtitle,
}: PageHeroProps) {
  return (
    <section className="bg-gradient-to-b from-amber-900 via-amber-800 to-amber-700 text-white">
      <div className="mx-auto max-w-6xl px-6 py-20 text-center">
        <h1 className="text-4xl font-bold md:text-5xl">
          {title}
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-amber-100">
          {subtitle}
        </p>
      </div>
    </section>
  );
}
