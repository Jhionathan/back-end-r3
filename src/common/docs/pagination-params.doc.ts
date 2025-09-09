import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, Min } from 'class-validator';

export class PaginationParams {
  @Transform(({ value }) => Number(value))
  @IsNumber()
  @ApiProperty({
    description: 'Número da página',
    example: 1
  })
  @Min(1)
  public page: number;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  @ApiProperty({
    description: 'Quantidade de itens por página',
    example: 10
  })
  @Min(1)
  public pageSize: number;
}
