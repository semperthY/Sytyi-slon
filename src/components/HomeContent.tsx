"use client";

import { useWelcome } from "../hooks/useWelcome";

import WelcomeScreen from "./WelcomeScreen";
import Header from "./Header";
import Hero from "./Hero";
import MenuSection from "./MenuSection";
import About from "./About";
import Contacts from "./Contacts";
import Footer from "./Footer";
import Services from "./Services";

export default function HomeContent() {
  const { ready, visible, closing } = useWelcome();

  if (!ready) {
    return null;
  }

  if (visible) {
    return <WelcomeScreen closing={closing} />;
  }

  return (
    <>
      <Header />
      <Hero />
      <MenuSection />
      <Services />
      <About />
      <Contacts />
      <Footer />
    </>
  );
}
