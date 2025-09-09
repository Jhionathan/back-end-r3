import { ProductWinthorDto } from './product-winthor.dto';

export interface ProductsWinthorDto {
  first: boolean;
  items: ProductWinthorDto[];
  hasNext: boolean;
}
