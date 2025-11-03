import { documentMock } from "../mocks/document";
import { CreateFilesResponse, CreateFolderResponse, DocumentItem, GetDocumentResponse } from "../types/document.types";
import { DocumentTableSortColumn } from "../types/table.types";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function getDocumentsMock(pageSize: number, page: number, search: string, desc: boolean, column: DocumentTableSortColumn): Promise<GetDocumentResponse> {
  // simulate async API call
  return new Promise((resolve) => {
    setTimeout(() => {
      let filtered: DocumentItem[] = documentMock

      if (search.trim() !== "") {
        const regex = new RegExp(search, "i"); // ✅ define regex
        filtered =  filtered.filter((i) => regex.test(i.name));
      }

      if (column === "name") {
        filtered.sort((a, b) => {
          if (a.name! < b.name!) return desc ? 1 : -1;
          if (a.name! > b.name!) return desc ? -1 : 1;
          return 0;
        });
      } else if (column === "updatedAt") {
        filtered.sort((a, b) => (desc ? b.updatedAt - a.updatedAt : a.updatedAt - b.updatedAt));
      }

      const count: number = filtered.length
      const startIndex: number = pageSize * (page - 1);
      const endIndex: number = startIndex + pageSize;

      const res: GetDocumentResponse = {
        type: "Success",
        message: "Document created",
        data: filtered.slice(startIndex,endIndex),
        count: count
      }
      resolve(res)
    }, 500) // optional delay
  });
}

export async function createFolderMock(folderName: string): Promise<CreateFolderResponse> {
  // simulate async API call
  return new Promise((resolve) => {
    setTimeout(() => {
      // can do validation here
      const res: CreateFolderResponse = {
        type: "Success",
        message: "Folder has been created",
        data: {
          id: 0,
          name: "",
          createdBy: "",
          updatedAt: 0,
          type: "folder"
        }
      }
      resolve(res)
    }, 500) // optional delay
  });
}

export async function createFilesMock(files: File[]): Promise<CreateFilesResponse> {
  // simulate async API call
  return new Promise((resolve) => {
    setTimeout(() => {
      // can do validation here
      const res: CreateFilesResponse = {
        type: "Success",
        message: "File has been created",
        data: [{
          id: 0,
          name: "",
          createdBy: "",
          updatedAt: 0,
          type: "file"
        }]
      }
      resolve(res)
    }, 500) // optional delay
  });
}
