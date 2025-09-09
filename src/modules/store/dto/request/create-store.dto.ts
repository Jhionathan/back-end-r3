import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { MaxLength } from 'class-validator';
import { MinLength } from 'class-validator';
import { IsNotEmpty } from 'class-validator';

export class CreateStoreDto {
  @IsNotEmpty()
  @ApiProperty({
    description: 'Nome',
    example: ''
  })
  name: string;

  @IsNotEmpty()
  @Transform(({ value }) => value.replace(/\D/g, ''))
  @MinLength(14)
  @MaxLength(14)
  @ApiProperty({
    description: 'CNPJ',
    example: '00000000000188'
  })
  cnpj: string;

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
