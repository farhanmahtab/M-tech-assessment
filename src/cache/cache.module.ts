import { Module, Global } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import KeyvRedis from '@keyv/redis';
import { Keyv } from 'keyv';

@Global()
@Module({
  providers: [
    {
      provide: CACHE_MANAGER,
      useFactory: async () => {
        const redisUri = process.env.REDIS_HOST 
          ? `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT || '6379'}`
          : 'redis://127.0.0.1:6379';
        
        // Return a clean Keyv instance for global caching
        return new Keyv({
          store: new KeyvRedis(redisUri),
          namespace: 'retailers',
          ttl: 60000 // Default 1 minute TTL
        });
      },
    },
  ],
  exports: [CACHE_MANAGER],
})
export class GlobalCacheModule {}
