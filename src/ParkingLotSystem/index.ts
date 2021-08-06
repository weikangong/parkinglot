import { CAR, MOTORCYCLE } from '../constants';

import type { EnterObject, ExitObject, Vechicle } from '../types';

export default class {
    private carLots: number[];

    private motorcycleLots: number[];

    // key = car plate, val = start timestamp
    private map: Record<string, { timestamp: number; vechicle: Vechicle; lot: number }>;

    private carPerHour = 2;

    private motorcyclePerHour = 1;

    constructor({ numCar, numMotorcycle }: { numCar: number, numMotorcycle: number }) {
      this.carLots = [];
      this.motorcycleLots = [];
      this.map = {};

      for (let i = 1; i <= numCar; i += 1) this.carLots.push(i);
      for (let i = 1; i <= numMotorcycle; i += 1) this.motorcycleLots.push(i);
    }

    enter = (obj: EnterObject) => {
      if (this.map[obj.carPlate]) return 'Reject, duplicate';

      switch (obj.vehicle) {
        case CAR: {
          // No more lots
          if (this.carLots.length === 0) return 'Reject';
          const lotNum = this.carLots.shift();
          this.map[obj.carPlate] = {
            timestamp: obj.timestamp,
            vechicle: CAR,
            lot: lotNum,
          };
          return `Accept CarLot${lotNum}`;
        }
        case MOTORCYCLE:
        {
          // No more lots
          if (this.motorcycleLots.length === 0) return 'Reject';
          const lotNum = this.motorcycleLots.shift();
          this.map[obj.carPlate] = {
            timestamp: obj.timestamp,
            vechicle: MOTORCYCLE,
            lot: lotNum,
          };
          return `Accept MotorcycleLot${lotNum}`;
        } default:
          return 'Reject, invalid vehicle';
      }
    }

    exit = (obj: ExitObject) => {
      if (!this.map[obj.carPlate]) return 'Reject';

      const { timestamp, vechicle, lot } = this.map[obj.carPlate];
      const diff = obj.timestamp - timestamp;
      if (diff < 0) return 'Reject, invalid end timestamp';
      const roundedHour = Math.ceil(diff / 60 / 60);

      switch (vechicle) {
        case CAR:
          this.carLots.push(lot);
          delete this.map[obj.carPlate];
          return `CarLot${lot} ${roundedHour * this.carPerHour}`;
        case MOTORCYCLE:
          this.motorcycleLots.push(lot);
          delete this.map[obj.carPlate];
          return `MotorcycleLot${lot} ${roundedHour * this.motorcyclePerHour}`;
        default:
          return 'Reject, invalid vehicle';
      }
    }
}
