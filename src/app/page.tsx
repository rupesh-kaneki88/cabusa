import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import ShortSummery from "@/components/ShortSummery";
import Sponsers from "@/components/Sponsers";
import Carousel from "@/components/Carousel";
import Youtube from "@/components/Youtube";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Hero />
        <ShortSummery />
        <Carousel />
        <Youtube />
        <Sponsers />
      </main>
      <Footer />
    </div>
  );
}