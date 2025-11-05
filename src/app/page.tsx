'use client';

import { getDocuments } from "@/lib/api/document";
import Heading from "../components/home/heading"
import List from "../components/table/list";
import {useEffect, useState} from "react"
import { DocumentItem, GetDocumentResponse } from "@/lib/types/document.types";
import { pageSizes } from "@/lib/static/pagesizesoptions";
import { DocumentTableSort } from "@/lib/types/table.types";
import { useToast } from "@/components/base/toast";
import LoadingOverlay from "@/components/base/loadingOverlay";

// Home page
export default function Home() {
  const [documents, setDocuments] = useState<DocumentItem[]>([]) // for display of documents in table
  const [documentCount, setDocumentsCount] = useState<number>(0) // for pagination selection
  const [loading, setLoading] = useState<boolean>(true) // note if data is loading for table
  const [pageSize, setPageSize] = useState<number>(pageSizes[0]) // for selection of rows per page
  const [page, setPage] = useState<number>(1) // note the current page
  const [search, setSearch] = useState<string>("") // note the search string for table
  const [sort, setSort] = useState<DocumentTableSort>({
    desc: true, // sort order
    column: "updatedAt", // sort column
  })
  const {showToast} = useToast(); // toast init

  // retrieve all documents
  async function fetchDocuments() {
    try {
      const res: GetDocumentResponse = await getDocuments(pageSize, page, search, sort.desc, sort.column)
      setDocuments(res.data) // set data to state
      setDocumentsCount(res.count) // set all records count to state
    } catch(error: any) {
      // display error message from server, else default message
      showToast("Error", error.message || "Something went wrong, please try again.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDocuments() // get table data when page | pagesize | sort changes
  }, [page, pageSize, sort])

  // delay and search table search
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
        {/* top page header */}
        <Heading onFileFolderCreated={fetchDocuments} search={search} setSearch={setSearch}/>
        {/* table with search and pagination */}
        {!loading && <List documentData={documents} count={documentCount} pageSize={pageSize} setPageSize={setPageSize} page={page} setPage={setPage} sort={sort} setSort={setSort}/>}
        {loading && <LoadingOverlay />}
        </main>
    </div>
  );
}
