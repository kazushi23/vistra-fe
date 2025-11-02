export interface ButtonProps {
  variant?: "primary" | "secondary";
  label: string;
  iconSrc?: string;
  iconAlt?: string;
  onClick?: () => void;
}

export type ToastType = "Success" | "Warning" | "Error"

export interface ToastProps {
  id: number;
  toastType: ToastType;
  message: string;
}

export interface ToastContextType {
  showToast: (type: ToastType, message: string) => void;
}