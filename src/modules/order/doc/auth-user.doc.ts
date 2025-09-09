import { HttpStatus } from '@nestjs/common';
import { ApiResponseOptions } from '@nestjs/swagger';
import { MeDto } from '../dto/response/me.dto';

export const AUTH_USER: ApiResponseOptions = {
  status: HttpStatus.OK,
  description: 'Retorna dados do usuário autenticado',
  type: MeDto
};
