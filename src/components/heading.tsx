import SearchBox from "./searchbox";
import Button from "./button";

export default function Heading() {
  return (
    <section>
        <div className="flex items-center justify-between">
            <h1 className="text-2xl font-medium text-gray-600">Documents</h1>
            <div className="flex space-x-3">
                <Button variant="secondary" label="Upload files" iconSrc="/upload-icon.svg" iconAlt="Upload Icon"/>
                <Button variant="primary" label="Add new folder" iconSrc="/add-icon.svg" iconAlt="Add Icon"/>
            </div>
        </div>
        <div className="py-8">
            <SearchBox/>
        </div>
    </section>
  );
}
