import { AuthRequest } from '@modules/auth/interfaces/jwt.interfaces';
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Request
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger';
import { ORDER_PRODUCT, UPDATE_ORDER_PRODUCT } from '../doc/order-product.doc';
import { ORDER_STATUS } from '../doc/order-status.doc';
import { CreateOrderResponseDto } from '../doc/response-create-order';
import { SEARCH_ORDER } from '../doc/search-order.doc';
import { AddOrderProductDto } from '../dto/request/add-order-product.dto';
import { CancelOrderDto } from '../dto/request/cancel-order.dto';
import { CreateOrderDto } from '../dto/request/create-order.dto';
import { SearchOrdersDto } from '../dto/request/search-orders.dto';
import { UpdateOrderProductDto } from '../dto/request/update-order-product.dto';
import { OrderProductService } from '../services/order-product.service';
import { OrderStatusService } from '../services/order-status.service';
import { OrderService } from '../services/order.service';

@ApiTags('Pedidos')
@ApiBearerAuth('TokenUser')
@Controller('orders')
export class OrdersController {
  constructor(
    private readonly orderService: OrderService,
    private readonly orderStatusService: OrderStatusService,
    private readonly orderProductService: OrderProductService
  ) {}

  @Get('search')
  @ApiOperation({
    summary: 'Pesquisa pedidos'
  })
  @ApiResponse(SEARCH_ORDER)
  search(@Request() req: AuthRequest, @Query() query: SearchOrdersDto) {
    return this.orderService.search(req.user.id, query);
  }

  @Get('status')
  @ApiOperation({
    summary: 'Lista todos os status do pedido'
  })
  @ApiResponse(ORDER_STATUS)
  status() {
    return this.orderStatusService.findAll();
  }

  @Post()
  @ApiOperation({
    summary: 'Cria um novo pedido'
  })
  @ApiResponse(CreateOrderResponseDto)
  create(@Request() req: AuthRequest, @Body() createOrderDto: CreateOrderDto) {
    return this.orderService.save(req.user.id, createOrderDto);
  }

  @Get(':id/products')
  @ApiResponse(ORDER_PRODUCT)
  @ApiOperation({
    summary: 'Lista todos os produtos de um pedido específico pelo ID'
  })
  products(@Request() req: AuthRequest, @Param('id') orderId: number) {
    return this.orderProductService.findByOrderId(req.user.id, orderId);
  }

  @Post(':id/products')
  @ApiOperation({
    summary: 'Adicionar produto ao pedido'
  })
  saveProduct(
    @Request() req: AuthRequest,
    @Param('id') orderId: number,
    @Body() addOrderProductDto: AddOrderProductDto
  ) {
    return this.orderService.saveProduct(
      req.user.id,
      addOrderProductDto,
      orderId
    );
  }

  @Put(':orderId/products/:productId')
  @ApiResponse(UPDATE_ORDER_PRODUCT)
  @ApiOperation({
    summary:
      'Atualiza a quantidade de um produto específico vinculado a um pedido'
  })
  updateProduct(
    @Param('orderId') orderId: number,
    @Param('productId') productId: string,
    @Body() payload: UpdateOrderProductDto
  ) {
    return this.orderService.updateProduct(orderId, productId, payload);
  }

  @Patch(':id/send')
  @ApiOperation({
    summary: 'Envia um pedido específico pelo ID'
  })
  send(@Param('id') id: string) {
    return this.orderService.send(+id);
  }

  @Patch(':id/approve')
  @ApiOperation({
    summary: 'Aprova um pedido específico pelo ID'
  })
  approve(@Param('id') id: string) {
    return this.orderService.approve(+id);
  }

  @Patch(':id/cancel')
  @ApiOperation({
    summary: 'Cancela um pedido específico pelo ID'
  })
  cancel(@Param('id') id: string, @Body() cancelOrderDto: CancelOrderDto) {
    return this.orderService.cancel(+id, cancelOrderDto);
  }
}
