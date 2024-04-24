import { VehicleTypeEnum } from '../gen';

export const vehicleMapper = {
  toTavelMode(vehicle: VehicleTypeEnum) {
    switch (vehicle) {
      case 'BICYCLE':
        return 'BICYCLING';
      case 'SMALL_CAR':
      case 'LARGE_CAR':
      case 'MINIVAN':
      case 'MOTOR_HOME':
        return 'DRIVING';
      case 'BUS':
      case 'FLIGHT_REGULAR_ECONOMY':
      case 'FLIGHT_CHARTER_ECONOMY':
      case 'TRAM':
      case 'SUBWAY':
      case 'FERRY':
      case 'TRAIN':
        return 'TRANSIT';
      case 'HIKING':
      case 'KAYAK':
        return 'WALKING';
      default:
        return 'WALKING';
    }
  },
};
