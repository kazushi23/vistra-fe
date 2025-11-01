import { documentMock } from "../mocks/document";
import { CreateFilesResponse, CreateFolderResponse, DocumentItem, DocumentTableSortColumn, FileMetaData, GetDocumentResponse } from "../types";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function getDocuments(pageSize: number, page: number, search: string, desc: boolean, column: DocumentTableSortColumn): Promise<GetDocumentResponse> {
  const res = await fetch(`${BASE_URL}/api/v1/document?` + new URLSearchParams({
    page: page.toString(),
    pagesize: pageSize.toString(),
    descending: desc.toString(),
    sortColumn: column.toString(),
    search: search,
  }), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Failed to retrieve data");
  }

  const data: GetDocumentResponse = await res.json();
  return data;
}

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
    throw new Error(text || "Failed to create file");
  }

  const data: CreateFilesResponse = await res.json();
  return data;
}