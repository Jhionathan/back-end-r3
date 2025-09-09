import {
  BadRequestException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { UserEntity } from '../entities/user.entity';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../dto/request/create-user.dto';
import { CreatedUserDto } from '../dto/response/created-user.dto';
import { StoreService } from '@modules/store/services/store.service';
import { UserStoreEntity } from '@modules/store/entities/user-store.entity';
import { RoleService } from '@modules/store/services/role.service';
import { UserDto } from '../dto/response/user.dto';
import { UpdateUserDto } from '../dto/request/update-user.dto';
import { hashSync } from 'bcrypt';
import { StoreRoleDto } from '../dto/request/store-role.dto';
import { StoreEntity } from '@modules/store/entities/store.entity';
import * as bcrypt from 'bcrypt';
import { UpdatePasswordUserDto } from '../dto/request/update-password-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(UserStoreEntity)
    private readonly userStoreRepository: Repository<UserStoreEntity>,
    private readonly storeService: StoreService,
    private readonly roleService: RoleService,
    private readonly dataSource: DataSource
  ) {}

  async findOneOrNotFound(id: number): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: {
        id
      }
    });

    if (!user) throw new NotFoundException('Usuário não encontrado');

    return user;
  }

  async findAll(): Promise<UserDto[]> {
    const users = await this.userRepository.find();
    return users.map((user) => new UserDto(user));
  }

  async findOne(id: number): Promise<UserDto> {
    const user = await this.findOneOrNotFound(id);
    return new UserDto(user);
  }

  async update(id: number, data: UpdateUserDto): Promise<void> {
    const user = await this.findOneOrNotFound(id);

    const userEmail = await this.findByEmail(data.email);
    if (userEmail && userEmail.id != id) {
      throw new BadRequestException(
        'Email informado já foi cadastrado para outro usuário'
      );
    }

    user.name = data.name;
    user.email = data.email;
    user.save();
  }

  async updatePassword(id: number, data: UpdatePasswordUserDto): Promise<void> {
    const user = await this.findOneOrNotFound(id);

    const isPasswordValid = await bcrypt.compare(
      data.currentPassword,
      user.password
    );
    if (!isPasswordValid) {
      throw new BadRequestException('Senha atual informada incorreta');
    }

    user.password = hashSync(data.newPassword, 10);
    user.save();
  }

  async remove(id: number): Promise<void> {
    const user = await this.userRepository.findOne({
      relations: ['stores'],
      where: {
        id
      }
    });

    if (!user) throw new NotFoundException('Usuário não encontrado');

    if (user.stores.length) {
      throw new BadRequestException(
        'Ação não permitida. Usuário possui loja(s) vinculadas'
      );
    }

    user.remove();
  }

  async findByEmail(email: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      relations: ['stores'],
      where: {
        email
      }
    });

    return user;
  }

  async findByWinthorUserId(winthorUserId: number): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      relations: ['stores'],
      where: {
        winthorUserId
      }
    });

    return user;
  }

  async save(data: CreateUserDto): Promise<CreatedUserDto | void> {
    const emailExists = await this.findByEmail(data.email);
    if (emailExists) {
      throw new BadRequestException(
        'Email informado já foi cadastrado para outro usuário'
      );
    }

    if (!data.store) {
      const user = this.userRepository.create(data);
      const createdUser = await this.userRepository.save(user);
      return {
        id: createdUser.id,
        name: createdUser.name,
        email: createdUser.email,
        winthorUserId: createdUser.winthorUserId
      };
    }

    const store = await this.storeService.findById(data.store.storeId);
    if (!store) {
      throw new BadRequestException('Loja não encontrada');
    }

    const role = await this.roleService.findById(data.store.roleId);
    if (!role) {
      throw new BadRequestException('Permissão não encontrada');
    }

    return await this.dataSource.transaction(async (manager) => {
      const user = this.userRepository.create(data);
      const createdUser = await manager.save(UserEntity, user);

      const userStore = {
        userId: createdUser.id,
        storeId: store.id,
        roleId: role.id
      };

      await manager.save(UserStoreEntity, userStore);

      return {
        id: createdUser.id,
        name: createdUser.name,
        email: createdUser.email,
        winthorUserId: createdUser.winthorUserId
      };
    });
  }

  async saveUserStore(id: number, data: StoreRoleDto): Promise<void> {
    const user = await this.userRepository.findOne({
      relations: ['stores'],
      where: {
        id
      }
    });

    if (!user) {
      throw new BadRequestException('Usuário não encontrado');
    }

    if (user.stores.find((store: StoreEntity) => store.id === data.storeId)) {
      throw new BadRequestException('Usuário já possui vínculo com a loja');
    }

    const role = await this.roleService.findById(data.roleId);
    if (!role) {
      throw new BadRequestException('Permissão não encontrada');
    }

    const store = await this.storeService.findById(data.storeId);
    if (!store) {
      throw new BadRequestException('Loja não encontrada');
    }

    const userStore = new UserStoreEntity();
    userStore.user = user;
    userStore.store = store;
    userStore.role = role;

    await this.userStoreRepository.save(userStore);
  }
}
