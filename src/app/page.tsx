import WelcomeScreen from "../components/WelcomeScreen";
import Header from "../components/Header";
import Hero from "../components/Hero";
import MenuSection from "../components/MenuSection";
import About from "../components/About";
import Contacts from "../components/Contacts";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <WelcomeScreen />

      <Header />
      <Hero />
      <MenuSection />
      <About />
      <Contacts />
      <Footer />
    </>
  );
}
