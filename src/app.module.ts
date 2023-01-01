import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import config from './core/database/database.provider';
import { AtGuard } from './modules/auth/common/guards';
import { Modules } from './modules/index.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SequelizeModule.forRoot({
      ...config,
      synchronize: true,
      sync: { force: false },
      autoLoadModels: true,
    }),
    Modules,
  ],
  providers: [{ provide: 'APP_GUARD', useClass: AtGuard }],
})
export class AppModule {}
