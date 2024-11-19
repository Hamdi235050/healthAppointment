import React from 'react';
import { MedicalNote } from '../../types';

interface NoteCardProps {
  note: MedicalNote;
}

const NoteCard: React.FC<NoteCardProps> = ({ note }) => (
  <div className="p-4 bg-gray-50 rounded-lg">
    <div className="flex items-center justify-between mb-2">
      <p className="font-medium text-gray-800">{note.patientName}</p>
      <span className="text-sm text-gray-600">{note.timestamp}</span>
    </div>
    <p className="text-sm text-gray-600">{note.content}</p>
  </div>
)

export default NoteCard;