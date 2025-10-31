'use client';

import { getDocumentsMock } from "@/lib/api/document";
import Heading from "../components/home/heading"
import List from "../components/table/list";
import {useEffect, useState} from "react"
import { DocumentItem, GetDocumentResponse } from "@/lib/types";
import { pageSizes } from "@/lib/static/pagesizesoptions";

export default function Home() {
  const [documents, setDocuments] = useState<DocumentItem[]>([])
  const [documentCount, setDocumentsCount] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(true)
  const [pageSize, setPageSize] = useState<number>(pageSizes[0])
  const [page, setPage] = useState<number>(1)

  useEffect(() => {
    async function fetchDocuments() {
      try {
        const res: GetDocumentResponse = await getDocumentsMock(pageSize, page)
        setDocuments(res.data)
        setDocumentsCount(res.count)
      } catch(error) {
        alert("Something went wrong, please try again.")
      } finally {
        setLoading(false)
      }
    }
    fetchDocuments()
  }, [page, pageSize])
  
  return (
    <div className="min-h-screen p-8">
      <main>
        <Heading/>
        {!loading && <List documentData={documents} count={documentCount} pageSize={pageSize} setPageSize={setPageSize} page={page} setPage={setPage}/>}
        </main>
    </div>
  );
}
