import { DocumentItem } from "@/lib/types"
import Image from "next/image";
import PageSizeSelection from "./pagesizeselection";
import PageSelection from "./pageselection";
import { Dispatch, SetStateAction } from "react";

interface ListProps {
  documentData: DocumentItem[];
  count: number;
  pageSize: number;
  setPageSize: Dispatch<SetStateAction<number>>;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
}
function getDatetimeString(unixmilli: number): string {
    return unixmilli ? new Date(unixmilli).toLocaleString("en-SG", {
        timeZone: "Asia/Singapore",
        year: "numeric",
        month: "short",
        day: "2-digit",
      })
    : "-"
}
export default function List(
    {documentData, count, pageSize, setPageSize, page, setPage}: ListProps
) {
    return (
        <section>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-8">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                    <thead className="text-xs text-white bg-[#011b56]">
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
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap flex space-x-3">
                                        <Image
                                            src={doc.isFile ? "/file-icon.svg" : "/folder-icon.svg" }
                                            alt="File Type Icon"
                                            width={20}
                                            height={20}
                                            priority
                                        />
                                        <p>{doc.name ?? "-"}</p>
                                    </th>
                                    <td className="px-6 py-4">
                                        {doc.createdBy ?? "-"}
                                    </td>
                                    <td className="px-6 py-4">
                                        {getDatetimeString(doc.updatedAt)}
                                    </td>
                                    <td className="px-6 py-4">
                                        {doc.sizeKB ?? "-"}
                                    </td>
                                    <td className="px-6 py-4">
                                        <Image
                                            src={doc.isFile ? "/dot-menu-file-icon.svg" : "/dot-menu-folder-icon.svg" }
                                            alt="Menu Icon"
                                            width={12}
                                            height={12}
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
            <div className="flex justify-between">
                <PageSizeSelection pageSize={pageSize} setPageSize={setPageSize}/>
                <PageSelection page={page} count={count} pageSize={pageSize} setPage={setPage}/>
            </div>
        </section>
    )
}