import { useEffect, useState } from 'react';
import { cache } from '../utils';
import { mapProvider } from '../providers/maps-provider';

export const useGetGeoLocation = () => {
  const [location, setLocation] = useState({
    longitude: -74.004001,
    latitude: 40.741474,
    name: 'Google',
  });

  useEffect(() => {
    try {
      navigator.geolocation.getCurrentPosition(async p => {
        const { latitude, longitude } = p.coords;
        const name = await mapProvider.getLocationNameByCoordinates({ latitude, longitude });
        cache.coordinates({ latitude, longitude, name });
        setLocation({ latitude, longitude, name });
      });
    } catch {}
  }, []);

  return location;
};
