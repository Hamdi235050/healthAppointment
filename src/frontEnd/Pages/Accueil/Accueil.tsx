import Footer from "../Footer";
import Navbar from "../Navbar";
import { Services } from "../../../components/Hero";
import Hero from "../../../components/Hero/src/Hero";
import Team from "../Team";
import Testimonials from "../../../components/Hero/src/Team";

export const Accueil = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <Services />
      <Testimonials />
      <Footer />
    </div>
  );
};
