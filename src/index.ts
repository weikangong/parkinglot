import readline from 'readline';

import { getNumberOfCarAndMotorCycleLots, getEntryOrExit } from './Utils';
import ParkingLotSystem from './ParkingLotSystem';

import { ENTER, EXIT } from './constants';

const rl = readline.createInterface({
  input: process.stdin,
  // output: process.stdout,
});

function exitProgram(error: Error) {
  console.log(error.message);
  rl.close();
}

rl.on('close', () => {
  process.exit(0);
});

async function main() {
  let hasInitParkingLotSystem = false;
  let parkingLotSystem: ParkingLotSystem;

  rl.on('line', (input: string) => {
    if (!hasInitParkingLotSystem) {
      try {
        const vehicleValues = getNumberOfCarAndMotorCycleLots(input);
        parkingLotSystem = new ParkingLotSystem(vehicleValues);
        hasInitParkingLotSystem = true;
      } catch (err) {
        exitProgram(err);
      }
    } else {
      try {
        const obj = getEntryOrExit(input);

        switch (obj.event) {
          case ENTER:
            console.log(parkingLotSystem.enter(obj));
            break;
          case EXIT:
          default:
            console.log(parkingLotSystem.exit(obj));
        }
      } catch (err) {
        exitProgram(err);
      }
    }
  });
}

main();
