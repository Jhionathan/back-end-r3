import { CustomerWinthorDto } from './customer-winthor.dto';
import { ListOfOrderItemWinthorDto } from './list-of-order-item-winthor.dto';
import { PermissionsOrderWinthorDto } from './permissions-order-winthor.dto';

export interface OrderWinthorDto {
  branchId: string;
  carrierId: number;
  chargingId: string;
  createData: string;
  customer: CustomerWinthorDto;
  lastChange: string;
  listOfOrderItem: ListOfOrderItemWinthorDto[];
  permissions: PermissionsOrderWinthorDto;
  orderId: string;
  orderIdHube: string;
  orderIdMktplace: string;
  orderStatus: string;
  otherExpenses: number;
  paymentPlanId: number;
  saleOrigin: string;
  saleType: number;
  saleTypePayment: string;
  totalValue: string;
}
