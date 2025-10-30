'use client';

import { getDocumentsMock } from "@/lib/api/document";
import Heading from "../components/heading"
import List from "../components/list";
import {useEffect, useState} from "react"
import { DocumentItem } from "@/lib/types";
import { pageSizes } from "@/lib/static/pagesizes";

export default function Home() {
  const [documents, setDocuments] = useState<DocumentItem[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [pageSize, setPageSize] = useState<number>(pageSizes[0])
  const [page, setPage] = useState<number>(1)

  useEffect(() => {
    setLoading(true)
    async function fetchDocuments() {
      try {
        const documents: DocumentItem[] = await getDocumentsMock(pageSize, page)
        setDocuments(documents)
      } catch(error) {
        alert("Something went wrong")
      } finally {
        setLoading(false)
      }
    }
    fetchDocuments()
  }, [])
  return (
    <div className="min-h-screen p-8">
      <main>
        <Heading/>
        <List documentData={documents}/>
      </main>
    </div>
  );
}
