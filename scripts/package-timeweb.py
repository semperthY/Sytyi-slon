"""Package a Next.js static export for overlaying an existing Timeweb site."""

import argparse
from pathlib import Path
from zipfile import ZIP_DEFLATED, ZipFile


ROOT_FILES = {
    "404.html", "index.html", "index.txt", "robots.txt", "sitemap.xml",
    "apple-icon.png", "favicon.ico", "hero-bg.png", "icon.png", "logo.png",
    "og-image.png", "file.svg", "globe.svg", "next.svg", "vercel.svg", "window.svg",
}
ROUTES = {"404", "_not-found", "banquets", "gallery", "memorial", "menu"}
DESIGN_FILES = {
    "images/banquets-hero.jpg", "images/map-preview.png",
    "images/map-preview.webp", "images/memorial-hero.jpg",
}
PROTECTED = {"data", "uploads", "admin"}


def next_payload(name):
    return name.startswith("__next.") and name.endswith(".txt")


def classify(path):
    parts = path.parts
    top = parts[0]
    if any(part.startswith(".") for part in parts):
        return "skip"
    if top in PROTECTED or parts[:2] == ("images", "gallery"):
        return "skip"
    if len(parts) == 1 and (top in ROOT_FILES or next_payload(top)):
        return "include"
    if top in ROUTES and len(parts) == 2:
        if path.name in {"index.html", "index.txt"} or next_payload(path.name):
            return "include"
    if top in ROUTES and len(parts) == 3 and parts[1].startswith("__next."):
        if next_payload(path.name) or path.name == "__PAGE__.txt":
            return "include"
    if parts[:2] == ("_next", "static") and path.suffix in {".js", ".css", ".woff2"}:
        return "include"
    if path.as_posix() in DESIGN_FILES:
        return "include"
    if parts[:2] == ("images", "hero") and path.suffix == ".jpg":
        return "include"
    return "unknown"


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("archive", type=Path, help="Destination ZIP outside out/")
    args = parser.parse_args()

    export = Path(__file__).resolve().parents[1] / "out"
    archive = args.archive.resolve()
    if archive.suffix.lower() != ".zip" or archive.is_relative_to(export):
        parser.error("Choose a ZIP path outside out/.")
    if not (export / "index.html").is_file() or not (export / "_next/static").is_dir():
        parser.error("Run npm run build first.")

    included, unknown = [], []
    for file in sorted(export.rglob("*")):
        if file.is_symlink():
            parser.error(f"Unexpected symbolic link in export: {file.relative_to(export)}")
        if not file.is_file():
            continue
        path = file.relative_to(export)
        kind = classify(path)
        if kind == "include":
            included.append(path)
        elif kind == "unknown":
            unknown.append(path.as_posix())
    if unknown:
        parser.error("Unclassified export files:\n" + "\n".join(unknown))

    manifest = archive.with_suffix(".files.txt")
    if archive.exists() or manifest.exists():
        parser.error("Choose a new ZIP path. The archive or its manifest already exists.")
    archive.parent.mkdir(parents=True, exist_ok=True)
    with ZipFile(archive, "x", compression=ZIP_DEFLATED) as bundle:
        for path in included:
            bundle.write(export / path, path.as_posix())
    with manifest.open("x", encoding="utf-8") as listing:
        for path in included:
            listing.write(path.as_posix() + "\n")
    print(f"{archive} ({len(included)} files)\n{manifest}")


if __name__ == "__main__":
    main()
