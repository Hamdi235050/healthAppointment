import React from 'react';
import { Heart, Brain, Stethoscope, Activity } from 'lucide-react';

export default function Services() {
  const services = [
    {
      icon: Heart,
      title: "Cardiologie",
      description: "Suivi et traitement des pathologies cardiaques"
    },
    {
      icon: Brain,
      title: "Neurologie",
      description: "Diagnostic et traitement des troubles neurologiques"
    },
    {
      icon: Stethoscope,
      title: "Pneumologie",
      description: "Prise en charge des maladies respiratoires"
    },
    {
      icon: Activity,
      title: "Médecine générale",
      description: "Consultations et suivis médicaux réguliers"
    }
  ];

  return (
    <section id="services" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Nos Services Médicaux</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Une gamme complète de services médicaux pour répondre à tous vos besoins de santé
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <service.icon className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}