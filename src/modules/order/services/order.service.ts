import { isPositiveNumber } from '@common/utils/is-positive-number';
import { SettingService } from '@modules/settings/services/setting.service';
import { StoreEntity } from '@modules/store/entities/store.entity';
import { StoreService } from '@modules/store/services/store.service';
import {
  BadRequestException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  DataSource,
  FindOneOptions,
  FindOptionsWhere,
  In,
  Repository
} from 'typeorm';
import { AddOrderProductDto } from '../dto/request/add-order-product.dto';
import { CancelOrderDto } from '../dto/request/cancel-order.dto';
import { CreateOrderDto } from '../dto/request/create-order.dto';
import { SearchOrdersDto } from '../dto/request/search-orders.dto';
import { UpdateOrderProductDto } from '../dto/request/update-order-product.dto';
import { OrderDto } from '../dto/response/order.dto';
import { ResponseSearchOrdersDto } from '../dto/response/response-search-orders.dto';
import { OrderProductEntity } from '../entities/order-products.entity';
import { OrderEntity } from '../entities/order.entity';
import {
  ConfigDefaultOrderEnum,
  RoleOrderEnum,
  StatusOrderEnum
} from '../enums/order.enum';
import { CancelOrderWinthorDto } from './winthor/dto/request/cancel-order-winthor.dto';
import { CreateOrderWinthorDto } from './winthor/dto/request/create-order-winthor.dto';
import { OrderWinthorDto } from './winthor/dto/response/order-winthor.dto';
import { OrderWinthorService } from './winthor/order-winthor.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
    @InjectRepository(OrderProductEntity)
    private readonly orderProductRepository: Repository<OrderProductEntity>,
    private readonly storeService: StoreService,
    private readonly dataSource: DataSource,
    private readonly orderWinthorService: OrderWinthorService,
    private readonly settingService: SettingService
  ) {}

  async search(
    userId: number,
    query: SearchOrdersDto
  ): Promise<ResponseSearchOrdersDto> {
    const whereConditions: FindOptionsWhere<OrderEntity> = {};
    const userStores = await this.storeService.findByUserId(userId);

    if (
      query.storeId &&
      !(await this.userHasLinkWithStore(userId, query.storeId))
    ) {
      return { data: [], total: 0 };
    }

    whereConditions.storeId = In(
      query.storeId
        ? [query.storeId]
        : userStores.map((store: StoreEntity) => store.id)
    );

    if (query.statusId) {
      whereConditions.statusId = query.statusId;
    }

    const [items, total] = await this.orderRepository.findAndCount({
      relations: ['store', 'status'],
      order: {
        createdAt: 'ASC'
      },
      skip: (query.page - 1) * query.pageSize,
      take: query.pageSize,
      where: whereConditions
    });

    const data = items.map((item) => new OrderDto(item));

    return {
      data,
      total
    };
  }

  async userHasLinkWithStore(
    userId: number,
    storeId: number
  ): Promise<boolean> {
    const userStores = await this.storeService.findByUserId(userId);
    const userHasLink = userStores.filter(
      (store: StoreEntity) => store.id === storeId
    );

    return Boolean(userHasLink.length);
  }

  async findOneOrNotFound(
    conditions: FindOneOptions<OrderEntity>
  ): Promise<OrderEntity> {
    const order = await this.orderRepository.findOne(conditions);

    if (!order) throw new NotFoundException('Pedido não encontrado');

    return order;
  }

  async save(userId: number, data: CreateOrderDto): Promise<number> {
    const store = await this.storeService.findOneOrNotFound(data.storeId);
    const pendingId = await this.settingService.get<number>(
      StatusOrderEnum.PENDING
    );

    const createdOrderId = await this.dataSource.transaction(
      async (manager) => {
        const order = this.orderRepository.create({
          storeId: store.id,
          userId: userId,
          statusId: pendingId
        });
        const createdOrder = await manager.save(OrderEntity, order);

        if (data.products && data.products.length > 0) {
          const products = data.products.map((item) =>
            this.orderProductRepository.create({
              ...item,
              orderId: createdOrder.id
            })
          );

          await Promise.all(
            products.map(async (product) => {
              return await manager.save(OrderProductEntity, product);
            })
          );
        }

        return createdOrder.id;
      }
    );

    return createdOrderId;
  }

  async saveProduct(userId: number, data: AddOrderProductDto, orderId: number) {
    if (!orderId) {
      throw new NotFoundException('Obrigatório o código do pedido.');
    }

    if (!data.products || data.products.length === 0) {
      throw new NotFoundException('Lista de produtos não encontrado.');
    }

    await this.findOneOrNotFound({
      where: {
        id: orderId
      }
    });

    const createdProductOrders = await this.dataSource.transaction(
      async (manager) => {
        const products = data.products.map((item) =>
          this.orderProductRepository.create({
            ...item,
            orderId: orderId
          })
        );

        const savedProducts = await Promise.all(
          products.map(async (product) => {
            return await manager.save(OrderProductEntity, product);
          })
        );

        return savedProducts;
      }
    );

    return createdProductOrders;
  }

  async updateProduct(
    orderId: number,
    productId: string,
    { quantity }: UpdateOrderProductDto
  ): Promise<void> {
    const order = await this.findOneOrNotFound({
      relations: ['products'],
      where: {
        id: orderId
      }
    });

    if (!order.products.length) {
      throw new BadRequestException(
        'Produto informado não possui vinculo com o pedido'
      );
    }

    const productUpdate = order.products.find(
      (product: OrderProductEntity) => product.winthorProductId === productId
    );

    if (!productUpdate) {
      throw new BadRequestException(
        'Produto informado não possui vinculo com o pedido'
      );
    }

    productUpdate.quantity = quantity;
    productUpdate.save();
  }

  async send(id: number): Promise<OrderWinthorDto> {
    try {
      const order = await this.findOneOrNotFound({
        relations: ['products', 'store'],
        where: {
          id
        }
      });

      if (!order.products.length) {
        throw new BadRequestException(
          'Pedido informado não possui produtos vinculados'
        );
      }

      const statusAllowedSend = await this.settingService.get<number[]>(
        RoleOrderEnum.STATUS_ALLOWED_SEND
      );

      if (!statusAllowedSend.includes(order.statusId)) {
        throw new BadRequestException(
          `Pedido informado não pode ser enviado. O pedido deve possuir um dos seguinte status: ${statusAllowedSend.join(
            ', '
          )}`
        );
      }

      const sentId = await this.settingService.get<number>(
        StatusOrderEnum.SENT
      );

      if (order.statusId == sentId) {
        throw new BadRequestException(
          'Pedido informado já possui status enviado'
        );
      }

      const saleType = await this.settingService.get<number>(
        ConfigDefaultOrderEnum.SALE_TYPE_DEFAULT
      );

      const body = {
        branchId: '1',
        TotalPrice: order.getTotalPriceProducts(),
        paymentPlanId: order.store.winthorPaymentPlanId,
        seller: order.store.winthorCodUsur,
        saleType: saleType,
        customer: {
          id: order.store.winthorCodCli
        },
        listOfOrderItem: order.getProductsToCreateOrderWinthor()
      } as unknown as CreateOrderWinthorDto;

      const orderCreated = await this.orderWinthorService.save(body);

      order.statusId = sentId;
      order.winthorOrderId = Number(orderCreated.orderId);
      order.save();
      return orderCreated;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async approve(id: number): Promise<void> {
    const order = await this.findOneOrNotFound({
      where: {
        id
      }
    });

    //Verificar pois não vai ter o winthorOrderId no primeiro envio
    // if (!isPositiveNumber(order.winthorOrderId)) {
    //   throw new BadRequestException(
    //     'Pedido informado não possui vinculo com o Sistema Winthor'
    //   );
    // }

    const approvedId = await this.settingService.get<number>(
      StatusOrderEnum.APPROVED
    );

    if (order.statusId == approvedId) {
      throw new BadRequestException(
        'Pedido informado já possui status aprovado'
      );
    }

    order.statusId = approvedId;
    order.save();
  }

  async cancel(
    id: number,
    data: CancelOrderDto
  ): Promise<{ status: number; message: string }> {
    const order = await this.findOneOrNotFound({
      where: {
        id
      }
    });

    if (!isPositiveNumber(order.winthorOrderId)) {
      throw new BadRequestException(
        'Pedido informado não possui vinculo com o Sistema Winthor'
      );
    }

    const canceledId = await this.settingService.get<number>(
      StatusOrderEnum.CANCELED
    );

    if (order.statusId == canceledId) {
      throw new BadRequestException(
        'Pedido informado já possui status cancelado'
      );
    }

    const statusAllowedCancellation = await this.settingService.get<number[]>(
      RoleOrderEnum.STATUS_ALLOWED_CANCELLATION
    );

    if (!statusAllowedCancellation.includes(order.statusId)) {
      throw new BadRequestException(
        `Pedido informado não pode ser cancelado. O pedido deve possuir um dos seguinte status: ${statusAllowedCancellation.join(
          ', '
        )}`
      );
    }

    const cancelOrder: CancelOrderWinthorDto = {
      id: order.winthorOrderId,
      reasonCancellation: data.reasonCancellation,
      ...(data.sendMessageRca !== undefined && {
        sendMessageRca: data.sendMessageRca
      })
    };
    await this.orderWinthorService.cancel(cancelOrder);

    order.statusId = canceledId;
    order.save();

    const mensagem = {
      status: 200,
      message: 'Pedido Cancelado com sucesso'
    };

    return mensagem;
  }
}
