import { documentMock } from "../mocks/document";
import { CreateFilesResponse, CreateFolderResponse, DocumentItem, DocumentTableSortColumn, GetDocumentResponse } from "../types";

export async function getDocumentsMock(pageSize: number, page: number, search: string, desc: boolean, column: DocumentTableSortColumn): Promise<GetDocumentResponse> {
  // simulate async API call
  return new Promise((resolve) => {
    setTimeout(() => {
      let filtered: DocumentItem[] = documentMock

      if (search.trim() !== "") {
        const regex = new RegExp(search, "i"); // ✅ define regex
        filtered =  filtered.filter((i) => regex.test(i.name));
      }

      if (column === "Name") {
        filtered.sort((a, b) => {
          if (a.name! < b.name!) return desc ? 1 : -1;
          if (a.name! > b.name!) return desc ? -1 : 1;
          return 0;
        });
      } else if (column === "UpdatedAt") {
        filtered.sort((a, b) => (desc ? b.updatedAt - a.updatedAt : a.updatedAt - b.updatedAt));
      }

      const count: number = filtered.length
      console.log(count)
      const startIndex: number = pageSize * (page - 1);
      const endIndex: number = startIndex + pageSize;

      const res: GetDocumentResponse = {
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