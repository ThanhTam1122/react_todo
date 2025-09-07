import type React from "react";

interface InputProps {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  type?: "text" | "email" | "password";
}

export const Input: React.FC<InputProps> = ({
  id,
  value,
  onChange,
  placeholder = "",
  disabled = false,
  className = "",
  type = "text",
}) => {
  return (
    <input
      id={id}
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      disabled={disabled}
      className={`px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 text-black ${className}`}
    />
  );
};
