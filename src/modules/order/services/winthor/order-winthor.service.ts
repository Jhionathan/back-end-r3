import { BadRequestException, Injectable } from '@nestjs/common';
import { SearchOrdersWinthorDto } from './dto/request/search-orders-winthor.dto';
import { OrderWinthorDto } from './dto/response/order-winthor.dto';
import { OrdersWinthorDto } from './dto/response/orders-winthor.dto';
import { AuthWinthorService } from './auth-winthor.service';
import { isPositiveNumber } from '@common/utils/is-positive-number';
import { CancelOrderWinthorDto } from './dto/request/cancel-order-winthor.dto';
import { CreateOrderWinthorDto } from './dto/request/create-order-winthor.dto';

@Injectable()
export class OrderWinthorService {
  constructor(private readonly authService: AuthWinthorService) { }

  async getOrderById(id: number): Promise<OrderWinthorDto> {
    if (!isPositiveNumber(id)) {
      throw new BadRequestException('Código (Winthor) do pedido inválido');
    }

    const axiosInstance = await this.authService.getAxiosInstance();
    const response = await axiosInstance.get<OrderWinthorDto>(
      `/api/wholesale/v1/orders/`,
      {
        params: { orderId: id }
      }
    );

    return response.data;
  }

  async listOrders(
    branchId: number,
    search?: SearchOrdersWinthorDto
  ): Promise<OrdersWinthorDto> {
    if (!isPositiveNumber(branchId)) {
      throw new BadRequestException('Código (Winthor) da filial inválido');
    }

    const axiosInstance = await this.authService.getAxiosInstance();
    const response = await axiosInstance.get<OrdersWinthorDto>(
      `/api/wholesale/v1/orders/list`,
      {
        params: {
          ...search,
          branchId
        }
      }
    );

    return response.data;
  }

  async cancel(paramCancel: CancelOrderWinthorDto): Promise<void> {
    if (!isPositiveNumber(paramCancel.id)) {
      throw new BadRequestException('Código (Winthor) do pedido inválido');
    }
    
    if (paramCancel.reasonCancellation.trim() === '') {
      throw new BadRequestException(
        'Razão (Winthor) para cancelamento é obrigatório'
      );
    }

    const axiosInstance = await this.authService.getAxiosInstance();
    const response = await axiosInstance.delete(`/api/wholesale/v1/orders/`, {
      params: paramCancel
    });

    return response.data;
  }

  async save(body: CreateOrderWinthorDto): Promise<OrderWinthorDto> {
    try {
      const axiosInstance = await this.authService.getAxiosInstance();
      const response = await axiosInstance.post(`/api/wholesale/v1/orders/`, body);
      return response.data;
    } catch (error) {
      console.error('Erro da API ao salvar pedido:', {
        status: error.response.status,
        data: error.response.data
      });
      if (error.response && error.response.data) {
        throw new Error(
          error.response.data.detailedMessage ||
          error.response.data.message ||
          'Erro ao salvar o pedido no winthor'
        );
      }
      throw new Error('Ocorreu um erro ao enviar o pedido para o Winthor.');
    }
  }
}
