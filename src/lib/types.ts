import { Dispatch, SetStateAction } from "react";
/*
File and Folder related types
*/
export interface DocumentItem {
  id: number;
  name: string;
  createdBy: string;
  updatedAt: number; 
  size?: number;
  type: "file" | "folder";
}

export interface GetDocumentResponse {
  data: DocumentItem[];
  count: number;
}

export interface CreateFolderResponse {
  type: "Success" | "Error";
  message: string;
  data: DocumentItem;
}

export interface CreateFilesResponse {
  type: "Success" | "Error";
  message: string;
  data: DocumentItem[];
}
export interface FilePreviewProps {
    files: File[];
}

export interface FileMetaData {
    name: string;
    size: number;
}


/*
Base components
*/

export interface ButtonProps {
  variant?: "primary" | "secondary";
  label: string;
  iconSrc?: string;
  iconAlt?: string;
  onClick?: () => void;
}
/*
Toast
*/
export type ToastType = "Success" | "Warning" | "Error"

export interface ToastProps {
  id: number;
  toastType: ToastType;
  message: string;
}

export interface ToastContextType {
  showToast: (type: ToastType, message: string) => void;
}

/*
Table Components
*/
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

export interface EmptyColumnsCount {
  colspan: number;
}
/*
Home Components
*/

export interface HeadingProps {
  onFileFolderCreated: () => void;
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
}

export interface FolderProps {
  onFolderCreated: () => void;
}

export interface FileProps {
  onFileCreated: () => void;
}