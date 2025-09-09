import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { IsPublic } from '../decorators/is-public.decorator';
import { LoginDto } from '../dto/request/login.dto';
import { AuthRequest } from '../interfaces/jwt.interfaces';
import { AuthService } from '../services/auth.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Autenticação')
@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @IsPublic()
  @UseGuards(AuthGuard('local'))
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body()
    payload: LoginDto,
    @Request() req: AuthRequest
  ) {
    return await this.authService.login(req.user);
  }
}
