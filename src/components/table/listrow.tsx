import { DocumentItem } from "@/lib/types/document.types";
import Image from "next/image";
import { FileIcon, FolderIcon, DotMenuFileIcon, DotMenuFolderIcon } from "@/lib/static/icons";
import { GetDatetimeString } from "@/utils/date";
import { formatFileSize } from "@/utils/filesize";

export default function ListRow({id, name, createdBy, updatedAt, size, type}: DocumentItem) {
    
    return (
        <tr key={id}
            className="bg-white border-b border-gray-200 hover:bg-gray-50 cursor-pointer"
        >
            <td className="w-4 p-4">
            <div className="flex items-center">
                <input
                type="checkbox"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 focus:ring-2"
                />
            </div>
            </td>
            <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap flex space-x-3">
            <Image
                src={type === "file" ? FileIcon: FolderIcon}
                alt="File Type Icon"
                width={20}
                height={20}
                priority
            />
            <p>{name ?? "-"}</p>
            </th>
            <td className="px-6 py-4">{createdBy ?? "-"}</td>
            <td className="px-6 py-4">{GetDatetimeString(Number(updatedAt))}</td>
            <td className="px-6 py-4">{formatFileSize(size)}</td>
            <td className="px-6 py-4 cursor-pointer">
            <Image
                src={type === "file" ? DotMenuFileIcon : DotMenuFolderIcon}
                alt="Menu Icon"
                width={12}
                height={12}
                priority
            />
            </td>
        </tr>
    )
}