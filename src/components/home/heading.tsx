import SearchBox from "../home/searchbox";
import Button from "../base/button";
import AddNewFolder from "./addnewfolder";
import UploadFiles from "./uploadfilemodal";
import { HeadingProps } from "@/lib/types";

export default function Heading({onFileFolderCreated, search, setSearch}: HeadingProps) {
  return (
    <section>
        <div className="flex items-center justify-between">
            <h1 className="text-2xl font-medium text-gray-600">Documents</h1>
            <div className="flex space-x-3">
              <UploadFiles onFileCreated={onFileFolderCreated}/>
              <AddNewFolder onFolderCreated={onFileFolderCreated}/>
            </div>
        </div>
        <div className="py-8">
            <SearchBox search={search} setSearch={setSearch}/>
        </div>
    </section>
  );
}
