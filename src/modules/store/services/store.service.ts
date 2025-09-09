import {
  BadRequestException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StoreEntity } from '../entities/store.entity';
import { CreateStoreDto } from '../dto/request/create-store.dto';
import { CreatedStoreDto } from '../dto/response/created-store.dto';
import { StoreDto } from '../dto/response/store.dto';
import { UpdateStoreDto } from '../dto/request/update-store.dto';
import { UserEntity } from '@modules/user/entities/user.entity';

@Injectable()
export class StoreService {
  constructor(
    @InjectRepository(StoreEntity)
    private readonly storeRepository: Repository<StoreEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  async findById(id: number): Promise<StoreEntity> {
    const store = await this.storeRepository.findOne({
      where: {
        id
      }
    });

    return store;
  }

  async findOneOrNotFound(id: number): Promise<StoreEntity> {
    const store = await this.storeRepository.findOne({
      where: {
        id
      }
    });

    if (!store) throw new NotFoundException('Loja não encontrada');

    return store;
  }

  async findAll(): Promise<StoreDto[]> {
    const stores = await this.storeRepository.find();
    return stores.map((store) => new StoreDto(store));
  }

  async findOne(id: number): Promise<StoreDto> {
    const store = await this.findOneOrNotFound(id);
    return new StoreDto(store);
  }

  async update(id: number, data: UpdateStoreDto): Promise<void> {
    const store = await this.findOneOrNotFound(id);

    store.name = data.name;
    store.save();
  }

  async remove(id: number): Promise<void> {
    const store = await this.storeRepository.findOne({
      relations: ['users'],
      where: {
        id
      }
    });

    if (!store) throw new NotFoundException('Loja não encontrada');

    if (store.users.length) {
      throw new BadRequestException(
        'Ação não permitida. Loja possui usuário(s) vinculados'
      );
    }

    store.remove();
  }

  async findByWinthorCodCli(winthorCodCli: number): Promise<StoreEntity> {
    const store = await this.storeRepository.findOne({
      where: {
        winthorCodCli
      }
    });

    return store;
  }

  async findByCnpj(cnpj: string): Promise<StoreEntity> {
    const store = await this.storeRepository.findOne({
      where: {
        cnpj
      }
    });

    return store;
  }

  async save(data: CreateStoreDto): Promise<CreatedStoreDto | void> {
    const winthorCodCliExists = await this.findByWinthorCodCli(
      data.winthorCodCli
    );
    if (winthorCodCliExists) {
      throw new BadRequestException(
        'Código da Loja (Sistema Winthor) informado já foi cadastrado para outra loja'
      );
    }

    const cnpjExists = await this.findByCnpj(data.cnpj);
    if (cnpjExists) {
      throw new BadRequestException(
        'CNPJ informado já foi cadastrado para outra loja'
      );
    }
    const store = this.storeRepository.create(data);
    const createdStore = await this.storeRepository.save(store);

    return {
      id: createdStore.id,
      name: createdStore.name,
      cnpj: createdStore.cnpj,
      status: createdStore.status,
      winthorCodCli: createdStore.winthorCodCli,
      winthorCodUsur: createdStore.winthorCodUsur,
      winthorPaymentPlanId: createdStore.winthorPaymentPlanId
    };
  }

  async findByUserId(id: number): Promise<StoreDto[]> {
    const user = await this.userRepository.findOne({
      relations: ['stores'],
      where: {
        id
      }
    });

    return user.stores.map((store) => new StoreDto(store));
  }
}
