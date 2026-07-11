import MenuSection from "../components/MenuSection";
import Header from "../components/Header";
import About from "../components/About";

export default function Home() {
  return (
    <>
      <Header />

      <main className="min-h-screen bg-neutral-950 text-white flex flex-col items-center justify-center px-6">
        <h2 className="text-5xl font-bold">
          Добро пожаловать!
        </h2>

        <p className="mt-6 max-w-md text-center text-neutral-300">
          Добро пожаловать в кафе «Сытый Слонъ».
        </p>
      </main>
     <MenuSection />
    <About />
    </>
  );
}
