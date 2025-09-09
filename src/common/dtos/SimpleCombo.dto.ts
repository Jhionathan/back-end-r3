import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class SimpleComboDTO {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: 'ID'
  })
  id: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Descrição'
  })
  description: string;
}
