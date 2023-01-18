import React, { ButtonHTMLAttributes } from "react";

export type ButtonProps = {
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: React.FC<ButtonProps> = ({
  className = "",
  type,
  disabled,
  onClick,
  children,
}) => {
  if (disabled)
    return (
      <div className={`py-2 px-4 rounded-xl text-md font-bold ${className}`}>
        {children}
      </div>
    );

  return (
    <button
      className={`py-2 px-4 rounded-xl text-md font-bold bg-green-700 text-gray-100 ${className}`}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
