import { useList, useNavigation } from "@refinedev/core";

import { GoogleMap, MapMarker } from "../../../components";
import { IOrder } from "../../../interfaces";
import { useGetGeoLocation } from "../../../hooks";

export const DeliveryMap: React.FC = () => {
  const { latitude, longitude } = useGetGeoLocation();
  const { data: orderData } = useList<IOrder>({
    resource: "orders",
    config: {
      filters: [
        {
          field: "status.text",
          operator: "eq",
          value: "On The Way",
        },
      ],
      pagination: {
        pageSize: 1000,
      },
    },
  });

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
