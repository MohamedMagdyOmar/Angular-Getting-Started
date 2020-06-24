import { IProduct } from './products';

export interface IProductCategories {
  name: string;
  type: string;
  displayName: string;
  products: Array<IProduct>;
}
