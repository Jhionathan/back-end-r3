import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreatedStoreDto {
  @IsNotEmpty()
  @ApiProperty({
    description: 'ID usuário R3',
    example: 1
  })
  id: number;

  @IsNotEmpty()
  @ApiProperty({
    description: 'Nome',
    example: ''
  })
  name: string;

  @ApiProperty({
    description: 'CNPJ',
    example: '00.000.000/0001-88'
  })
  cnpj: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'Status',
    example: 1
  })
  status: number;

  @IsNotEmpty()
  @ApiProperty({
    description: 'Código do cliente no Sistema Winthor',
    example: 9567
  })
  winthorCodCli: number;

  @IsNotEmpty()
  @ApiProperty({
    description: 'Código do usuário no Sistema Winthor',
    example: 97
  })
  winthorCodUsur: number;

  @IsNotEmpty()
  @ApiProperty({
    description: 'Código plano de pagamento no Sistema Winthor',
    example: 136
  })
  winthorPaymentPlanId: number;
}
