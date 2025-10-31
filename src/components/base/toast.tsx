'use client'
import { ToastProps, ToastContextType, ToastType } from "@/lib/types"
import { useState, createContext, useContext, ReactNode } from "react"

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export default function ToastProvider({ children }: { children: ReactNode }) {
    const [toasts, setToasts] = useState<ToastProps[]>([]);
    
    const showToast = (toastType: ToastType, message: string) => {
        const id = Date.now();
        setToasts((prev) => [...prev, { id, toastType, message }]);
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

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within a ToastProvider");
  return context;
};