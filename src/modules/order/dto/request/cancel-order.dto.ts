import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { IsBoolean, IsString, IsOptional } from 'class-validator';

export class CancelOrderDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Motivo Cancelamento',
    example: ''
  })
  reasonCancellation: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({
    description: 'Enviar mensagem pro RCA?',
    example: true,
    required: false
  })
  sendMessageRca?: boolean;
}
