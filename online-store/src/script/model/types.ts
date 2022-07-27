import { ProductType } from "../../data/products";

export interface CheckboxFiltersType {
    color: string[];
    year: string[];
    manufacturer: string[];
    memory: string[];
}
export interface SortType {
    fromSmaller: boolean;
    value: SortValueType;
}
export type SortValueType = keyof ProductType | "default";

export type FiltersType = {
    checkbox: CheckboxFiltersType;
    sort: SortType;
};
