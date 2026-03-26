import Navbar from "@/components/layout/navbar";
import Header from "@/components/layout/header";
import HowItWorks from "@/components/layout/howItWorks";
import SecurityPipeline from "@/components/layout/security-pipeline";
import Architecture from "@/components/layout/architecture";
import Footer from "@/components/layout/footer";

export default function Page() {
  return (
    <>
      <Navbar />
      <Header />
      <HowItWorks />
      <SecurityPipeline />
      <Architecture />
      <Footer />
    </>
  );
}
