'use client';

import { DocumentTableSortColumn } from "@/lib/types/table.types";
import PageSizeSelection from "../table/pagesizeselection";
import PageSelection from "../table/pageselection";
import { ListProps } from "@/lib/types/table.types";
import { AscSelIcon, DescIcon, DescSelIcon } from "@/lib/static/icons";
import ListRow from "./listrow";
import EmptyTable from "../base/emptyTable";
import ListHeader from "./listheader";

// table component holder with child search, th, pagination
export default function List({documentData,count,pageSize,setPageSize,page,setPage,sort,setSort}: ListProps) {
  // check and display asc or desc sort icon
  function getSortIcon(column: DocumentTableSortColumn): string {
    if (column === sort.column) { // active column sort icon
      return sort.desc 
        ? DescSelIcon
        : AscSelIcon;
    } else {
      // Inactive column - default
      return DescIcon;
    }
  }
  // function to handle icon click to change sort order and column
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
      <div className="relative shadow-md sm:rounded-lg my-8 overflow-x-auto bg-white">
        <div className="h-[60vh] overflow-y-auto">
          <table className="w-full min-w-[700px] text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-white bg-[#011b56] sticky top-0 z-10">
              {/* child component for th and sort icons */}
              <ListHeader getSortIcon={getSortIcon} handleSort={handleSort}/>
            </thead>
            <tbody>
              {/* child component to display all rows by parsing data */}
              {documentData && documentData.length > 0 ? documentData.map((doc) => (
                <ListRow key={doc.id} id={doc.id} name={doc.name} createdBy={doc.createdBy} updatedAt={doc.updatedAt} size={doc.size} type={doc.type} />
              )): 
                // if no data, show
                <EmptyTable colspan={6}/>
              }
            </tbody>
          </table>
        </div>
      </div>
      {/* footer of table for page and page size selection */}
    <div className="flex flex-col items-center sm:flex-row sm:justify-between w-full mt-2 gap-2">
      <PageSizeSelection pageSize={pageSize} setPageSize={setPageSize} />
      <PageSelection page={page} count={count} pageSize={pageSize} setPage={setPage} />
    </div>
    </section>
  );
}
