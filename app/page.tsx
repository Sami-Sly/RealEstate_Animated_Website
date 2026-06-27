// app/page.tsx  (or pages/index.tsx — adjust import paths as needed)
import Navbar from "@/components/Navbar";
import ProgressBar from "@/components/ProgressBar";
import ScrollCanvas from "@/components/ScrollCanvas";
import ScentSection from "@/components/ScentSection";
import DetailsSection from "@/components/DetailsSection";
import AcquireSection from "@/components/AcquireSection";
import Footer from "@/components/Footer";
// import DonutShowcase from "@/components/DonutsShowcase";

export default function Home() {
  return (
    <main style={{ background: "#0B0906", minHeight: "100vh" }}>
      <ProgressBar />
      {/* Navbar manages its own scroll state internally — no props needed */}
      <Navbar />
      <ScrollCanvas />
      <ScentSection />
      <DetailsSection />
      <AcquireSection />
      <Footer />
            {/* <DonutShowcase /> */}
    </main>
  );
}