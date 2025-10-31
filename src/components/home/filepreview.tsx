import { FilePreviewProps } from "@/lib/types"
import Image from "next/image"

export default function FilePreview({files}: FilePreviewProps) {
    return (
        <div>
            {files.length > 0 && (
                <ul className="max-h-40 overflow-y-auto mb-4 border rounded-md p-2">
                {files.map((file, i) => (
                    <li key={i}className="flex items-center space-x-2 mb-2 border p-2 rounded-md">
                    {file.type.startsWith("image/") ? (
                        <Image
                        src={URL.createObjectURL(file)}
                        alt={file.name}
                        className="w-10 h-10 object-cover rounded"
                        />
                    ) : (
                        <div className="w-10 h-10 flex items-center justify-center bg-gray-200 rounded text-sm">
                        PDF
                        </div>
                    )}
                    <p className="text-sm text-gray-700">{file.name}</p>
                    </li>
                ))}
                </ul>
            )}
        </div>
    )
}