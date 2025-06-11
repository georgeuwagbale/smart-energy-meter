import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EnergyReading } from './entities/energy-reading.entity';
import { Repository } from 'typeorm';
import { EnergyReadingDto } from './dtos/energy.dto';

@Injectable()
export class EnergyService {
    constructor(
        @InjectRepository(EnergyReading) private readonly energyRepository: Repository<EnergyReading>,
    ) { }

    async saveEnergyReading(energyReading: EnergyReadingDto) {

        const savedReading = await this.energyRepository.save({
            // timestamp: new Date(energyReading.timeStamp),
            voltage: energyReading.voltage.toString(),
            current: energyReading.current.toString(),
            frequency: energyReading.frequency.toString(),
            energy: energyReading.energy.toString(),
            power: energyReading.power.toString(),
            power_factor: energyReading.powerFactor.toString()
        })

        return savedReading;
    }
}
