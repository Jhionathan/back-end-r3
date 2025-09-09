import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';
import { IsNotEmpty } from 'class-validator';

export class MeDto {
  @IsNotEmpty()
  @ApiProperty({
    description: 'ID usuário R3',
    example: 1
  })
  id: number;

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
}
