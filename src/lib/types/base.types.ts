export interface ButtonProps { // props for base button component
  variant?: "primary" | "secondary"; // styling
  label: string; // text
  iconSrc?: string; // icon display
  iconAlt?: string; // icon alt message
  onClick?: () => void; // button click function
}

// static toast type options
export type ToastType = "Success" | "Warning" | "Error"

// props for toast component
export interface ToastProps {
  id: number;
  toastType: ToastType; // "Success" | "Warning" | "Error"
  message: string; // to display in toast
}
// react context for toast notification
export interface ToastContextType {
  showToast: (type: ToastType, message: string) => void;
}