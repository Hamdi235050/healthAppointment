import React from "react";

export default function Team() {
  const team = [
    {
      name: "Dr. Anis",
      role: "Cardiologue",
      image: "src/assets/avatarUser.jpg",
    },
    {
      name: "Dr. Mohamed",
      role: "Neurologue",
      image: "src/assets/avatarUser.jpg",
    },
    {
      name: "Dr. Salah",
      role: "Pneumologue",
      image: "src/assets/avatarUser.jpg",
    },
  ];

  return (
    <section id="equipe" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Notre Équipe Médicale
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Des professionnels de santé expérimentés à votre service
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
