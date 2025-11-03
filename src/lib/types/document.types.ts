export interface DocumentItem {
  id: number;
  name: string;
  createdBy: string;
  updatedAt: number; 
  size?: number;
  type: "file" | "folder";
}

export interface GetDocumentResponse {
  type: "Success" | "Error";
  message: string;
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
export interface FileDataProps {
    files: File[];
}

export interface FileMetaData {
    name: string;
    size: number;
}
