import api from "../../../lib/axios";
import type { Site, CreateSiteDto } from "../../../types/site";


const BASE_URL = "/master/site";

export const getSites = async (): Promise<{data : Site[]}> => {
  const res = await api.get(BASE_URL);
  return res.data;
};

export const createSite = async (data: CreateSiteDto): Promise<Site> => {
  const res = await api.post(BASE_URL, data);
  return res.data;
};

export const updateSite = async (
  id: number,
  data: CreateSiteDto
): Promise<Site> => {
  const res = await api.put(`${BASE_URL}/${id}`, data);
  return res.data;
};

export const deleteSite = async (id: number): Promise<void> => {
  await api.delete(`${BASE_URL}/${id}`);
};