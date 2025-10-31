import { Dispatch, SetStateAction } from "react";
/*
File and Folder related types
*/
export interface DocumentItem {
  id: string;
  name: string;
  createdBy: string;
  updatedAt: number; 
  sizeKB?: number;
  isFile: boolean;
}

export interface GetDocumentResponse {
  data: DocumentItem[];
  count: number;
}

export interface CreateFolderResponse {
  data: boolean;
}

export interface CreateFilesResponse {
  data: boolean;
}
export interface FilePreviewProps {
    files: File[];
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

export type DocumentTableSortColumn = "Name" | "UpdatedAt";

export interface DocumentTableSort {
  desc: boolean;
  column: DocumentTableSortColumn;
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