import { footer } from "../data/footer";

export default function Footer() {
  return (
    <footer className="bg-black px-6 py-8 text-white border-t border-neutral-800">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6">

        <nav className="flex flex-wrap justify-center gap-6">
          {footer.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition hover:text-yellow-400"
            >
              {link.name}
            </a>
          ))}
        </nav>

        <p className="text-sm text-neutral-500">
          © {new Date().getFullYear()} {footer.copyright}
        </p>

      </div>
    </footer>
  );
}
