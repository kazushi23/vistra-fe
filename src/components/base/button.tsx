import Image from "next/image";
import { ButtonProps } from "@/lib/types/base.types";

// base component for styled buttons
export default function Button({variant = "primary", label, iconSrc, iconAlt, onClick}: ButtonProps) {
  const baseClasses = "text-sm font-semibold px-4 py-2 rounded-lg flex items-center space-x-2 transition-all duration-200";

  const variants = { // dynamic css styling
    primary: `bg-(--color-primary) text-white hover:bg-blue-700 cursor-pointer`,
    secondary: `border border-(--color-primary) text-(--color-primary) bg-white hover:bg-blue-100 cursor-pointer`,
  };

  return (
    <button onClick={onClick} className={`${baseClasses} ${variants[variant]}`}>
      {/* Dynamic onclick, styling, label and image */}
      {iconSrc && (
        <Image
          src={iconSrc}
          alt={iconAlt || "Button Icon"}
          width={20}
          height={20}
          priority
        />
      )}
      <span>{label}</span>
    </button>
  );
}
