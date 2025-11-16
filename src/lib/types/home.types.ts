import { Dispatch, SetStateAction } from "react";

// home header component props
export interface HeadingProps {
  onFileFolderCreated?: () => void; // parse function to call on file or folder created
  search: string; // search input state
  setSearch: Dispatch<SetStateAction<string>>; // set search input state
}

// folder modal props
export interface FolderProps {
  onFolderCreated: () => void; // to trigger on create
}
// file upload modal props
export interface FileProps {
  onFileCreated: () => void; // to trigger on create
}