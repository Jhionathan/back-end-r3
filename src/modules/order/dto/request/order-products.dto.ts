import { ApiProperty } from '@nestjs/swagger';
import { IsPositive, IsNumber } from 'class-validator';

export class OrderProductsDto {
  @IsNumber()
  @IsPositive()
  @ApiProperty({
    description: 'Código produto do Winthor',
    example: '17899853805791-6361'
  })
  winthorProductId: string;

  @IsNumber()
  @IsPositive()
  @ApiProperty({
    description: 'Quantidade',
    example: 10
  })
  quantity: number;

  @IsNumber()
  @IsPositive()
  @ApiProperty({
    description: 'Valor unitário',
    example: 10.0
  })
  unitValue: number;
}
