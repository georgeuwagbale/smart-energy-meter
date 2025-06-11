// energy.controller.ts
import { Body, Controller, Get, Post, Render } from '@nestjs/common';
import { EnergyService } from './energy.service';
import { EnergyReadingBody } from './interfaces/energy.interface';
import { EnergyGateway } from './energy.gateway';
import { ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';
import { EnergyReadingDto } from './dtos/energy.dto';




@Controller('energy')
export class EnergyController {

    constructor(
        private readonly energyService: EnergyService,
        private readonly energyGateway: EnergyGateway,
    ) { }

    @Get()
    @Render('energy') // energy.hbs
    getLogs() {

        return {};
    }

    @Post('/readings')
    @ApiOperation({ summary: 'Submit a new energy meter reading' })
    @ApiBody({ type: EnergyReadingDto })
    @ApiResponse({ status: 201, description: 'Reading accepted and broadcasted' })
    async takeReading(@Body() body: EnergyReadingDto) {
        const saved = await this.energyService.saveEnergyReading(body);

        const logToEmit = {
            timestamp: saved.timestamp.toLocaleTimeString(),
            voltage: saved.voltage,
            current: saved.current,
            power: saved.power,
            energy: saved.energy,
            frequency: saved.frequency,
            power_factor: saved.power_factor
        };

        this.energyGateway.emitNewReading(logToEmit);

        return { status: 'ok' };
    }
}
