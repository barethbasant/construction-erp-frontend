
import instance from "../../../lib/axios"
import type { Category, CategoryFormValues } from "../../../types/category"

const BASE_URL = "/master/categories"

export const getCategories = async (): Promise<{ data: Category[] }> => {
    const res = await instance.get(BASE_URL)
    return res.data
}


export const createCategory = async (data: CategoryFormValues): Promise<Category> => {
    const res = await instance.post(BASE_URL, data)
    return res.data
}

export const updateCategory = async (
    id: number,
    data: CategoryFormValues
): Promise<Category> => {
    const res = await instance.post(`${BASE_URL}/${id}`, data);
    return res.data;
};

export const deleteCategory = async (id: number): Promise<void> => {
    await instance.delete(`${BASE_URL}/${id}`);
};