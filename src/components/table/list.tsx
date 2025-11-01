import { DocumentItem, DocumentTableSortColumn } from "@/lib/types";
import Image from "next/image";
import PageSizeSelection from "../table/pagesizeselection";
import PageSelection from "../table/pageselection";
import { GetDatetimeString } from "@/utils/date";
import { ListProps } from "@/lib/types";
import { AscSelIcon, DescIcon, DescSelIcon, DotMenuFileIcon, DotMenuFolderIcon, FileIcon, FolderIcon } from "@/lib/static/icons";
import Row from "./row";

export default function List({documentData,count,pageSize,setPageSize,page,setPage,sort,setSort}: ListProps) {
  function getSortIcon(column: DocumentTableSortColumn): string {
    if (column === sort.column) {
      return sort.desc 
        ? DescSelIcon
        : AscSelIcon;
    } else {
      // Inactive column
      return DescIcon;
    }
  }

  function handleSort(column: DocumentTableSortColumn) {
    setSort((prev) => ({
      desc: prev.column === column ? !prev.desc : true,
      column,
    }));
  }
  /*
  @TODO yet to implement select row and select all rows
  */
  return (
    <section>
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
                <th className="px-6 py-3 font-normal flex space-x-2 cursor-pointer" onClick={() => handleSort("name")}>
                    <p>Name</p>
                    <Image
                      src={getSortIcon("name")}
                      alt="File Type Icon"
                      width={20}
                      height={20}
                      priority
                    />
                </th>
                <th className="px-6 py-3 font-normal">Created by</th>
                <th className="px-6 py-3 font-normal flex space-x-2 cursor-pointer" onClick={() => handleSort("updatedAt")}>
                  <p>Date</p>
                  <Image
                    src={getSortIcon("updatedAt")}
                    alt="File Type Icon"
                    width={20}
                    height={20}
                    priority
                  />  
                </th>
                <th className="px-6 py-3 font-normal">File size</th>
                <th className="px-6 py-3 font-normal"></th>
              </tr>
            </thead>

            <tbody>
              {documentData&& documentData.length > 0 ? documentData.map((doc) => (
                <Row id={doc.id} name={doc.name} createdBy={doc.createdBy} updatedAt={doc.updatedAt} size={doc.size} type={doc.type} />
              )): 
                <tr>
                  <td colSpan={6} className="text-center py-4">
                    No Data Available
                  </td>
                </tr>
              }
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
