import React from "react";

interface FormSelectProps {
  label: string;
  options: string[];
  className?: string;
  defaultValue?: string;
}

export default function FormSelect({
  label,
  options,
  className = "",
  defaultValue,
}: FormSelectProps) {
  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <select
        defaultValue={defaultValue}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        {options.map((option, index) => (
          <option key={index}>{option}</option>
        ))}
      </select>
    </div>
  );
}
