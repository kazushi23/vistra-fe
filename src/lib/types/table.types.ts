import { Dispatch, SetStateAction } from "react";
import { DocumentItem } from "./document.types";
// table component props
export interface ListProps {
  documentData: DocumentItem[]; // document data for table
  count: number; // total records
  pageSize: number; // page size selection
  setPageSize: Dispatch<SetStateAction<number>>; // set page size selection
  page: number; // page selection
  setPage: Dispatch<SetStateAction<number>>; // set page selection
  sort: DocumentTableSort; // sort order and column
  setSort: Dispatch<SetStateAction<DocumentTableSort>> // set sort order and column
}

// page selection component props
export interface PageProps {
  page: number; // page selection
  count: number; // total records
  pageSize: number; // page size selection
  setPage: Dispatch<SetStateAction<number>>; // set page size selection
}
// page size dropdown component props
export interface PageSizeDropdownProps {
  pageSize: number; // page size selection
  setPageSize: Dispatch<SetStateAction<number>>; // set page size selection
  openSelection: boolean; // show hide dropdown
  setOpenSelection: Dispatch<SetStateAction<boolean>>; // set show hide dropdown
}
// page size selection component props
export interface PageSizeProps {
  pageSize: number; // page size selection
  setPageSize: Dispatch<SetStateAction<number>>; // set page size selection
}

// search box component props
export interface SearchProps {
  search: string; // search input data
  setSearch: Dispatch<SetStateAction<string>>; // set search input data
}

export type DocumentTableSortColumn = "name" | "updatedAt"; // allowable sort column options

// state type for sorting
export interface DocumentTableSort {
  desc: boolean; // sort order
  column: DocumentTableSortColumn; // sort column
}

// empty table component props
export interface EmptyColumnsCountProps {
  colspan: number;
}
// table th props
export interface ListHeaderProps {
  getSortIcon: Function; // sort icon
  handleSort: Function; // handle sorting
}