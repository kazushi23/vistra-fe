import Image from "next/image";

export default function SearchBox() {
  return (
    <div className="bg-white w-64 px-4 py-2 rounded-lg border border-gray-200 flex items-center gap-2">
      <input
        id="table-search"
        type="search"
        placeholder="Search"
        className="flex-1 bg-transparent outline-none text-gray-800 placeholder-gray-400"
      />
      <Image
        src="/search-icon.svg"
        alt="Search Icon"
        width={20}
        height={20}
        priority
        className="text-(--color-primary)"
      />
    </div>
  );
}
