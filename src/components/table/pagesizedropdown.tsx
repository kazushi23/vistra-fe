import { Dispatch, SetStateAction } from "react";
import { pageSizes } from "@/lib/static/pagesizesoptions";
import { useRef, useEffect, useState } from "react";
import { PageSizeDropdownProps } from "@/lib/types/table.types";

// child component for page size selection
export default function PageSizeDropdown({pageSize,setPageSize,openSelection,setOpenSelection,}: PageSizeDropdownProps) {
    const dropdownRef = useRef<HTMLDivElement | null>(null); // for displaying dropdown above or below input
    const [displayUp, setDisplayUp] = useState<boolean | null>(null) // to show above or below input

    // close selection on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setOpenSelection(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
    // to derive show above or below input
    useEffect(() => {
        if (!openSelection || !dropdownRef.current) return;
        const rect = dropdownRef.current.getBoundingClientRect();
        setDisplayUp(window.innerHeight < rect.bottom);
    }, [openSelection]);

    return (
        <div ref={dropdownRef} className={`absolute left-0 bg-white border border-gray-200 rounded-lg shadow-lg w-full max-h-20 overflow-y-auto z-50 ${displayUp === null ? "opacity-0" : "opacity-100"} ${displayUp === true ? "bottom-8" : "top-8"}`}>
            {pageSizes.map((size) => ( // display all the page size (static options)
            <div
                key={size}
                onClick={() => {
                    setPageSize(size); // set page size selection
                    setOpenSelection(false); // close selection
                }}
                className={`px-3 py-1 text-sm cursor-pointer hover:bg-gray-100 ${
                size === pageSize
                    ? "bg-gray-100 font-medium text-blue-600"
                    : "text-gray-700"
                }`}
            >
                {size}
            </div>
            ))}
        </div>
    );
}
