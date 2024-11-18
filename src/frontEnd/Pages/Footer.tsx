import React from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Facebook,
  Twitter,
  Instagram,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-blue-400" />
                <span>123 Avenue de la Médecine, 75001 Paris</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-blue-400" />
                <span>01 23 45 67 89</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-blue-400" />
                <span>contact@cabinet-medical.fr</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Horaires d'ouverture</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-2 text-blue-400" />
                <span>Lundi - Vendredi: 8h-19h</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-2 text-blue-400" />
                <span>Samedi: 9h-12h</span>
              </div>
              <div className="mt-4 text-sm text-gray-400">
                Fermé les dimanches et jours fériés
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Informations légales</h3>
            <ul className="space-y-2">
              <li className="hover:text-blue-400 cursor-pointer">
                Mentions légales
              </li>
              <li className="hover:text-blue-400 cursor-pointer">
                Politique de confidentialité
              </li>
              <li className="hover:text-blue-400 cursor-pointer">CGU</li>
              <li className="hover:text-blue-400 cursor-pointer">
                Plan du site
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Urgences</h3>
            <p className="mb-4">
              Pour les urgences médicales, composez le 15 ou rendez-vous aux
              urgences les plus proches.
            </p>
            <div className="space-y-4">
              <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                Prendre RDV en ligne
              </button>
              <div className="flex justify-center space-x-4">
                <Facebook className="h-6 w-6 text-blue-400 hover:text-blue-300 cursor-pointer" />
                <Twitter className="h-6 w-6 text-blue-400 hover:text-blue-300 cursor-pointer" />
                <Instagram className="h-6 w-6 text-blue-400 hover:text-blue-300 cursor-pointer" />
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400">
            &copy; 2024 Rendez Vous Senté. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}
