import React, { ButtonHTMLAttributes, FC } from "react";
import { LocationStates } from "routers/types";

export interface ButtonProps {
  containerClassName?: string;
  textSizeClass?: string;
  spacingClass?: string;
  colorClass?: string;
  //
  loading?: boolean;
  disabled?: boolean;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  href?: keyof LocationStates | string;
  targetBlank?: boolean;
  size?: string;
  onClick?: () => void;
}

const Button: FC<ButtonProps> = ({
  containerClassName = "hover:shadow-md",
  textSizeClass = "text-base sm:text-sm",
  spacingClass = "px-3 py-2",
  colorClass = "bg-primary text-gray-100",
  disabled = false,
  href,
  children,
  targetBlank,
  type,
  loading,
  onClick = () => {},
}) => {
  const CLASSES = `ttnc-button inline-flex items-center ${containerClassName} ${textSizeClass} ${spacingClass} ${colorClass}`;

  const _renderLoading = () => {
    return (
      <svg
        className="animate-spin -ml-1 mr-3 h-5 w-5"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="3"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    );
  };

  if (!!href) {
    return (
      <a
        href={href}
        target={targetBlank ? "_blank" : undefined}
        className={`${CLASSES}`}
        onClick={onClick}
        rel="noopener noreferrer"
      >
        {children || `This is Link`}
      </a>
    );
  }

  return (
    <button
      disabled={disabled || loading}
      className={` ${CLASSES}`}
      onClick={onClick}
      type={type}
    >
      {loading && _renderLoading()}
      {children || `This is Button`}
    </button>
  );
};

export default Button;
