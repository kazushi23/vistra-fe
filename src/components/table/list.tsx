import { DocumentItem } from "@/lib/types";
import Image from "next/image";
import PageSizeSelection from "../table/pagesizeselection";
import PageSelection from "../table/pageselection";
import { GetDatetimeString } from "@/utils/utils";
import { ListProps } from "@/lib/types";

export default function List({
  documentData,
  count,
  pageSize,
  setPageSize,
  page,
  setPage,
}: ListProps) {
  return (
    <section>
      {/* Scrollable Table Container */}
      <div className="relative shadow-md sm:rounded-lg my-8 overflow-x-auto">
        <div className="max-h-[600px] overflow-y-auto">
          <table className="w-full min-w-[700px] text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-white bg-[#011b56] sticky top-0 z-10">
              <tr>
                <th className="p-4 w-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 focus:ring-2"
                    />
                    <label className="sr-only">checkbox</label>
                  </div>
                </th>
                <th className="px-6 py-3 font-normal">Name</th>
                <th className="px-6 py-3 font-normal">Created by</th>
                <th className="px-6 py-3 font-normal">Date</th>
                <th className="px-6 py-3 font-normal">File size</th>
                <th className="px-6 py-3 font-normal"></th>
              </tr>
            </thead>

            <tbody>
              {documentData.map((doc) => (
                <tr
                  key={doc.id}
                  className="bg-white border-b border-gray-200 hover:bg-gray-50"
                >
                  <td className="w-4 p-4">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 focus:ring-2"
                      />
                    </div>
                  </td>
                  <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap flex space-x-3">
                    <Image
                      src={doc.isFile ? "/file-icon.svg" : "/folder-icon.svg"}
                      alt="File Type Icon"
                      width={20}
                      height={20}
                      priority
                    />
                    <p>{doc.name ?? "-"}</p>
                  </th>
                  <td className="px-6 py-4">{doc.createdBy ?? "-"}</td>
                  <td className="px-6 py-4">{GetDatetimeString(doc.updatedAt)}</td>
                  <td className="px-6 py-4">{doc.sizeKB ? `${doc.sizeKB} KB` : "-"}</td>
                  <td className="px-6 py-4 cursor-pointer">
                    <Image
                      src={doc.isFile ? "/dot-menu-file-icon.svg" : "/dot-menu-folder-icon.svg"}
                      alt="Menu Icon"
                      width={12}
                      height={12}
                      priority
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination and PageSize */}
      <div className="flex justify-between mt-2">
        <PageSizeSelection pageSize={pageSize} setPageSize={setPageSize} />
        <PageSelection page={page} count={count} pageSize={pageSize} setPage={setPage} />
      </div>
    </section>
  );
}
