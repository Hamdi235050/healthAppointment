import React from "react";
import { noteType } from "../../../../../backEnd/type";

interface NoteCardProps {
  note: noteType;
}

const NoteCard: React.FC<NoteCardProps> = ({ note }) => (
  <div className="p-4 bg-gray-50 rounded-lg">
    <div className="flex items-center justify-between mb-2">
      <p className="font-medium text-gray-800">
        {note.patient?.firstName + " " + note?.patient?.lastName}
      </p>
      <span className="text-sm text-gray-600">{note.hoursElapsed}</span>
    </div>
    <p className="text-sm text-gray-600">{note.contenu}</p>
  </div>
);

export default NoteCard;
