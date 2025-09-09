import { HttpStatus } from '@nestjs/common';
import { ApiResponseOptions } from '@nestjs/swagger';

export const CreateOrderResponseDto: ApiResponseOptions = {
  status: HttpStatus.OK,
  description: 'Retorna número do pedido',
  schema: {
    type: 'number',
    example: 1
  }
};
