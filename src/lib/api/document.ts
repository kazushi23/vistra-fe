import { NextRequest, NextResponse } from "next/server";
import { documentMock } from "../mocks/document";
import { DocumentItem, GetDocumentResponse } from "../types";
import { documentCountMock } from "../mocks/documentcount";

export async function getDocumentsMock(pageSize: number, page: number): Promise<GetDocumentResponse> {
  // simulate async API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const startIndex: number = pageSize * (page - 1)
      const endIndex: number = pageSize * (page)
      const res: GetDocumentResponse = {
        data: documentMock.slice(startIndex,endIndex),
        count: documentCountMock
      }
      resolve(res)
    }, 500) // optional delay
  });
}


// export async function getDocuments(req: NextRequest): Promise<DocumentItem[]> {
//   return NextResponse.json(documentMock)
// }