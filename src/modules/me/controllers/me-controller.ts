import { AuthRequest } from '@modules/auth/interfaces/jwt.interfaces';
import { STORE_LIST } from '@modules/store/docs/store.doc';
import { StoreService } from '@modules/store/services/store.service';
import { Controller, Get, Request } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger';
import { AUTH_USER } from '../doc/auth-user.doc';

@ApiTags('Usuário Autenticado')
@ApiBearerAuth('TokenUser')
@Controller('me')
export class MeController {
  constructor(private readonly storeService: StoreService) {}

  @Get()
  @ApiOperation({
    summary: 'Retorna dados do usuário autenticado'
  })
  @ApiResponse(AUTH_USER)
  me(@Request() req: AuthRequest) {
    return req.user;
  }

  @Get('stores')
  @ApiOperation({
    summary: 'Retorna lista de lojas do usuário autenticado'
  })
  @ApiResponse(STORE_LIST)
  stores(@Request() req: AuthRequest) {
    return this.storeService.findByUserId(req.user.id);
  }
}
