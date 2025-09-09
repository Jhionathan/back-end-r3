import { HttpStatus } from '@nestjs/common';
import { ApiResponseOptions } from '@nestjs/swagger';
import { ResponseSearchOrdersDto } from '../dto/response/response-search-orders.dto';

export const SEARCH_ORDER: ApiResponseOptions = {
  status: HttpStatus.OK,
  description: 'Retorna lista de pedidos',
  type: ResponseSearchOrdersDto
};
