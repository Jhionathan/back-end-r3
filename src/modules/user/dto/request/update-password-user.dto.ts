import { RegExHelper } from '@common/utils/regex.helper';
import { ApiProperty } from '@nestjs/swagger';
import { Matches } from 'class-validator';

export class UpdatePasswordUserDto {
  @Matches(RegExHelper.password, {
    message:
      'A senha deve conter letras maiúsculas minúsculas, números e caracteres especiais'
  })
  @ApiProperty({
    description: 'Senha atual',
    example: ''
  })
  currentPassword: string;

  @Matches(RegExHelper.password, {
    message:
      'A senha deve conter letras maiúsculas minúsculas, números e caracteres especiais'
  })
  @ApiProperty({
    description: 'Nova Senha',
    example: ''
  })
  newPassword: string;
}
