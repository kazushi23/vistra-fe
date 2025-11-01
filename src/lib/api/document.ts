import { documentMock } from "../mocks/document";
import { CreateFilesResponse, CreateFolderResponse, DocumentItem, DocumentTableSortColumn, FileMetaData, GetDocumentResponse } from "../types";

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

// export async function createFolderMock(folderName: string): Promise<CreateFolderResponse> {
//   // simulate async API call
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       // can do validation here
//       const res: CreateFolderResponse = {
//         data: true
//       }
//       resolve(res)
//     }, 500) // optional delay
//   });
// }

// export async function createFilesMock(files: File[]): Promise<CreateFilesResponse> {
//   // simulate async API call
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       // can do validation here
//       const res: CreateFilesResponse = {
//         data: true
//       }
//       resolve(res)
//     }, 500) // optional delay
//   });
// }

export async function createFolder(folderName: string): Promise<CreateFolderResponse> {
  const res = await fetch(`${BASE_URL}/api/v1/document/create/folder`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: folderName }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Failed to create folder");
  }

  const data: CreateFolderResponse = await res.json();
  return data;
}

export async function createFiles(files: FileMetaData[]): Promise<CreateFilesResponse> {
  const res = await fetch(`${BASE_URL}/api/v1/document/create/file`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ files: files }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Failed to create folder");
  }

  const data: CreateFilesResponse = await res.json();
  return data;
}




// export async function getDocuments(req: NextRequest): Promise<DocumentItem[]> {
//   return NextResponse.json(documentMock)
// }