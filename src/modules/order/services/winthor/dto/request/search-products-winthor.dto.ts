export interface SearchProductsWinthorDto {
  order: number;
  branchId: number;
  lastChange: string; //1900-01-01T00:00:00   - Informar data da última alteração
  page: number;
  pageSize: number;
  callOrigin: string;
}
