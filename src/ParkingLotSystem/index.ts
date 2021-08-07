import Heap from 'mnemonist/heap';
import { CAR, MOTORCYCLE } from '../constants';

import type { EnterObject, ExitObject, Vechicle } from '../types';

export default class {
    private carLots: Heap<number>;

    private motorcycleLots: Heap<number>;

    private map: Record<string, { timestamp: number; vechicle: Vechicle; lot: number }>;

    private carPerHour = 2;

    private motorcyclePerHour = 1;

    constructor({ numCar, numMotorcycle }: { numCar: number, numMotorcycle: number }) {
      this.carLots = new Heap();
      this.motorcycleLots = new Heap();
      this.map = {};

      for (let i = 1; i <= numCar; i += 1) this.carLots.push(i);
      for (let i = 1; i <= numMotorcycle; i += 1) this.motorcycleLots.push(i);
    }

    enter = (obj: EnterObject) => {
      // Duplicate
      if (this.map[obj.carPlate]) return 'Reject, duplicate';

      switch (obj.vehicle) {
        case CAR: {
          // No more lots
          if (this.carLots.size === 0) return 'Reject';
          const lotNum = this.carLots.pop();
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
          if (this.motorcycleLots.size === 0) return 'Reject';
          const lotNum = this.motorcycleLots.pop();
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
      // Does not exist
      if (!this.map[obj.carPlate]) return 'Reject, does not exist';

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
