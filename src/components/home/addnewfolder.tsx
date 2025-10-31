import { CreateFolderResponse } from "@/lib/types"
import Button from "../base/button"
import { useState } from "react"
import { createFolderMock } from "@/lib/api/document"
import { useToast } from "../base/toast"

export default function AddNewFolder() {
    const [openAddNewFolder, setOpenAddNewFolder] = useState<boolean>(false)
    const [folderName, setFolderName] = useState<string>("")
    const {showToast} = useToast();

    function openModal() {
        setOpenAddNewFolder(true)
    }
    async function handleCreate() {
        try {
            const res: CreateFolderResponse = await createFolderMock(folderName)
            showToast("Success", "Folder created successfully")
        } catch(error: any) {
            showToast("Error", "Something went wrong, please try again")
        } finally {
            setFolderName("")
            setOpenAddNewFolder(false)
        }
    }

    return (
        <div>
            <Button variant="primary" label="Add new folder" iconSrc="/add-icon.svg" iconAlt="Add Icon" onClick={openModal}/>
            {openAddNewFolder && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                <div className="bg-white rounded-lg w-96 p-6 shadow-lg">
                    <h2 className="text-lg font-medium mb-4">Create New Folder</h2>
                    <input type="text" placeholder="Folder name" value={folderName} onChange={(e) => setFolderName(e.target.value)} className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                    <div className="flex justify-end space-x-2">
                    <button onClick={() => setOpenAddNewFolder(false)} className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 cursor-pointer">Cancel</button>
                    <button onClick={handleCreate} className="px-4 py-2 rounded-md bg-(--color-primary) text-white hover:bg-blue-700 cursor-pointer">Create</button>
                    </div>
                </div>
                </div>
            )}
        </div>
    )
}