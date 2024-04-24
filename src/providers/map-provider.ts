import axios from 'axios';
import { Coordinate } from '../interfaces';
import { routeApi } from './api';
import { TravelDescription, VehicleTypeEnum } from './gen';
import { vehicleMapper } from './mapper';

const MAPS_BASE_URL = import.meta.env.VITE_MAPS_API_BASE_URL;
const API_KEY = import.meta.env.VITE_MAPS_API_KEY;

const mapBase = axios.create({
  baseURL: MAPS_BASE_URL,
  params: {
    key: API_KEY,
  },
});

export const mapProvider = {
  async getLocationNameByCoordinates({ latitude, longitude }: Coordinate) {
    const { data } = await mapBase.get(`/geocode/json?latlng=${latitude},${longitude}`);
    if (data && data.results && data.results.length > 0) {
      return data.results[0].formatted_address;
    } else {
      return null;
    }
  },
  async getItineraries(travelDescription: TravelDescription) {
    const { data } = await routeApi().generateItineraries({ travelDescription });
    return data;
  },
  async getItinerariesDetails({ destination, origin, vehicle }: { origin: string; destination: string; vehicle: VehicleTypeEnum }) {
    if (google) {
      const directionsService = new google.maps.DirectionsService();
      const travelMode = google.maps.TravelMode[vehicleMapper.toTavelMode(vehicle)];
      return await directionsService.route({
        origin: {
          query: origin,
        },
        destination: {
          query: destination,
        },
        travelMode,
      });
    } else {
      return null;
    }
  },
};
