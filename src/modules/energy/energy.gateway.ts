// energy.gateway.ts
import {
    WebSocketGateway,
    WebSocketServer,
    OnGatewayInit,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Injectable } from '@nestjs/common';

@Injectable()
@WebSocketGateway()
export class EnergyGateway implements OnGatewayInit {
    @WebSocketServer()
    server: Server;

    afterInit(server: Server) {
        console.log('WebSocket server initialized');

        // Simulate real-time data every 5 seconds
        // setInterval(() => {
        //   const log = {
        //     timestamp: new Date().toLocaleTimeString(),
        //     voltage: (220 + Math.random() * 10).toFixed(1),
        //     current: (Math.random() * 10).toFixed(2),
        //     power: (Math.random() * 1000).toFixed(0),
        //     energy: (Math.random() * 5).toFixed(2),
        //     frequency: (49 + Math.random() * 2).toFixed(2),
        //   };

        //   this.server.emit('new_log', log);
        // }, 5000);
    }

    emitNewReading(reading: {
        timestamp: string;
        voltage: string;
        current: string;
        power: string;
        energy: string;
        frequency: string;
        power_factor: string;
    }) {
        this.server.emit('new_log', reading);
    }
}
