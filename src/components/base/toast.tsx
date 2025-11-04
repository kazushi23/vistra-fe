'use client'
import { ToastProps, ToastContextType, ToastType } from "@/lib/types/base.types";
import { useState, createContext, useContext, ReactNode } from "react"

// create react context for toast notification
const ToastContext = createContext<ToastContextType | undefined>(undefined);

// Wraps the entire app and provides toast that can display success, warning, or error messages for 3 seconds.
export default function ToastProvider({ children }: { children: ReactNode }) { 
    const [toasts, setToasts] = useState<ToastProps[]>([]); // hold all active toast
    // display and remove after 3 seconds
    const showToast = (toastType: ToastType, message: string) => {
        let displayMessage = message;
        // Try to unpack JSON if message is a JSON string
        try {
            const parsed = typeof message === "string" ? JSON.parse(message) : null;
            if (parsed?.message) displayMessage = parsed.message;
        } catch {
            // fallback to original message if not JSON
        }

        const id: number = Date.now();
        setToasts((prev) => [...prev, { id, toastType, message: displayMessage }]);
        setTimeout(() => {
            setToasts((prev) => prev.filter((toast) => toast.id !== id));
        }, 3000);
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
        {children}

        {/* Toast container */}
        <div className="fixed bottom-15 right-10 z-50 space-y-2">
            {toasts.map((toast) => (
            <div
                key={toast.id}
                className={`px-4 py-3 rounded-lg shadow-md text-white transition-all duration-300
                ${toast.toastType === "Success" && "bg-green-500"}
                ${toast.toastType === "Warning" && "bg-yellow-500"}
                ${toast.toastType === "Error" && "bg-red-500"}
                `}
            >
                {toast.message}
            </div>
            ))}
        </div>
        </ToastContext.Provider>
    )
}
// custom hook to access toast context
export const useToast = (): ToastContextType => {
  const context: ToastContextType | undefined = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within a ToastProvider");
  return context;
};