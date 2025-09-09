import { OrderProductEntity } from '@modules/order/entities/order-products.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';
import { OrderProductsDto } from '../request/order-products.dto';

export class ProductDto extends OrderProductsDto {
  @IsNumber()
  @ApiProperty({
    description: 'Código do produto',
    example: 1
  })
  id: number;

  @ApiProperty({
    description: 'Data de criação',
    example: '2024-09-01T22:36:15.542Z'
  })
  createdAt: Date;

  @IsOptional()
  @ApiProperty({
    description: 'Data de atualização',
    example: '2024-09-01T22:36:15.542Z',
    required: false
  })
  updateAt?: Date;

  constructor(entity: OrderProductEntity) {
    super();
    this.id = entity.id;
    this.unitValue = entity.unitValue;
    this.quantity = entity.quantity;
    this.winthorProductId = entity.winthorProductId;
    this.createdAt = entity.createdAt;
    this.updateAt = entity.updateAt;
  }
}
