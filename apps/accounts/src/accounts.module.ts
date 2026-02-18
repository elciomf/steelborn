import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Controllers
import { AccountsController } from './accounts.controller';

// Services
import { AccountsService } from './accounts.service';

// Entites
import { Account } from '@org/shared';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [Account],
      synchronize: true,
      logging: true,
    }),
    TypeOrmModule.forFeature([Account]),
  ],

  controllers: [AccountsController],
  providers: [AccountsService],
})
export class AccountsModule {}
