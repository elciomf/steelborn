import { Test, TestingModule } from '@nestjs/testing';

// Controllers
import { AccountsController } from './accounts.controller';

// Services
import { AccountsService } from './accounts.service';

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AccountsController],
      providers: [AccountsService],
    }).compile();
  });
});
