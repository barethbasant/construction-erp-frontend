import api from "../../../lib/axios";
import type { CreateVendorDto, Vendor } from "../../../types/vendor";


const BASE_URL = "/master/vendor";

export const getVendors = async (): Promise<{data : Vendor[]}> => {
  const res = await api.get(BASE_URL);
  return res.data;
};

export const createVendor = async (
  data: CreateVendorDto
): Promise<Vendor> => {
  const res = await api.post(BASE_URL, data);
  return res.data;
};

export const updateVendor = async (
  id: number,
  data: CreateVendorDto
): Promise<Vendor> => {
  const res = await api.post(`${BASE_URL}/${id}`, data);
  return res.data;
};

export const deleteVendor = async (id: number): Promise<void> => {
  await api.delete(`${BASE_URL}/${id}`);
};