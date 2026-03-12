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
        const redisUri = 'redis://127.0.0.1:6379';
        console.log(`[Cache-Final] Overriding CACHE_MANAGER with Redis: ${redisUri}`);
        
        // Pure Keyv instance without any NestJS wrapping magic
        const keyv = new Keyv({
          store: new KeyvRedis(redisUri),
          namespace: 'retailers',
          ttl: 60000
        });

        // Immediate persistence check
        try {
          await keyv.set('OVERRIDE_VERIFICATION', 'PASSED', 60000);
          console.log('[Cache-Final] Redis override CONNECTION SUCCESS');
        } catch (e) {
          console.error('[Cache-Final] Redis override CONNECTION FAILED:', e.message);
        }

        return keyv;
      },
    },
  ],
  exports: [CACHE_MANAGER],
})
export class GlobalCacheModule {}
