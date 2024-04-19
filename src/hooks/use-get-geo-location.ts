import { useEffect, useState } from "react";

export const useGetGeoLocation = () => {
  const [location, setLocation] = useState({
    longitude: -74.004001,
    latitude: 40.741474,
  });

  useEffect(() => {
    try {
      navigator.geolocation.getCurrentPosition((p) => {
        setLocation({
          latitude: p.coords.latitude,
          longitude: p.coords.longitude,
        });
      });
    } catch {}
  }, []);

  return location;
};
