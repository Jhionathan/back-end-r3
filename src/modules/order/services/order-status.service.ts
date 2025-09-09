import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderStatusDto } from '../dto/response/order-status.dto';
import { OrderStatusEntity } from '../entities/order-status.entity';

@Injectable()
export class OrderStatusService {
  constructor(
    @InjectRepository(OrderStatusEntity)
    private readonly orderStatusRepository: Repository<OrderStatusEntity>
  ) {}

  async findAll(): Promise<OrderStatusDto[]> {
    const orderStatus = await this.orderStatusRepository.find();
    return orderStatus.map((status) => new OrderStatusDto(status));
  }
}
