import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ProductDto } from '../dto/response/product.dto';
import { OrderService } from './order.service';

@Injectable()
export class OrderProductService {
  constructor(private readonly orderService: OrderService) {}

  async findByOrderId(
    authUserId: number,
    orderId: number
  ): Promise<ProductDto[]> {
    const order = await this.orderService.findOneOrNotFound({
      relations: ['products'],
      where: {
        id: orderId
      }
    });

    if (
      !(await this.orderService.userHasLinkWithStore(authUserId, order.storeId))
    ) {
      throw new UnauthorizedException(
        'O Usuário não pode listar produtos do pedido informado '
      );
    }

    return order.products.map((item) => new ProductDto(item));
  }
}
