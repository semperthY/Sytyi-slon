import HomeContent from "../components/HomeContent";

export default function Home() {
  return <HomeContent festive={process.env.SITE_EDITION === "holiday"} />;
}
