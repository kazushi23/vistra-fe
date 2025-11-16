import SearchBox from "../home/searchbox";
import AddNewFolder from "./addnewfolder";
import UploadFiles from "./uploadfilemodal";
import { HeadingProps } from "@/lib/types/home.types";

// home page top header "Documents" and 2 buttons
export default function Heading({onFileFolderCreated, search, setSearch}: HeadingProps) {
  // send file/folder creation function and search state to child component
  return (
    <section>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h1 className="text-2xl font-medium text-gray-600">Documents</h1>
        {
          onFileFolderCreated !== undefined &&
          <div className="flex flex-col sm:flex-row sm:space-x-3 gap-2 sm:gap-0">
            <UploadFiles onFileCreated={onFileFolderCreated} />
            <AddNewFolder onFolderCreated={onFileFolderCreated} />
          </div>
        }

      </div>
      <div className="py-8">
        <SearchBox search={search} setSearch={setSearch} />
      </div>
    </section>
  );
}
