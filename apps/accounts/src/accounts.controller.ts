import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

// Services
import { AccountsService } from './accounts.service';

// DTOs
import { CreateAccountDto, UpdateAccountDto } from '@org/shared';

@Controller()
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}
  @MessagePattern({ cmd: 'ping' })
  ping() {
    return 'pong';
  }

  @MessagePattern({ cmd: 'all' })
  async getAll() {
    return await this.accountsService.all();
  }

  @MessagePattern({ cmd: 'account' })
  async getAccount(@Payload('id') id: string) {
    return await this.accountsService.findById(id);
  }

  @MessagePattern({ cmd: 'create' })
  async createAccount(@Payload() data: CreateAccountDto) {
    return await this.accountsService.create(data);
  }

  @MessagePattern({ cmd: 'update' })
  async updateAccount(
    @Payload('id') id: string,
    @Payload() data: UpdateAccountDto
  ) {
    return await this.accountsService.update(id, data);
  }

  @MessagePattern({ cmd: 'delete' })
  async deleteAccount(@Payload('id') id: string) {
    return await this.accountsService.delete(id);
  }
}
