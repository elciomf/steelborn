import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

// Entities
import { Account, CreateAccountDto, UpdateAccountDto } from '@org/shared';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>
  ) {}

  async all() {
    return await this.accountRepository.find();
  }

  async findById(id: string) {
    return await this.accountRepository.findOneBy({ id });
  }

  async findByEmail(email: string) {
    return await this.accountRepository.findOneBy({ email });
  }

  async create(createAccountDto: CreateAccountDto) {
    // Check if email already in use
    if (await this.findByEmail(createAccountDto.email))
      throw new ConflictException(
        `Account with email ${createAccountDto.email} already exists`
      );

    const account = this.accountRepository.create(createAccountDto);

    // Fire triggers
    return await this.accountRepository.save(account);
  }

  async update(id: string, updateAccountDto: UpdateAccountDto) {
    const account = await this.findById(id);

    // Check if account exists
    if (!account) {
      throw new NotFoundException(`Account with ID ${id} not found`);
    }

    if (updateAccountDto.email && updateAccountDto.email !== account.email) {
      // Check if email already in use
      if (await this.findByEmail(updateAccountDto.email)) {
        throw new ConflictException(
          `Account with email ${updateAccountDto.email} already exists`
        );
      }
    }

    this.accountRepository.merge(account, updateAccountDto);

    // Fire triggers
    return await this.accountRepository.save(account);
  }

  async delete(id: string) {
    const account = await this.findById(id);

    // Check if account exists
    if (!account) {
      throw new NotFoundException(`Account with ID ${id} not found`);
    }

    // Fire triggers
    return await this.accountRepository.remove(account);
  }
}
