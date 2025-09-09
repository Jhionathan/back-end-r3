import { RegExHelper } from '@common/utils/regex.helper';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Matches } from 'class-validator';
import { StoreRoleDto } from './store-role.dto';
import { IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @ApiProperty({
    description: 'Nome',
    example: ''
  })
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    description: 'Email',
    example: 'teste@teste.com'
  })
  email: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'Código do usuário no Sistema Winthor',
    example: 5957
  })
  winthorUserId: number;

  @IsNotEmpty()
  @Matches(RegExHelper.password, {
    message:
      'A senha deve conter letras maiúsculas minúsculas, números e caracteres especiais'
  })
  @ApiProperty({
    description: 'Senha',
    example: ''
  })
  password: string;

  @IsOptional()
  @ApiProperty({
    description: 'Dados da Loja',
    required: false
  })
  store?: StoreRoleDto;
}
