import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosInstance } from 'axios';
import { TokenWinthorDto } from './dto/response/token-winthor.dto';

@Injectable()
export class AuthWinthorService {
  private URL;
  private USERNAME;
  private PASSWORD;

  constructor(private readonly cfg: ConfigService) {
    this.URL = this.cfg.get<string>('winthor.url');
    this.USERNAME = this.cfg.get<string>('winthor.username');
    this.PASSWORD = this.cfg.get<string>('winthor.password');
  }

  async getAxiosInstance(): Promise<AxiosInstance> {
    const response = await axios.post<TokenWinthorDto>(
      `${this.URL}/winthor/autenticacao/v1/login`,
      {
        login: this.USERNAME,
        senha: this.PASSWORD
      }
    );
    const token = response.data.accessToken;

    return axios.create({
      baseURL: this.URL,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
}
