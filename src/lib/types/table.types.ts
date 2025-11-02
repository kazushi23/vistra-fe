import { Dispatch, SetStateAction } from "react";
import { DocumentItem } from "./document.types";
export interface ListProps {
  documentData: DocumentItem[];
  count: number;
  pageSize: number;
  setPageSize: Dispatch<SetStateAction<number>>;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  sort: DocumentTableSort;
  setSort: Dispatch<SetStateAction<DocumentTableSort>>
}

export interface PageProps {
  page: number;
  count: number;
  pageSize: number;
  setPage: Dispatch<SetStateAction<number>>;
}

export interface PageSizeDropdownProps {
  pageSize: number;
  setPageSize: Dispatch<SetStateAction<number>>;
  openSelection: boolean;
  setOpenSelection: Dispatch<SetStateAction<boolean>>;
}

export interface PageSizeProps {
  pageSize: number;
  setPageSize: Dispatch<SetStateAction<number>>;
}

export interface SearchProps {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
}

export type DocumentTableSortColumn = "name" | "updatedAt";

export interface DocumentTableSort {
  desc: boolean;
  column: DocumentTableSortColumn;
}

export interface EmptyColumnsCountProps {
  colspan: number;
}

export interface ListHeaderProps {
  getSortIcon: Function;
  handleSort: Function;
}