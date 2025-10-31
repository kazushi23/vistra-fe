import SearchBox from "../home/searchbox";
import Button from "../base/button";
import AddNewFolder from "./addnewfolder";
import UploadFiles from "./uploadfilemodal";

export default function Heading() {
  return (
    <section>
        <div className="flex items-center justify-between">
            <h1 className="text-2xl font-medium text-gray-600">Documents</h1>
            <div className="flex space-x-3">
              <UploadFiles/>
              <AddNewFolder/>
            </div>
        </div>
        <div className="py-8">
            <SearchBox/>
        </div>
    </section>
  );
}
