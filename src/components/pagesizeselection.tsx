import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

interface PageSizeProps {
    pageSize: number;
    setPageSize: Dispatch<SetStateAction<number>>;
}

export default function PageSizeSelection({pageSize, setPageSize}: PageSizeProps) {
    return (
        <div className="flex items-center space-x-4">
            <p className="text-gray-500">Show</p>
            <div className="bg-white w-14 px-2 py-1 rounded-lg border border-gray-200 flex items-center cursor-pointer">
                <input
                    id="page-size"
                    type="number"
                    disabled
                    value={pageSize}
                    className="flex-1 w-8 bg-transparent outline-none text-black placeholder-gray-400 text-sm"
                />
                <Image
                    src="/down-icon.svg"
                    alt="Down Icon"
                    width={8}
                    height={8}
                    priority
                    className="text-(--color-primary)"
                />
            </div>
            <p className="text-gray-500">rows per page</p>
        </div>
    )
}