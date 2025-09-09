import { HttpStatus } from '@nestjs/common';
import { ApiResponseOptions } from '@nestjs/swagger';
import { StoreDto } from '../dto/response/store.dto';

export const STORE: ApiResponseOptions = {
  status: HttpStatus.OK,
  description: 'Retorna uma lista de lojas',
  type: StoreDto
};

export const STORE_LIST: ApiResponseOptions = {
  status: HttpStatus.OK,
  description: 'Retorna uma lista de lojas',
  isArray: true,
  type: StoreDto
};
