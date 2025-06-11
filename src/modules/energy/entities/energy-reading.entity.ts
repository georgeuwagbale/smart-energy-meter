// energy-reading.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class EnergyReading {
  @PrimaryGeneratedColumn('increment')
  id: number;
  
  @CreateDateColumn()
  timestamp: Date;

  @Column()
  voltage: string;

  @Column()
  current: string;

  @Column()
  power: string;

  @Column()
  energy: string;

  @Column()
  frequency: string;

  @Column()
  power_factor: string;
}
