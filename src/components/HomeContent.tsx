"use client";

import { useWelcome } from "../hooks/useWelcome";

import WelcomeScreen from "./WelcomeScreen";
import Header from "./Header";
import Hero from "./Hero";
import MenuSection from "./MenuSection";
import About from "./About";
import Contacts from "./Contacts";
import Footer from "./Footer";

export default function HomeContent() {
  const { visible, closing } = useWelcome();

  if (visible) {
    return <WelcomeScreen closing={closing} />;
  }

  return (
    <>
      <Header />
      <Hero />
      <MenuSection />
      <About />
      <Contacts />
      <Footer />
    </>
  );
}
