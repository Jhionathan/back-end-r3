import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class StoreRoleDto {
  @IsNotEmpty()
  @ApiProperty({
    description: 'Código da Loja',
    example: 1
  })
  storeId: number;

  @IsNotEmpty()
  @ApiProperty({
    description: 'Código do Papel do Usuário',
    example: 2
  })
  roleId: number;
}
