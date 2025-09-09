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
import { USER, USER_LIST } from '../docs/user.doc';
import { CreateUserDto } from '../dto/request/create-user.dto';
import { UpdateUserDto } from '../dto/request/update-user.dto';
import { UserService } from '../services/user.service';
import { StoreRoleDto } from '../dto/request/store-role.dto';
import { UpdatePasswordUserDto } from '../dto/request/update-password-user.dto';

@ApiTags('Usuários')
@ApiBearerAuth('TokenUser')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({
    summary: 'Cria um novo usuário'
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.save(createUserDto);
  }

  @Post(':id/stores')
  @ApiOperation({
    summary: 'Vincula um usuário a uma loja'
  })
  createUserStore(@Param('id') id: string, @Body() storeRoleDto: StoreRoleDto) {
    return this.userService.saveUserStore(+id, storeRoleDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Lista todos os usuários'
  })
  @ApiResponse(USER_LIST)
  findAll() {
    return this.userService.findAll();
  }

  @Patch(':id/password')
  @ApiOperation({
    summary: 'Atualiza a senha de um usuário'
  })
  updatePassword(
    @Param('id') id: string,
    @Body() updatePasswordDto: UpdatePasswordUserDto
  ) {
    return this.userService.updatePassword(+id, updatePasswordDto);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Retorna um usuário específico pelo ID'
  })
  @ApiResponse(USER)
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Atualiza parcialmente um usuário'
  })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Exclui um usuário'
  })
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
