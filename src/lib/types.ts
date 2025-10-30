export interface DocumentItem {
  id: string;
  name: string;
  createdBy: string;
  updatedAt: number; 
  sizeKB?: number;
  isFile: boolean;
}
