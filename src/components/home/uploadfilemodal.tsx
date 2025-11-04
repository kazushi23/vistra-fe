import Button from "../base/button";
import { useState } from "react";
import FilePreview from "./filepreview";
import { CreateFilesResponse, FileMetaData } from "@/lib/types/document.types";
import { createFiles } from "@/lib/api/document";
import { MAX_FILE_SIZE_MB, ALLOWED_TYPES, ALLOWED_FILE_LENGTH } from "@/lib/static/filefolderoptions";
import { useToast } from "../base/toast";
import { FileProps } from "@/lib/types/home.types";
import { UploadIcon } from "@/lib/static/icons";

// upload file popup and input
export default function UploadFiles({onFileCreated}: FileProps) {
    const [openUploadFiles, setOpenUploadFiles] = useState<boolean>(false); // show | hide upload file modal
    const [files, setFiles] = useState<File[]>([]); // state to hold all uploaded files
    const [error, setError] = useState<string>(""); // state to show error message
    const {showToast} = useToast(); // init toast

    // file validation function
    const handleFiles = (selectedFiles: FileList | File[]) => {
        if (selectedFiles.length > ALLOWED_FILE_LENGTH) { // check for maximum allowable files length
            setError("Maximum of 10 files allowed.");
            return;
        }
        const fileArray = Array.from(selectedFiles); // set file array

        for (const file of fileArray) { // check for valid file types
            if (!ALLOWED_TYPES.includes(file.type)) {
                setError(`File type not allowed: ${file.name}`);
                return;
            }
            if (file.size / 1024 / 1024 > MAX_FILE_SIZE_MB) { // check for valid file size
                setError(`File too large (max ${MAX_FILE_SIZE_MB}MB): ${file.name}`);
                return;
            }
        }

        // Append new files to existing ones
        setFiles((prev) => [...prev, ...fileArray]);
        setError("");
    };

    // once files upload, pass to file validation function
    const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) handleFiles(e.target.files);
    };
    // on click of upload button, api call to send files to backend
    const handleUpload = async () => {
        if (files.length === 0) { // if no files
            showToast("Error", "Please select at least one file"); // display error
            setError("Please select at least one file"); // display error
            return;
        }
        try { // api call
            const res: CreateFilesResponse = await createFiles(files) // create file api call
            setFiles([]); // clear file array
            setOpenUploadFiles(false); // hide modal
            setError(""); // clear errors
            onFileCreated() // trigger parent component table data api call
            showToast("Success", "Files created successfully") //success message
        } catch(error: any) {
            // display server error message else default message
            showToast("Error", JSON.parse(error?.message).message || "Something went wrong, please try again.")
        }
    };
    // on click of cancel button
    const handleCancel = () => {
        setOpenUploadFiles(false); // hide modal
        setFiles([]); // clear on cancel
        setError(""); // clear errors
    };

    // prevent default action once file uploaded for drop
    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        // pass to file validation function on drop
        if (e.dataTransfer.files) handleFiles(e.dataTransfer.files);
    };

  return (
    <div>
        <Button variant="secondary" label="Upload files" iconSrc={UploadIcon} iconAlt="Upload Icon" onClick={() => setOpenUploadFiles(true)}/>

        {openUploadFiles && ( // when openUploadFiles, show modal
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                <div className="bg-white rounded-lg w-96 p-6 shadow-lg">
                <h2 className="text-lg font-medium mb-4">Upload Files</h2>
                {/* drag and drop or select files to upload */}
                <div onDrop={handleDrop} onDragOver={(e) => e.preventDefault()} className="w-full h-40 border-2 border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center text-center text-gray-500 cursor-pointer mb-4 hover:border-blue-500 relative">
                    <p>Drag & drop files here or click to select</p>
                    <input type="file" multiple onChange={handleFileInputChange} className="absolute w-full h-full top-0 left-0 opacity-0 cursor-pointer"/>
                </div>
                {/* child component to display uploaded files */}
                <FilePreview files={files}/>
                {/* if error, show */}
                {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
                {/* button to trigger cancel or upload */}
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
