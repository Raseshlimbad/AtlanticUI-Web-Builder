import FeatureList from "@/components/FeatureList";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <div className="w-full">
      <Header />
      <Hero />
      <FeatureList />
      <Footer />
    </div>
  );
}
