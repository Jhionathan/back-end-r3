import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { PaginationDto } from './pagination.dto';
import { IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';

export class SearchOrdersDto extends PaginationDto {
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  @ApiProperty({
    description: 'Código do Status Pedido',
    example: 1,
    required: false
  })
  statusId?: number;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  @ApiProperty({
    description: 'Código da Loja',
    required: false
  })
  storeId?: number;
}
