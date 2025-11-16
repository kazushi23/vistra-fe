import { ListHeaderProps } from "@/lib/types/table.types"
import Image from "next/image"

// child component table header th
export default function ListHeader({columns, getSortIcon, handleSort}: ListHeaderProps) {
    return (
        <tr>
        {columns.map((col) => {
            // checkbox column
            if (col.isCheckbox) {
            return (
                <th key={col.key} className={`p-4 ${col.width ?? "w-4"}`}>
                <div className="flex items-center">
                    <input
                    type="checkbox"
                    className="cursor-pointer w-4 h-4 appearance-none bg-white border border-gray-300 rounded-sm checked:border-[#011b56] checked:after:content-[''] checked:after:block checked:after:w-2 checked:after:h-0.5 checked:after:bg-[#011b56] checked:after:m-auto checked:after:relative checked:after:top-[6px] focus:ring-2 focus:ring-blue-500"
                    />
                    <label className="sr-only">checkbox</label>
                </div>
                </th>
            );
            }

            // normal column
            return (
            <th
                key={col.key}
                className={`px-6 py-3 font-normal ${col.align === "right" ? "text-right" : col.align === "center" ? "text-center" : ""}`}
                onClick={col.sortable ? () => handleSort(col.key) : undefined}
            >
                <div className={`flex items-center space-x-2 ${col.sortable ? "cursor-pointer" : ""}`}>
                <span>{col.label}</span>
                {col.sortable && (
                    <Image
                    src={getSortIcon(col.key)}
                    alt={`${col.label} Sort Icon`}
                    width={18}
                    height={18}
                    priority
                    />
                )}
                </div>
            </th>
            );
        })}
        </tr>
    )
}