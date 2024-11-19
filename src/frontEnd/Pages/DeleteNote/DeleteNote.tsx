import React, { useState } from "react";
import { FileText, AlertTriangle, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Dashboard/components/Sidebar";

interface Note {
  id: number;
  patientName: string;
  date: string;
  content: string;
}

const DeleteNote: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  // Mock notes data
  const notes: Note[] = [
    {
      id: 1,
      patientName: "Jean Dupont",
      date: "2024-03-15",
      content: "Consultation de routine - Tension artérielle normale",
    },
    {
      id: 2,
      patientName: "Marie Martin",
      date: "2024-03-14",
      content: "Suivi traitement diabète - Glycémie stable",
    },
    {
      id: 3,
      patientName: "Pierre Bernard",
      date: "2024-03-13",
      content: "Consultation urgente - Angine",
    },
  ];

  const filteredNotes = notes.filter(
    (note) =>
      note.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = () => {
    if (selectedNote) {
      console.log("Deleting note:", selectedNote);
      navigate("/patients");
    }
  };

  return (
    <div className="flex w-screen h-screen">
      <Sidebar />
      <div className="p-8 flex-1">
        <div className="flex items-center gap-3 mb-8">
          <FileText className="text-blue-600" size={32} />
          <h1 className="text-3xl font-bold text-gray-800">
            Supprimer une Note Médicale
          </h1>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 max-w-3xl">
          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Rechercher une note..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search
                className="absolute left-3 top-2.5 text-gray-400"
                size={20}
              />
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Notes Médicales
            </h2>
            <div className="space-y-2">
              {filteredNotes.map((note) => (
                <div
                  key={note.id}
                  className={`p-4 rounded-lg cursor-pointer transition-colors ${
                    selectedNote?.id === note.id
                      ? "bg-red-50 border-2 border-red-200"
                      : "bg-gray-50 hover:bg-gray-100"
                  }`}
                  onClick={() => setSelectedNote(note)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <p className="font-medium text-gray-800">
                      {note.patientName}
                    </p>
                    <p className="text-sm text-gray-600">
                      {new Date(note.date).toLocaleDateString()}
                    </p>
                  </div>
                  <p className="text-sm text-gray-600">{note.content}</p>
                </div>
              ))}
            </div>
          </div>

          {selectedNote && (
            <div className="border-t pt-6">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-2 text-red-600 mb-2">
                  <AlertTriangle size={20} />
                  <h3 className="font-semibold">Confirmation de suppression</h3>
                </div>
                <p className="text-red-600">
                  Êtes-vous sûr de vouloir supprimer définitivement cette note
                  médicale pour <strong>{selectedNote.patientName}</strong> ?
                  Cette action est irréversible.
                </p>
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => navigate("/patients")}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Annuler
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Confirmer la suppression
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeleteNote;
