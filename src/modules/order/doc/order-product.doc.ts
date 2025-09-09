import { HttpStatus } from '@nestjs/common';
import { ApiResponseOptions } from '@nestjs/swagger';
import { UpdateOrderProductDto } from '../dto/request/update-order-product.dto';
import { ProductDto } from '../dto/response/product.dto';

export const UPDATE_ORDER_PRODUCT: ApiResponseOptions = {
  status: HttpStatus.OK,
  description: 'Atualiza quantidade do produto',
  type: UpdateOrderProductDto
};

export const ORDER_PRODUCT: ApiResponseOptions = {
  status: HttpStatus.OK,
  description: 'Retorna uma lista de produtos',
  isArray: true,
  type: ProductDto
};
