import { routeApi } from './api';

export const weatherProvider = {
  async getWeather(origin: string, destination: string) {
    const { data } = await routeApi().getForecast({ getForecastRequest: { destination, origin } });
    return data;
  },
};
