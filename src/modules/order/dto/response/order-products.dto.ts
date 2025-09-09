import { ApiProperty } from '@nestjs/swagger';

export class OrderProductsDto {
  @ApiProperty({
    description: 'Código da Loja',
    example: 5
  })
  storeId: number;
}
