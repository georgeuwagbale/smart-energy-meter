import { ApiProperty } from "@nestjs/swagger";


export class EnergyReadingDto {

    // @ApiProperty()
    // timeStamp: string;

    @ApiProperty()
    voltage: number;

    @ApiProperty()
    current: number;

    @ApiProperty()
    power: number;

    @ApiProperty()
    energy: number;

    @ApiProperty()
    frequency: number;

    @ApiProperty()
    powerFactor: number;
}