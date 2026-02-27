export interface Material {
  id: number;
  name: string;
  categoryId: number;
  unitId: number;
  rate?: number;
 minimumStockLevel?: number;

  category?: {
    id: number;
    name: string;
  };

  unit?: {
    id: number;
    name: string;
  };
}



