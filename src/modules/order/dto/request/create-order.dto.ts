import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { OrderProductsDto } from './order-products.dto';

export class CreateOrderDto {
  @IsNotEmpty()
  @ApiProperty({
    description: 'Código da Loja',
    example: 5
  })
  storeId: number;

  @ApiProperty({
    description: 'Produtos do pedido',
    type: OrderProductsDto,
    isArray: true,
    required: false
  })
  products: OrderProductsDto[];
}
