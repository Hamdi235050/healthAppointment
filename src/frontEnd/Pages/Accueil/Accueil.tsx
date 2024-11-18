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

const doctors: Doctor[] = [
  {
    id: 1,
    name: "Dr. Sarah Martin",
    specialty: "Cardiologie",
    imageUrl:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300&h=300",
  },
  {
    id: 2,
    name: "Dr. James Wilson",
    specialty: "Neurologie",
    imageUrl:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=300&h=300",
  },
  {
    id: 3,
    name: "Dr. Emily Chen",
    specialty: "Pneumologie",
    imageUrl:
      "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=300&h=300",
  },
];

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
