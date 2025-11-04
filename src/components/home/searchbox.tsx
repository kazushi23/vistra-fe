import Image from "next/image";
import { SearchProps } from "@/lib/types/table.types";
import { SearchIcon } from "@/lib/static/icons";

// home page table seearch box input
export default function SearchBox({search, setSearch}: SearchProps) {
  // setSearch state on user input
  return (
    <div className="bg-white w-64 px-4 py-2 rounded-lg border border-gray-200 flex items-center gap-2">
      <input id="table-search" type="search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search" className="flex-1 bg-transparent outline-none text-gray-800 placeholder-gray-400"/>
      {/* search box icon */}
      <Image
        src={SearchIcon}
        alt="Search Icon"
        width={20}
        height={20}
        priority
        className="text-(--color-primary)"
      />
    </div>
  );
}
