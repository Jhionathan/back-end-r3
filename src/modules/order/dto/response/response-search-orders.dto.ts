import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { OrderDto } from './order.dto';

export class ResponseSearchOrdersDto {
  @ApiProperty({
    description: 'Lista de pedidos',
    isArray: true,
    type: OrderDto
  })
  data: OrderDto[];

  @IsNumber()
  @ApiProperty({
    description: 'Total',
    example: 100
  })
  total: number;
}
