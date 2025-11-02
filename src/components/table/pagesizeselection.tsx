import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import PageSizeDropdown from "./pagesizedropdown";
import { PageSizeProps } from "@/lib/types/home.types";
import { DownIcon } from "@/lib/static/icons";


export default function PageSizeSelection({pageSize, setPageSize}: PageSizeProps) {
        const [openSelection, setOpenSelection] = useState<boolean>(false)
    
    return (
        <div className="relative flex items-center space-x-4">
            <p className="text-gray-500">Show</p>
            <div onClick={() => setOpenSelection(!openSelection)} className="bg-white w-14 px-2 py-1 rounded-lg border border-gray-200 flex items-center cursor-pointer">
                <input
                    id="page-size"
                    type="number"
                    disabled
                    value={pageSize}
                    className="flex-1 w-8 bg-transparent outline-none text-black placeholder-gray-400 text-sm"
                />
                <Image
                    src={DownIcon}
                    alt="Down Icon"
                    width={8}
                    height={8}
                    priority
                    className="text-(--color-primary)"
                />
            </div>
            {openSelection && (
            <PageSizeDropdown pageSize={pageSize} setPageSize={setPageSize} openSelection={openSelection} setOpenSelection={setOpenSelection}/>
            )}
            <p className="text-gray-500">rows per page</p>
        </div>
    )
}