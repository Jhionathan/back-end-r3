import { DeductionsCmvWinthorDto } from './deductions-cmv-winthor.dto';

export interface ListOfOrderItemWinthorDto {
  accountingCost: number;
  basePriceRCA: number;
  comissionPercent: number;
  discountPercentage: number;
  fecp: number;
  financialCost: number;
  gift: boolean;
  giftPrice: number;
  packingId: number;
  position: number;
  productId: number;
  productSKUERPReferenceKey: string;
  quantity: number;
  realCost: number;
  replacementCost: number;
  resourceValueCMV: number;
  resourceValueCustumerCMV: number;
  sellPrice: number;
  deductionsCmv: DeductionsCmvWinthorDto;
  sellPriceBaseST: number;
  sellPriceIPI: number;
  sellPriceST: number;
  sellPriceIcmsPart: number;
  stGNRE: number;
  tablePrice: number;
  tablePriceIPI: number;
  tablePriceST: number;
  taxFigureId: number;
  truncItem: boolean;
  wantageQuantity: number;
  warehouseBranchId: string;
  deliveryStatus: string;
}
