import { VerseType } from "../../utils/types";

export interface OrderType {
  _id: string;
  partner?: string;
  products: Product[] | ProductGroup[];
  name: string;
  phone: string;
  address: string;
  reviewed: boolean;
  completed: boolean;
  createdAt?: string;
}

export enum ERROR_MSG {
  NOT_AVAILABLE = 'No Order available',
  NOT_FOUND = "Order's not found",
  NOT_VALID = 'Data for Order is not valid',
}

export interface Print {
    _id?: string;
    poem?: string;
    verses?: VerseType[];
    qoute?: string;
}
  
export interface Product {
    print: Print;
    fontType: string;
    fontColor: string;
    backgroundColor: string;
}
export interface ProductGroup {
    prints: Print[];
    fontType: string;
    fontColor: string;
    backgroundColor: string;
}