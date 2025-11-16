import { DocumentItem } from "@/lib/types/document.types";
import Image from "next/image";
import { FileIcon, FolderIcon, DotMenuFileIcon, DotMenuFolderIcon } from "@/lib/static/icons";
import { GetDatetimeString } from "@/utils/date";
import { formatFileSize } from "@/utils/filesize";
import { UserData } from "@/lib/types/user.types";

// child component to display rows from parsed data
export default function ListRowUser({id, name, email, updatedAt}: UserData) {
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
            <td className="px-6 py-4">{id ?? "-"}</td>
            <td className="px-6 py-4">{name ?? "-"}</td>
            <td className="px-6 py-4">{email ?? "-"}</td>
            {/* convert unixmilli to local date string */}
            <td className="px-6 py-4">{GetDatetimeString(Number(updatedAt))}</td>
        </tr>
    )
}