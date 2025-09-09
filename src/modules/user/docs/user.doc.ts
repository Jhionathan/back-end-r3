import { HttpStatus } from '@nestjs/common';
import { ApiResponseOptions } from '@nestjs/swagger';
import { UserDto } from '../dto/response/user.dto';

export const USER: ApiResponseOptions = {
  status: HttpStatus.OK,
  description: 'Retorna um usuário específico',
  type: UserDto
};

export const USER_LIST: ApiResponseOptions = {
  status: HttpStatus.OK,
  description: 'Retorna uma lista de usuários',
  isArray: true,
  type: UserDto
};
