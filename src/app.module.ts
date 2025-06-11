import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EnergyModule } from './modules/energy/energy.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnergyReading } from './modules/energy/entities/energy-reading.entity';

@Module({
  imports: [
    EnergyModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      username: 'my_user',
      password: 'my_password',
      database: 'energy',
      // entities: [__dirname + '/../**/*.entity.{js,ts}'],
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
