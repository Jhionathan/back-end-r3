export interface SearchOrdersWinthorDto {
  branchId: number;
  orderId: number;
  lastChange: string;
  order: string;
  orderStatus: number;
  page: number;
  pageSize: number;
  saleOrigin: string;
  daysOfSearch: number;
  viewDocument: boolean;
  hasOrderIdHube: boolean;
  hasOrderIdMktplace: boolean;
}
