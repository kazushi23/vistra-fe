import { documentMock } from "../mocks/document";
import { CreateFilesResponse, CreateFolderResponse, FileDataProps } from "../types/document.types";
import { DocumentTableSortColumn } from "../types/table.types";
import { FileMetaData, GetDocumentResponse } from "../types/document.types";
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
  const res = await fetch(`${BASE_URL}/api/v1/folder/create`, {
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

export async function createFolderSimultaneously(folderName: string) {
  const promises = [1, 2, 3].map(() => createFolder(folderName));
  try {
    const results = await Promise.all(promises);
    console.log("All folders created:", results);
    return results;
  } catch (err) {
    console.error("Error creating folders:", err);
    throw err;
  }
}

export async function createFiles(files: File[]): Promise<CreateFilesResponse> {
  const formData = new FormData();
  files.forEach((file: File) => formData.append("files", file));

  const res = await fetch(`${BASE_URL}/api/v1/file/create`, {
    method: "POST",
    body: formData, // no JSON.stringify, FormData handles content type automatically
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Failed to upload files");
  }

  const data: CreateFilesResponse = await res.json();
  return data;
}

export async function uploadFilesSimultaneously(files: File[]) {
  const promises = [1, 2, 3, 4, 5, 6, 7, 8].map(() => createFiles(files));
  try {
    const results = await Promise.all(promises);
    console.log("All uploads completed:", results);
    return results;
  } catch (err) {
    console.error("Error uploading files:", err);
    throw err;
  }
}
