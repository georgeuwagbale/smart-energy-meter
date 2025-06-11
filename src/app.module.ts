import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EnergyModule } from './modules/energy/energy.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnergyReading } from './modules/energy/entities/energy-reading.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    EnergyModule,
    ConfigModule.forRoot({
      isGlobal: true, // makes config accessible throughout the app
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST', 'localhost'),
        username: configService.get('DB_USERNAME', 'my_user'),
        password: configService.get('DB_PASSWORD', 'my_password'),
        database: configService.get('DB_NAME', 'energy'),
        entities: [EnergyReading],
        synchronize: configService.get('DB_SYNCHRONIZE', true),
        extra: {
          charset: 'utf8mb4_unicode_ci',
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
