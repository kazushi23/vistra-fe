import { DocumentItem } from "@/lib/types/document.types";
import Image from "next/image";
import { FileIcon, FolderIcon, DotMenuFileIcon, DotMenuFolderIcon } from "@/lib/static/icons";
import { GetDatetimeString } from "@/utils/date";
import { formatFileSize } from "@/utils/filesize";

// child component to display rows from parsed data
export default function ListRow({id, name, createdBy, updatedAt, size, type}: DocumentItem) {
    return (
        <tr key={id}
            className="bg-white border-b border-gray-200 hover:bg-gray-50 cursor-pointer"
        >
            {/* checkbox for selection */}
            <td className="w-4 p-4">
                <div className="flex items-center">
                    <input
                    type="checkbox"
                    className="cursor-pointer w-4 h-4 appearance-none bg-white border border-gray-300 rounded-sm checked:border-[#011b56] checked:after:content-[''] checked:after:block checked:after:w-2 checked:after:h-0.5 checked:after:bg-[#011b56] checked:after:m-auto checked:after:relative checked:after:top-[6px] focus:ring-2 focus:ring-blue-500"
                    />
                    <label className="sr-only">checkbox</label>
                </div>
            </td>
            {/* display file or folder icon based on type */}
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
            {/* convert unixmilli to local date string */}
            <td className="px-6 py-4">{GetDatetimeString(Number(updatedAt))}</td>
            {/* display file size as bytes, kb, mb based on file size */}
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