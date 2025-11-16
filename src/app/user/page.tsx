'use client'

import { UserData } from "@/lib/types/user.types"
import { useState, useEffect } from "react"
import { pageSizes } from "@/lib/static/pagesizesoptions";
import { TableSort } from "@/lib/types/table.types";
import { useToast } from "@/components/base/toast";
import { getUsers } from "@/lib/api/user";
import List from "@/components/table/list";
import { userHeader } from "@/lib/static/tablecolumns";

export default function User() {
    const [users, setUsers] = useState<UserData[]>([]);
    const [userCount, setUserCount] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    const [pageSize, setPageSize] = useState<number>(pageSizes[0]) // for selection of rows per page
    const [page, setPage] = useState<number>(1) // note the current page
    const [search, setSearch] = useState<string>("") // note the search string for table
    const [sort, setSort] = useState<TableSort>({
        desc: true, // sort order
        column: "updatedAt", // sort column
    })
    const {showToast} = useToast(); // toast init

      // retrieve all documents
      async function fetchUsers() {
        try {
          const res: UserData[] = await getUsers();
          setUsers(res) // set data to state
        } catch(error: any) {
          // display error message from server, else default message
          showToast("Error", error.message || "Something went wrong, please try again.")
        } finally {
          setLoading(false)
        }
      }
    
      useEffect(() => {
        fetchUsers() // get table data when page | pagesize | sort changes
    
      }, [page, pageSize, sort])
    
      // delay and search table search
      useEffect(() => {
        const handler = setTimeout(() => {
          if (search.trim() !== "") {
            setPage(1); // reset page when searching
          }
          fetchUsers();
        }, 500); // delay 500ms after user stops typing
    
        return () => clearTimeout(handler);
      }, [search]);

      return (
        <div className="min-h-screen p-8">
            <main>
                {!loading && <List userData={users} columns={userHeader} count={userCount} pageSize={pageSize} setPageSize={setPageSize} page={page} setPage={setPage} sort={sort} setSort={setSort}/>}
            </main>
        </div>
      )
}