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