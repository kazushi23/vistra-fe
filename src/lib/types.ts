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

export interface ListProps {
  documentData: DocumentItem[];
  count: number;
  pageSize: number;
  setPageSize: Dispatch<SetStateAction<number>>;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
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
Table Components
*/
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