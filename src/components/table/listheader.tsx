import { ListHeaderProps } from "@/lib/types/table.types"
import Image from "next/image"

export default function ListHeader({getSortIcon, handleSort}: ListHeaderProps) {
    return (
        <tr>
            <th className="p-4 w-4">
                <div className="flex items-center">
                <input
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 focus:ring-2"
                />
                <label className="sr-only">checkbox</label>
                </div>
            </th>
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