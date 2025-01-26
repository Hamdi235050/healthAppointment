import { useState, useEffect } from "react";
import { Settings as SettingsIcon } from "lucide-react";
import Sidebar from "./components/Sidebar";
import { updateEmailSetting, updateName } from "../../../backEnd/Settings";
import { toast } from "react-toastify";
import { getEmail, getName } from "../../../backEnd/getNameSettings";
const Settings = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [cabinetName, setCabinetName] = useState("");
  const [email, setEmail] = useState("");
  const handleDarkModeChange = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  useEffect(() => {
    const fetchData = async () => {
      const savedDarkMode = localStorage.getItem("darkMode") === "true";
      const savedName = await getName();
      const savedEmail = await getEmail();
      setCabinetName(savedName.replace(/"/g, ""));
      setEmail(savedEmail.replace(/"/g, ""));
      setIsDarkMode(savedDarkMode);
    };
    fetchData();
  }, []);

  const handleSaveName = async () => {
    try {
      await updateName(cabinetName);
      toast.success("Nom du cabinet mis à jour avec succès !");
    } catch (error) {
      console.error("Error updating name:", error);
      toast.error("Une erreur est survenue lors de la mise à jour du nom.");
    }
  };
  const handleSaveEmail = async () => {
    try {
      await updateEmailSetting(email);
      toast.success("Adresse email mise à jour avec succès !");
    } catch (error) {
      console.error("Error updating email:", error);
      toast.error("Une erreur est survenue lors de la mise à jour de l'email.");
    }
  };
  useEffect(() => {
    localStorage.setItem("darkMode", isDarkMode.toString());
    if (isDarkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <div
      className={`flex h-screen w-screen ${
        isDarkMode ? "bg-gray-900" : "bg-white"
      }`}
    >
      <Sidebar />
      <div className="p-8 flex-1">
        <div className="flex items-center gap-3 mb-8">
          <SettingsIcon className="text-blue-600" size={32} />
          <h1
            className={`text-3xl font-bold ${
              isDarkMode ? "text-white" : "text-gray-800"
            }`}
          >
            Paramètres
          </h1>
        </div>

        <div
          className={`rounded-lg shadow-sm p-6 border ${
            isDarkMode
              ? "border-gray-700 bg-gray-800"
              : "border-gray-100 bg-white"
          }`}
        >
          <div className="space-y-6">
            <div>
              <h2
                className={`text-xl font-semibold mb-4 ${
                  isDarkMode ? "text-white" : "text-gray-800"
                }`}
              >
                Informations du Cabinet
              </h2>
              <div className="space-y-4">
                <div>
                  <label
                    className={`block text-sm font-medium ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    } mb-1`}
                  >
                    Nom du Cabinet
                  </label>
                  <input
                    type="text"
                    value={cabinetName}
                    onChange={(e) =>
                      setCabinetName(e.target.value.replace(/"/g, ""))
                    }
                    onBlur={handleSaveName} // Save on blur
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      isDarkMode
                        ? "border-gray-600 text-white focus:ring-blue-500 bg-gray-900"
                        : "border-gray-200 text-gray-900 focus:ring-blue-500"
                    }`}
                  />
                </div>
                <div>
                  <label
                    className={`block text-sm font-medium ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    } mb-1`}
                  >
                    Adresse Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={handleSaveEmail} // Save on blur
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      isDarkMode
                        ? "border-gray-600 text-white focus:ring-blue-500 bg-gray-900"
                        : "border-gray-200 text-gray-900 focus:ring-blue-500"
                    }`}
                  />
                </div>
              </div>
            </div>

            <div>
              <h2
                className={`text-xl font-semibold mb-4 ${
                  isDarkMode ? "text-white" : "text-gray-800"
                }`}
              >
                Préférences
              </h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="notifications"
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    defaultChecked
                  />
                  <label
                    htmlFor="notifications"
                    className={`ml-2 ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Activer les notifications
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="darkMode"
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    checked={isDarkMode}
                    onChange={handleDarkModeChange}
                  />
                  <label
                    htmlFor="darkMode"
                    className={`ml-2 ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Mode sombre
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
