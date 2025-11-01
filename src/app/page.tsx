'use client';

import { getDocuments } from "@/lib/api/document";
import Heading from "../components/home/heading"
import List from "../components/table/list";
import {useEffect, useState} from "react"
import { DocumentItem, GetDocumentResponse } from "@/lib/types";
import { pageSizes } from "@/lib/static/pagesizesoptions";
import { DocumentTableSort } from "@/lib/types";
import { useToast } from "@/components/base/toast";

export default function Home() {
  const [documents, setDocuments] = useState<DocumentItem[]>([])
  const [documentCount, setDocumentsCount] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(true)
  const [pageSize, setPageSize] = useState<number>(pageSizes[0])
  const [page, setPage] = useState<number>(1)
  const [search, setSearch] = useState<string>("")
  const [sort, setSort] = useState<DocumentTableSort>({
    desc: true,
    column: "updatedAt",
  })
  const {showToast} = useToast();

  async function fetchDocuments() {
    try {
      const res: GetDocumentResponse = await getDocuments(pageSize, page, search, sort.desc, sort.column)
      setDocuments(res.data)
      setDocumentsCount(res.count)
    } catch(error) {
      showToast("Error", "Something went wrong, please try again.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDocuments()
  }, [page, pageSize, sort])

  useEffect(() => {
    const handler = setTimeout(() => {
      if (search.trim() !== "") {
        setPage(1); // reset page when searching
      }
      fetchDocuments();
    }, 500); // delay 500ms after user stops typing

    return () => clearTimeout(handler);
  }, [search]);
  
  return (
    <div className="min-h-screen p-8">
      <main>
        <Heading onFileFolderCreated={fetchDocuments} search={search} setSearch={setSearch}/>
        {!loading && <List documentData={documents} count={documentCount} pageSize={pageSize} setPageSize={setPageSize} page={page} setPage={setPage} sort={sort} setSort={setSort}/>}
        </main>
    </div>
  );
}
