import React from "react";

interface FormInputProps {
  label: string;
  type?: string;
  placeholder?: string;
  className?: string;
  defaultValue?: string;
  value?: string; // Add the value prop for controlled input
  onChange?: React.ChangeEventHandler<HTMLInputElement>; // Optional onChange handler for controlled input
  name: string; // Add name prop for identifying the input
}

export default function FormInput({
  label,
  type = "text",
  placeholder,
  className = "",
  defaultValue,
  value,
  onChange,
  name,
}: FormInputProps) {
  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        type={type}
        name={name} // Pass name prop to the input
        defaultValue={defaultValue}
        value={value} // Use value prop for controlled input
        onChange={onChange} // Handle value changes for controlled input
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        placeholder={placeholder}
      />
    </div>
  );
}
