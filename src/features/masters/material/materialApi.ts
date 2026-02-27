import api from "../../../lib/axios";
import type {  Material } from "../../../types/material";
import type { MaterialFormValues } from "./MaterialForm";


const BASE_URL = "/master/material";

export const getMaterials = async (): Promise<{data : Material[]}> => {
  const res = await api.get(BASE_URL);
  return res.data;
};

export const createMaterial = async (
  data: MaterialFormValues
): Promise<Material> => {
  const res = await api.post(BASE_URL, data);
  return res.data;
};

export const updateMaterial = async (
  id: number,
  data: MaterialFormValues
): Promise<Material> => {
  const res = await api.post(`${BASE_URL}/${id}`, data);
  return res.data;
};

export const deleteMaterial = async (id: number): Promise<void> => {
  await api.delete(`${BASE_URL}/${id}`);
};