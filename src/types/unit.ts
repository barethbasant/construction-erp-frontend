export interface Unit {
  id: number;
  name: string;        // KG
  createdAt?: string;
}

export interface CreateUnitDto {
  name: string;
}