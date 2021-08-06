import {
  CAR, MOTORCYCLE, ENTER, EXIT,
} from '../constants';

import type { EnterObject, ExitObject, Vechicle } from '../types';

function getNumberOfCarAndMotorCycleLots(input: string):
{ numCar: number; numMotorcycle: number } | never {
  const arr = input.trim().split(' ');

  if (arr.length !== 2) throw new Error('Invalid number of paramters');
  const [numCar, numMotorcycle] = arr;
  if (!Number.isInteger(parseInt(numCar.trim(), 10))
|| !Number.isInteger(parseInt(numMotorcycle.trim(), 10))) {
    throw new Error('Invalid data type');
  }

  return { numCar: parseInt(numCar.trim(), 10), numMotorcycle: parseInt(numMotorcycle.trim(), 10) };
}

function validateEntry(arr: string[]): { isValid: boolean, msg: string } {
  if (arr.length !== 4) return { isValid: false, msg: 'Invalid entry event' };

  const [, vehicle, carPlate, timestamp] = arr;

  if (!vehicle || !Object.values([CAR, MOTORCYCLE]).includes(vehicle.toLowerCase().trim())) return { isValid: false, msg: 'Invalid vehicle' };
  if (!carPlate || carPlate.length === 0) return { isValid: false, msg: 'Invalid carPlate' };
  if (!timestamp
    || !Number.isInteger(parseInt(timestamp.trim(), 10))
    || (new Date(parseInt(timestamp, 10) * 1000)).getTime() <= 0) {
    return { isValid: false, msg: 'Invalid timestamp' };
  }

  return { isValid: true, msg: '' };
}

function formatEntry(arr: string[]): EnterObject {
  return {
    event: ENTER,
    vehicle: arr[1].toLowerCase().trim() as Vechicle,
    carPlate: arr[2].toLowerCase().trim(),
    timestamp: parseInt(arr[3].trim(), 10),
  };
}

function validateExit(arr: string[]) {
  if (arr.length !== 3) return { isValid: false, msg: 'Invalid exit event' };

  const [, carPlate, timestamp] = arr;
  if (!carPlate || carPlate.length === 0) return { isValid: false, msg: 'Invalid carPlate' };
  if (!timestamp
    || !Number.isInteger(parseInt(timestamp.trim(), 10))
    || (new Date(parseInt(timestamp.trim(), 10) * 1000)).getTime() <= 0) {
    return { isValid: false, msg: 'Invalid timestamp' };
  }

  return { isValid: true, msg: '' };
}

function formatExit(arr: string[]): ExitObject {
  return {
    event: EXIT,
    carPlate: arr[1].toLowerCase().trim(),
    timestamp: parseInt(arr[2].trim(), 10),
  };
}

function getEntryOrExit(input: string): EnterObject | ExitObject {
  const arr = input.trim().split(' ');
  const cmd = arr[0].toLowerCase().trim();

  let formatted;

  switch (cmd) {
    case ENTER: {
      const { isValid, msg } = validateEntry(arr);
      if (!isValid) throw new Error(msg);
      formatted = formatEntry(arr);
      break;
    }
    case EXIT: {
      const { isValid, msg } = validateExit(arr);
      if (!isValid) throw new Error(msg);
      formatted = formatExit(arr);
      break;
    }
    default:
      throw new Error('Invalid event');
  }

  return formatted;
}

export { getNumberOfCarAndMotorCycleLots, getEntryOrExit };
