import { Card, Stack } from '@mui/material';
import { DirectionsRenderer, GoogleMap } from '@react-google-maps/api';
import { useMutation } from '@tanstack/react-query';
import { isEmpty } from 'lodash';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { ItineraryFormType, itineraryResolver } from '../../common/resolver';
import { RefineListView } from '../../components';
import { useGetGeoLocation } from '../../hooks';
import { VehicleTypeEnum } from '../../providers';
import { mapProvider } from '../../providers/map-provider';
import { ItineraryCard } from './ItineraryCard';
import { DashboardWeather } from './Weather';

export const DashboardPage: React.FC = () => {
  const form = useForm<ItineraryFormType>({ mode: 'onSubmit', resolver: itineraryResolver });
  const { data: itineraryDetails, mutate } = useMutation(['itineraryDetails'], mapProvider.getItinerariesDetails);
  const { data: aiRes, mutate: mutateAi } = useMutation(['itineraryDetails'], mapProvider.getItineraries);
  const { latitude, longitude } = useGetGeoLocation();

  form.watch(({ to, from, vehicle }) => {
    if (!isEmpty(to) && !isEmpty(from) && !isEmpty(vehicle?.type) && google) {
      mutate({ destination: to || '', origin: from || '', vehicle: vehicle?.type || VehicleTypeEnum.Bicycle });
    }
  });

  const handleSubmit = form.handleSubmit(data => {
    const distance = (itineraryDetails?.routes[0].legs[0].distance?.value || 1000) / 1000;
    mutateAi({
      accommodation_type: data.accommodation_type,
      distance,
      from: data.from,
      nights: data.nights,
      people: data.people,
      to: data.to,
      vehicle: data.vehicle as any,
    });
  });

  return (
    <RefineListView>
      <DashboardWeather />
      <Stack flexDirection='row' flexWrap='wrap' gap={3} mb={3}>
        <FormProvider {...form}>
          <ItineraryCard onSubmit={handleSubmit} />
        </FormProvider>
        <Card sx={{ minWidth: '30rem', flexGrow: 3, height: '500px' }}>
          <GoogleMap center={{ lat: latitude, lng: longitude }} zoom={15} mapContainerStyle={{ width: '100%', height: '100%' }}>
            {itineraryDetails && <DirectionsRenderer options={{ directions: itineraryDetails }} />}
          </GoogleMap>
        </Card>
      </Stack>
    </RefineListView>
  );
};
