import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @IsEmail()
  @ApiProperty({
    description: 'Email',
    example: 'teste@teste.com'
  })
  email: string;

  @IsString()
  @ApiProperty({
    description: 'Senha',
    example: ''
  })
  password: string;
}
