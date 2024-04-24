import { useNavigation } from '@refinedev/core';

import { GoogleMap } from '../../../components';
import { useGetGeoLocation } from '../../../hooks';

export const DashboardMap: React.FC<{ directionRenderer?: google.maps.DirectionsRenderer }> = ({ directionRenderer }) => {
  const { latitude, longitude } = useGetGeoLocation();

  const defaultProps = {
    center: {
      lat: latitude,
      lng: longitude,
    },
    zoom: 13,
  };

  const { show } = useNavigation();

  return <GoogleMap mapProps={{ ...defaultProps }} directionRenderer={directionRenderer}></GoogleMap>;
};
