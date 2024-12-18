import React from "react";

interface FormTextareaProps {
  label: string;
  rows?: number;
  placeholder?: string;
  className?: string;
  defaultValue?: string;
}

export default function FormTextarea({
  label,
  rows = 4,
  placeholder,
  className = "",
  defaultValue,
}: FormTextareaProps) {
  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <textarea
        rows={rows}
        defaultValue={defaultValue}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        placeholder={placeholder}
      />
    </div>
  );
}
