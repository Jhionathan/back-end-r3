import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger';
import { STORE, STORE_LIST } from '../docs/store.doc';
import { CreateStoreDto } from '../dto/request/create-store.dto';
import { UpdateStoreDto } from '../dto/request/update-store.dto';
import { StoreService } from '../services/store.service';

@ApiTags('Lojas')
@ApiBearerAuth('TokenUser')
@Controller('stores')
export class StoresController {
  constructor(private readonly storeService: StoreService) {}

  @Post()
  @ApiOperation({
    summary: 'Cria uma nova loja'
  })
  create(@Body() createStoreDto: CreateStoreDto) {
    return this.storeService.save(createStoreDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Lista todas as lojas'
  })
  @ApiResponse(STORE_LIST)
  findAll() {
    return this.storeService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Retorna uma loja específica pelo ID'
  })
  @ApiResponse(STORE)
  findOne(@Param('id') id: string) {
    return this.storeService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Atualiza parcialmente uma loja'
  })
  update(@Param('id') id: string, @Body() updateStoreDto: UpdateStoreDto) {
    return this.storeService.update(+id, updateStoreDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Exclui uma loja'
  })
  remove(@Param('id') id: string) {
    return this.storeService.remove(+id);
  }
}
