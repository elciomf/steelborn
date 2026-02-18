import {
  Get,
  Body,
  Post,
  Patch,
  Param,
  Inject,
  Delete,
  Controller,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

// DTOs
import { CreateAccountDto, UpdateAccountDto } from '@org/shared';

@Controller('api')
export class AppController {
  constructor(@Inject('ACCOUNTS') private readonly accounts: ClientProxy) {}
  @Get('ping')
  async ping() {
    return await firstValueFrom(this.accounts.send({ cmd: 'ping' }, {}));
  }

  @Get('accounts')
  async getAll() {
    return await firstValueFrom(this.accounts.send({ cmd: 'all' }, {}));
  }

  @Get('accounts/:id')
  async getAccount(@Param('id') id: string) {
    return await firstValueFrom(this.accounts.send({ cmd: 'account' }, { id }));
  }

  @Post('accounts')
  async createAccount(@Body() body: CreateAccountDto) {
    return await firstValueFrom(this.accounts.send({ cmd: 'create' }, body));
  }

  @Patch('accounts/:id')
  async updateAccount(@Param('id') id: string, @Body() body: UpdateAccountDto) {
    return await firstValueFrom(
      this.accounts.send({ cmd: 'update' }, { id, ...body })
    );
  }

  @Delete('accounts/:id')
  async deleteAccount(@Param('id') id: string) {
    return await firstValueFrom(this.accounts.send({ cmd: 'delete' }, { id }));
  }
}
