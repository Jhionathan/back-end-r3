import { ApiProperty } from '@nestjs/swagger';
import { OrderProductsDto } from './order-products.dto';

export class AddOrderProductDto {
  @ApiProperty({
    description: 'Produtos do pedido',
    type: OrderProductsDto,
    isArray: true
  })
  products: OrderProductsDto[];
}
