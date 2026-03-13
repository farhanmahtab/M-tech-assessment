import { Test, TestingModule } from '@nestjs/testing';
import { RetailersController } from './retailers.controller';
import { RetailersService } from './retailers.service';

describe('RetailersController', () => {
  let controller: RetailersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RetailersController],
      providers: [
        {
          provide: RetailersService,
          useValue: {
            findAllAssigned: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<RetailersController>(RetailersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
