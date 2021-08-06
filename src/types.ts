import {
  CAR, MOTORCYCLE, ENTER, EXIT,
} from './constants';

export type Vechicle = typeof CAR | typeof MOTORCYCLE;

export type Event = typeof ENTER | typeof EXIT;

export type EnterObject = {
    event: typeof ENTER;
    vehicle: Vechicle;
    carPlate: string;
    timestamp: number
};

export type ExitObject = {
    event: typeof EXIT;
    carPlate: string;
    timestamp: number
};
