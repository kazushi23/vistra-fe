import axios from "../axios";
import type { DocumentItem } from "../types";

export const getDocuments = async (): Promise<DocumentItem[]> => {
  const res = await axios.get("/documents");
  return res.data;
};

export const getDocumentById = async (id: string): Promise<DocumentItem> => {
  const res = await axios.get(`/documents/${id}`);
  return res.data;
};

export const createDocument = async (payload: Partial<DocumentItem>): Promise<DocumentItem> => {
  const res = await axios.post("/documents", payload);
  return res.data;
};

export const updateDocument = async (id: string, payload: Partial<DocumentItem>): Promise<DocumentItem> => {
  const res = await axios.put(`/documents/${id}`, payload);
  return res.data;
};

export const deleteDocument = async (id: string): Promise<void> => {
  await axios.delete(`/documents/${id}`);
};
