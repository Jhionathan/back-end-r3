import { OrderWinthorDto } from './order-winthor.dto';

export interface OrdersWinthorDto {
  first: boolean;
  items: OrderWinthorDto[];
  hasNext: boolean;
}
