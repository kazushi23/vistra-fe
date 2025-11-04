// data struct for each document item
export interface DocumentItem {
  id: number;
  name: string;
  createdBy: string;
  updatedAt: number; 
  size?: number;
  type: "file" | "folder";
}

// api call response struct for get document table display
export interface GetDocumentResponse {
  type: "Success" | "Error";
  message: string;
  data: DocumentItem[];
  count: number;
}

// api call response struct after creating folder
export interface CreateFolderResponse {
  type: "Success" | "Error";
  message: string;
  data: DocumentItem;
}
// api call response struct after creating files
export interface CreateFilesResponse {
  type: "Success" | "Error";
  message: string;
  data: DocumentItem[];
}
// file type for preview display
export interface FileDataProps {
    files: File[];
}
