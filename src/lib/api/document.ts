import { NextRequest, NextResponse } from "next/server";
import { documentMock } from "../mocks/document";
import { DocumentItem } from "../types";

export async function getDocumentsMock(pageSize: number, page: number): Promise<DocumentItem[]> {
  // simulate async API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const startIndex: number = pageSize * (page - 1)
      const endIndex: number = pageSize * (page)
      resolve(documentMock.slice(startIndex,endIndex))
    }, 500) // optional delay
  });
}


// export async function getDocuments(req: NextRequest): Promise<DocumentItem[]> {
//   return NextResponse.json(documentMock)
// }