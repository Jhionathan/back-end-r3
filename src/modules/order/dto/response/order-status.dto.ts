import { OrderStatusEntity } from '@modules/order/entities/order-status.entity';
import { ApiProperty } from '@nestjs/swagger';

export class OrderStatusDto {
  @ApiProperty({
    description: 'Código do Status do Pedido',
    example: 1
  })
  id: number;

  @ApiProperty({
    description: 'Nome',
    example: 5
  })
  name: string;

  constructor(entity: OrderStatusEntity) {
    this.id = entity.id;
    this.name = entity.name;
  }
}
