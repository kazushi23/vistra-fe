import { Dispatch, SetStateAction } from "react";

export interface HeadingProps {
  onFileFolderCreated: () => void;
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
}

export interface FolderProps {
  onFolderCreated: () => void;
}

export interface FileProps {
  onFileCreated: () => void;
}