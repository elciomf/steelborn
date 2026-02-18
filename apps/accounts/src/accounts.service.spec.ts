import { Test } from '@nestjs/testing';

// Services
import { AccountsService } from './accounts.service';

describe('AppService', () => {
  let service: AccountsService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [AccountsService],
    }).compile();

    service = app.get<AccountsService>(AccountsService);
  });
});
