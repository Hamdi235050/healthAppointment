import Footer from "../Footer";
import Hero from "../Hero";
import Navbar from "../Navbar";
import Services from "../Services";
import Team from "../Team";

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  imageUrl: string;
}

export const Accueil = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <Services />
      <Team />
      <Footer />
    </div>
  );
};
