import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
  let service: AuthService;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            findByUsername: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(() => 'test_token'),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should validate user with correct password', async () => {
    const password = 'password';
    const hash = await bcrypt.hash(password, 10);
    const user = { id: 1, username: 'test', passwordHash: hash };

    (usersService.findByUsername as jest.Mock).mockResolvedValue(user);

    const result = await service.validateUser('test', password);
    expect(result).toBeDefined();
    expect(result.username).toBe('test');
  });

  it('should return null for incorrect password', async () => {
    const hash = await bcrypt.hash('password', 10);
    const user = { id: 1, username: 'test', passwordHash: hash };

    (usersService.findByUsername as jest.Mock).mockResolvedValue(user);

    const result = await service.validateUser('test', 'wrong_password');
    expect(result).toBeNull();
  });

  it('should generate JWT token on login', async () => {
    const user = { id: 1, username: 'test', role: 'ADMIN' };
    const result = await service.login(user);
    expect(result.access_token).toBe('test_token');
  });
});
