import React from 'react';
import { Calendar, Clock, User } from 'lucide-react';

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
    imageUrl: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300&h=300"
  },
  {
    id: 2,
    name: "Dr. James Wilson",
    specialty: "Neurologie",
    imageUrl: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=300&h=300"
  },
  {
    id: 3,
    name: "Dr. Emily Chen",
    specialty: "Pneumologie",
    imageUrl: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=300&h=300"
  }
];

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-b from-blue-50 to-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Votre Santé, Notre Priorité
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Prenez rendez-vous facilement avec nos spécialistes qualifiés pour des soins médicaux personnalisés
          </p>
          <button className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition-colors">
            Prendre Rendez-vous
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <Calendar className="h-12 w-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Rendez-vous en ligne</h3>
            <p className="text-gray-600">Réservez votre consultation 24/7</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <Clock className="h-12 w-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Horaires flexibles</h3>
            <p className="text-gray-600">Consultations adaptées à votre emploi du temps</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <User className="h-12 w-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Suivi personnalisé</h3>
            <p className="text-gray-600">Une prise en charge adaptée à vos besoins</p>
          </div>
        </div>

        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Nos Médecins Spécialistes</h2>
          <p className="text-xl text-gray-600">Une équipe de professionnels à votre service</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {doctors.map((doctor) => (
            <div key={doctor.id} className="bg-white rounded-xl shadow-md overflow-hidden">
              <img 
                src={doctor.imageUrl} 
                alt={doctor.name} 
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{doctor.name}</h3>
                <p className="text-gray-600">{doctor.specialty}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}