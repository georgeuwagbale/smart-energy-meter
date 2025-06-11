import { Module } from '@nestjs/common';
import { EnergyService } from './energy.service';
import { EnergyController } from './energy.controller';
import { EnergyGateway } from './energy.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnergyReading } from './entities/energy-reading.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([EnergyReading])
  ],
  providers: [EnergyService, EnergyGateway],
  controllers: [EnergyController]
})
export class EnergyModule { }
