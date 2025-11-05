import { ListHeaderProps } from "@/lib/types/table.types"
import Image from "next/image"

// child component table header th
export default function ListHeader({getSortIcon, handleSort}: ListHeaderProps) {
    return (
        <tr>
            {/* checkbox selection */}
            <th className="p-4 w-4">
                <div className="flex items-center">
                    <input
                    type="checkbox"
                    className="cursor-pointer w-4 h-4 appearance-none bg-white border border-gray-300 rounded-sm checked:border-[#011b56] checked:after:content-[''] checked:after:block checked:after:w-2 checked:after:h-0.5 checked:after:bg-[#011b56] checked:after:m-auto checked:after:relative checked:after:top-[6px] focus:ring-2 focus:ring-blue-500"
                    />
                    <label className="sr-only">checkbox</label>
                </div>
            </th>
            {/* name and sorting */}
            <th className="px-6 py-3 font-normal flex space-x-2 cursor-pointer" onClick={() => handleSort("name")}>
                <p>Name</p>
                <Image
                    src={getSortIcon("name")}
                    alt="File Type Icon"
                    width={20}
                    height={20}
                    priority
                />
            </th>
            <th className="px-6 py-3 font-normal">Created by</th>
            {/* date updated and sorting */}
            <th className="px-6 py-3 font-normal flex space-x-2 cursor-pointer" onClick={() => handleSort("updatedAt")}>
                <p>Date</p>
                <Image
                src={getSortIcon("updatedAt")}
                alt="File Type Icon"
                width={20}
                height={20}
                priority
                />  
            </th>
            <th className="px-6 py-3 font-normal">File size</th>
            <th className="px-6 py-3 font-normal"></th>
        </tr>
    )
}