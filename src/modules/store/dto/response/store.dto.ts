import { StoreEntity } from '@modules/store/entities/store.entity';
import { ApiProperty } from '@nestjs/swagger';
import { CreatedStoreDto } from './created-store.dto';

export class StoreDto extends CreatedStoreDto {
  @ApiProperty({
    description: 'Data de criação',
    example: '2024-09-10T22:36:15.542Z'
  })
  createdAt: Date;

  constructor(entity: StoreEntity) {
    super();
    this.id = entity.id;
    this.name = entity.name;
    this.cnpj = entity.cnpj.replace(/\D/g, '');
    this.status = entity.status;
    this.winthorCodCli = entity.winthorCodCli;
    this.winthorCodUsur = entity.winthorCodUsur;
    this.winthorPaymentPlanId = entity.winthorPaymentPlanId;
    this.createdAt = entity.createdAt;
  }
}
