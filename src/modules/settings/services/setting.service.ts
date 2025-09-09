import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SettingEntity } from '../entities/setting.entity';

@Injectable()
export class SettingService {
  constructor(
    @InjectRepository(SettingEntity)
    private readonly settingRepository: Repository<SettingEntity>
  ) {}

  async get<T>(key: string): Promise<T> {
    const setting = await this.settingRepository.findOne({ where: { key } });
    if (!setting) {
      throw new NotFoundException(`Configuração '${key}' não encontrada`);
    }

    try {
      return JSON.parse(setting.value);
    } catch (error) {
      return setting.value as unknown as T;
    }
  }

  async set(key: string, value: string): Promise<void> {
    const settingValue =
      typeof value === 'object' ? JSON.stringify(value) : String(value);

    let setting = await this.settingRepository.findOne({ where: { key } });

    if (setting) {
      setting.value = settingValue;
    } else {
      setting = this.settingRepository.create({ key, value: settingValue });
    }

    await this.settingRepository.save(setting);
  }
}
