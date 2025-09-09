import { ListOfOrderItemWinthorDto } from '../response/list-of-order-item-winthor.dto';

export interface CreateOrderWinthorDto {
  createData: string;
  branchId: string;
  TotalPrice: number;
  paymentPlanId: string;
  seller: number;
  saleType: number;
  customer: Customer;
  listOfOrderItem: Partial<ListOfOrderItemWinthorDto[]>;
}

export interface Customer {
  id: number;
}
