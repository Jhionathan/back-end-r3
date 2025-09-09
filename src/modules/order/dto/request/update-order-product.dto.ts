import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsPositive } from 'class-validator';

export class UpdateOrderProductDto {
  @IsNumber()
  @IsPositive()
  @ApiProperty({
    description: 'Quantidade',
    example: 10
  })
  quantity: number;
}
