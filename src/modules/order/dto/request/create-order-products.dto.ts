import { ApiProperty } from '@nestjs/swagger';
import { OrderProductsDto } from './order-products.dto';

export class CreateOrderProductsDto {
  @ApiProperty({
    description: 'Produtos do pedido',
    type: OrderProductsDto,
    isArray: true
  })
  products: OrderProductsDto[];
}
