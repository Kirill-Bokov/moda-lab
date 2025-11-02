import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ children, className, ...props }: ButtonProps) {
  return (
    <button
      className={`px-3 py-1.5 rounded-md font-medium text-gray-900 bg-transparent hover:bg-gray-100 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
