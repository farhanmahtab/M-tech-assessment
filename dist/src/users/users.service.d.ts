import { PrismaService } from '../prisma/prisma.service';
import { User, Prisma } from '@prisma/client';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    findOne(id: number): Promise<User | null>;
    findByUsername(username: string): Promise<User | null>;
    create(data: Prisma.UserCreateInput): Promise<User>;
}
