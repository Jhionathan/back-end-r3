import { HttpStatus } from '@nestjs/common';
import { ApiResponseOptions } from '@nestjs/swagger';
import { OrderStatusDto } from '../dto/response/order-status.dto';

export const ORDER_STATUS: ApiResponseOptions = {
  status: HttpStatus.OK,
  description: 'Retorna status de pedido',
  isArray: true,
  type: OrderStatusDto
};
