interface PageHeroProps {
  title: string;
  subtitle: string;
  image: string;
}

export default function PageHero({
  title,
  subtitle,
  image,
}: PageHeroProps) {
  return (
    <section className="relative overflow-hidden text-white">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${image})`,
        }}
      />

      <div className="absolute inset-0 bg-black/60" />

      <div className="relative mx-auto max-w-6xl px-6 py-32 text-center">
        <h1 className="text-4xl font-bold md:text-6xl">
          {title}
        </h1>

        <p className="mx-auto mt-6 max-w-3xl text-lg text-neutral-200 md:text-xl">
          {subtitle}
        </p>
      </div>
    </section>
  );
}