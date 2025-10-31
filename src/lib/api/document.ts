import { NextRequest, NextResponse } from "next/server";
import { documentMock } from "../mocks/document";
import { CreateFilesResponse, CreateFolderResponse, DocumentItem, GetDocumentResponse } from "../types";
import { documentCountMock } from "../mocks/documentcount";

export async function getDocumentsMock(pageSize: number, page: number, search: string): Promise<GetDocumentResponse> {
  // simulate async API call
  console.log(pageSize, page, search)
  return new Promise((resolve) => {
    setTimeout(() => {
      let filtered: DocumentItem[] = documentMock
      
      if (search.trim() !== "") {
        const regex = new RegExp(search, "i"); // ✅ define regex
        filtered =  filtered.filter((i) => regex.test(i.name));
      }

      const startIndex = pageSize * (page - 1);
      const endIndex = startIndex + pageSize;

      const res: GetDocumentResponse = {
        data: filtered.slice(startIndex,endIndex),
        count: documentCountMock
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
        data: true
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
        data: true
      }
      resolve(res)
    }, 500) // optional delay
  });
}


// export async function getDocuments(req: NextRequest): Promise<DocumentItem[]> {
//   return NextResponse.json(documentMock)
// }