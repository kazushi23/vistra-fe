import { DocumentItem } from "@/lib/types"
import Image from "next/image";

interface ListProps {
  documentData: DocumentItem[];
}

export default function List(
    {documentData}: ListProps
) {
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="p-4">
                            <div className="flex items-center">
                                <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
                            </div>
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Created by
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Date
                        </th>
                        <th scope="col" className="px-6 py-3">
                            File size
                        </th>
                        <th scope="col" className="px-6 py-3">
                            
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {documentData && documentData.map((doc) => {
                        return (
                            <tr key={doc.id} 
                            className="bg-white border-b border-gray-200 hover:bg-gray-50">
                                <td className="w-4 p-4">
                                    <div className="flex items-center">
                                        <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500  focus:ring-2"/>
                                        <label htmlFor="checkbox-table-search-1" className="sr-only">checkbox</label>
                                    </div>
                                </td>
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                    {doc.name ?? "-"}
                                </th>
                                <td className="px-6 py-4">
                                    {doc.createdBy ?? "-"}
                                </td>
                                <td className="px-6 py-4">
                                    {doc.updatedAt ?? "-"}
                                </td>
                                <td className="px-6 py-4">
                                    {doc.sizeKB ?? "-"}
                                </td>
                                <td className="px-6 py-4">
                                    <Image
                                        src="/dot-menu-icon.svg"
                                        alt="Menu Icon"
                                        width={20}
                                        height={20}
                                        priority
                                    />
                                </td>
                            </tr>
                        )
                    })
                    }
                </tbody>
            </table>
        </div>
    )
}