import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Stethoscope, LogIn } from "lucide-react";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="bg-white shadow-sm fixed w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Stethoscope className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-semibold text-gray-900">
                Rendez Vous Senté
              </span>
            </Link>
          </div>
          <div className="flex items-center space-x-8">
            <Link
              to="/"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Accueil
            </Link>
            <a
              href="#services"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Services
            </a>
            <a
              href="#equipe"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Notre Équipe
            </a>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
              Prendre RDV
            </button>
            <button
              onClick={() => navigate("/login")}
              className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
            >
              <LogIn className="h-5 w-5" />
              <span>Connexion</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
