import React, { useEffect, useState } from "react";
import { FileText, AlertTriangle, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Dashboard/components/Sidebar";
import { getNoteData } from "../../../backEnd/getNoteData";
import { PatientEditType } from "../EditPatient/EditPatientType";
import { getPatientData } from "../../../backEnd/getPatients";
import { deleteNote } from "../../../backEnd/deleteNote";

interface Note {
  noteId: number;
  patientName: string;
  dateAdded: string;
  content: string;
  patientId: number;
  contenu?: string;
  id?: string;
}

const DeleteNote: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  const [notes, setNotes] = useState<Note[]>([]);
  const [patients, setPatients] = useState<PatientEditType[]>([]);
  useEffect(() => {
    const fetchPatientData = async () => {
      const patientData = await getPatientData();
      setPatients(patientData);
    };
    fetchPatientData();
  }, []);
  console.log({ notes });
  useEffect(() => {
    const fetchPatientData = async () => {
      const notes = await getNoteData();
      const list: Note[] = notes.map((note) => ({
        id: note.noteId,
        patientName: patients.find((p) => p.id === note.patient.id)?.firstName,
        patientId: note.patient.id,
        dateAdded:
          new Date(note.dateAjout).toLocaleDateString("fr") ??
          new Date().toLocaleDateString(),
        content: note.contenu,
      }));
      setNotes(list);
    };
    fetchPatientData();
  }, [notes]);

  const filteredNotes = notes.filter(
    (note) =>
      note.patientName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = () => {
    if (selectedNote) {
      deleteNote(selectedNote.id);
      setSelectedNote(null);
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

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
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
              {filteredNotes.map((note, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg cursor-pointer transition-colors ${
                    selectedNote?.id === note?.id
                      ? "bg-red-50 border-2 border-red-200"
                      : "bg-gray-50 hover:bg-gray-100"
                  }`}
                  onClick={() => setSelectedNote(note)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <p className="font-medium text-gray-800">
                      {note.patientName}
                    </p>
                    <p className="text-sm text-gray-600">{note?.dateAdded}</p>
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
                  onClick={() => setSelectedNote(null)}
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
