import Button from "../base/button";
import { useState } from "react";
import FilePreview from "./filepreview";
import { CreateFilesResponse, FileMetaData } from "@/lib/types/document.types";
import { createFiles, uploadFilesSimultaneously } from "@/lib/api/document";
import { MAX_FILE_SIZE_MB, ALLOWED_TYPES, ALLOWED_FILE_LENGTH } from "@/lib/static/filefolderoptions";
import { useToast } from "../base/toast";
import { FileProps } from "@/lib/types/home.types";
import { UploadIcon } from "@/lib/static/icons";

export default function UploadFiles({onFileCreated}: FileProps) {
    const [openUploadFiles, setOpenUploadFiles] = useState<boolean>(false);
    const [files, setFiles] = useState<File[]>([]);
    const [error, setError] = useState<string>("");
    const {showToast} = useToast();

    const handleFiles = (selectedFiles: FileList | File[]) => {
        if (selectedFiles.length > ALLOWED_FILE_LENGTH) {
            setError("Maximum of 10 files allowed.");
            return;
        }
        const fileArray = Array.from(selectedFiles);
        const metaDataArray: FileMetaData[] = []

        for (const file of fileArray) {
            if (!ALLOWED_TYPES.includes(file.type)) {
                setError(`File type not allowed: ${file.name}`);
                return;
            }
            if (file.size / 1024 / 1024 > MAX_FILE_SIZE_MB) {
                setError(`File too large (max ${MAX_FILE_SIZE_MB}MB): ${file.name}`);
                return;
            }
            metaDataArray.push({name: file.name, size: file.size})
        }

        // Append new files to existing ones
        setFiles((prev) => [...prev, ...fileArray]);
        setError("");
    };

    const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) handleFiles(e.target.files);
    };

    const handleUpload = async () => {
        if (files.length === 0) {
            showToast("Error", "Please select at least one file")
            setError("Please select at least one file");
            return;
        }
        try {
            const res: CreateFilesResponse = await createFiles(files)
            setFiles([]);
            setOpenUploadFiles(false);
            setError("");
            onFileCreated()
            showToast("Success", "Files created successfully")
        } catch(error: any) {
            showToast("Error", JSON.parse(error?.message).message || "Something went wrong, please try again.")
        }
    };

    const handleCancel = () => {
        setOpenUploadFiles(false);
        setFiles([]); // clear on cancel
        setError("");
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.dataTransfer.files) handleFiles(e.dataTransfer.files);
    };

  return (
    <div>
        <Button variant="secondary" label="Upload files" iconSrc={UploadIcon} iconAlt="Upload Icon" onClick={() => setOpenUploadFiles(true)}/>

        {openUploadFiles && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                <div className="bg-white rounded-lg w-96 p-6 shadow-lg">
                <h2 className="text-lg font-medium mb-4">Upload Files</h2>

                <div onDrop={handleDrop} onDragOver={(e) => e.preventDefault()} className="w-full h-40 border-2 border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center text-center text-gray-500 cursor-pointer mb-4 hover:border-blue-500 relative">
                    <p>Drag & drop files here or click to select</p>
                    <input type="file" multiple onChange={handleFileInputChange} className="absolute w-full h-full top-0 left-0 opacity-0 cursor-pointer"/>
                </div>

                <FilePreview files={files}/>

                {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

                <div className="flex justify-end space-x-2">
                    <button onClick={handleCancel} className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 cursor-pointer">Cancel</button>
                    <button onClick={handleUpload} className="px-4 py-2 rounded-md bg-(--color-primary) text-white hover:bg-blue-700 cursor-pointer">Upload</button>
                </div>
                </div>
            </div>
        )}
    </div>
  );
}
