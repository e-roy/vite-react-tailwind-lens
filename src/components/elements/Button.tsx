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
  const btnBase =
    "rounded-xl border border-black shadow-md hover:shadow-xl hover:bg-stone-100";

  if (disabled)
    return (
      <div className={`${btnBase} ${className} p-[1px]`}>
        <div className="flex px-4 py-2 font-medium m-[2px] rounded-lg">
          {children}
        </div>
      </div>
    );

  return (
    <button className={`${btnBase} ${className}`} type={type} onClick={onClick}>
      <div className="flex px-4 py-2 font-medium m-[3px] rounded-lg">
        {children}
      </div>
    </button>
  );
};
