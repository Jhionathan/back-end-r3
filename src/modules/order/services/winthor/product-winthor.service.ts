import { BadRequestException, Injectable } from '@nestjs/common';
import { SearchProductsWinthorDto } from './dto/request/search-products-winthor.dto';
import { ProductWinthorDto } from './dto/response/product-winthor.dto';
import { ProductsWinthorDto } from './dto/response/products-winthor.dto';
import { AuthWinthorService } from './auth-winthor.service';
import { isPositiveNumber } from '@common/utils/is-positive-number';

@Injectable()
export class ProductWinthorService {
  constructor(private readonly authService: AuthWinthorService) {}

  async getProductById(id: number): Promise<ProductWinthorDto> {
    if (!isPositiveNumber(id)) {
      throw new BadRequestException('Código (Winthor) do produto inválido');
    }

    const axiosInstance = await this.authService.getAxiosInstance();
    const response = await axiosInstance.get<ProductWinthorDto>(
      `/api/purchases/v1/products/${id}`
    );

    return response.data;
  }

  async listProducts(
    search?: SearchProductsWinthorDto
  ): Promise<ProductsWinthorDto> {
    const axiosInstance = await this.authService.getAxiosInstance();
    const response = await axiosInstance.get<ProductsWinthorDto>(
      `/api/purchases/v1/products`,
      {
        params: search
      }
    );

    return response.data;
  }
}
