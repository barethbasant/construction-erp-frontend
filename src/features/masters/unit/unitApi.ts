import api from "../../../lib/axios";
import type { CreateUnitDto, Unit } from "../../../types/unit";


const BASE_URL = "/master/units";

export const getUnits = async (): Promise<{data : Unit[]}> => {
  const res = await api.get(BASE_URL);
  return res.data;
};

export const createUnit = async (
  data: CreateUnitDto
): Promise<Unit> => {
  const res = await api.post(BASE_URL, data);
  return res.data;
};

export const updateUnit = async (
  id: number,
  data: CreateUnitDto
): Promise<Unit> => {
  const res = await api.post(`${BASE_URL}/${id}`, data);
  return res.data;
};

export const deleteUnit = async (id: number): Promise<void> => {
  await api.delete(`${BASE_URL}/${id}`);
};