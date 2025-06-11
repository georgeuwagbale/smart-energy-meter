import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EnergyModule } from './modules/energy/energy.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnergyReading } from './modules/energy/entities/energy-reading.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    EnergyModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [EnergyReading],
      synchronize: true,
      extra: {
        charset: 'utf8mb4_unicode_ci',
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
