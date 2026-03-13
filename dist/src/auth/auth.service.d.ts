import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
type AuthUser = Omit<User, 'passwordHash'>;
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUser(username: string, pass: string): Promise<AuthUser | null>;
    login(user: AuthUser): {
        access_token: string;
    };
}
export {};
