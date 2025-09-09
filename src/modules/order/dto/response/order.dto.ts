import { OrderEntity } from '@modules/order/entities/order.entity';
import { StoreDto } from '@modules/store/dto/response/store.dto';
import { ApiProperty } from '@nestjs/swagger';
import { OrderStatusDto } from './order-status.dto';

export class OrderDto {
  @ApiProperty({
    description: 'Código do pedido',
    example: 1
  })
  id: number;

  @ApiProperty({
    description: 'Código do pedido no Sistema Winthor',
    example: 1
  })
  winthorOrderId: number;

  @ApiProperty({
    description: 'Status',
    type: OrderStatusDto
  })
  status: OrderStatusDto;

  @ApiProperty({
    description: 'Loja',
    type: StoreDto
  })
  store: StoreDto;

  @ApiProperty({
    description: 'Data de criação',
    example: '2024-09-01T22:36:15.542Z'
  })
  createdAt: Date;

  constructor(entity: OrderEntity) {
    this.id = entity.id;
    this.winthorOrderId = entity.winthorOrderId;
    this.createdAt = entity.createdAt;
    this.status = entity.status ? new OrderStatusDto(entity.status) : null;
    this.store = entity.store ? new StoreDto(entity.store) : null;
  }
}
