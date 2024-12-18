import React from "react";
import Hero from "../Hero";
import Services from "../Services";
import Team from "../Team";
import Navbar from "../Navbar";
import Footer from "../Footer";

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
