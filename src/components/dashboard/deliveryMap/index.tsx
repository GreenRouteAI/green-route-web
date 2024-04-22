import { useList, useNavigation } from '@refinedev/core';

import { GoogleMap, MapMarker } from '../../../components';
import { IOrder } from '../../../interfaces';
import { useGetGeoLocation } from '../../../hooks';

export const DashboardMap: React.FC = () => {
  const { latitude, longitude } = useGetGeoLocation();

  const defaultProps = {
    center: {
      lat: latitude,
      lng: longitude,
    },
    zoom: 13,
  };

  const { show } = useNavigation();

  return <GoogleMap mapProps={{ ...defaultProps }}></GoogleMap>;
};
