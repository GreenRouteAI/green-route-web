import { Box, Card, CardContent, CardHeader, Stack } from '@mui/material';
import { GoogleMap } from '@react-google-maps/api';
import { useMutation } from '@tanstack/react-query';
import { isEmpty } from 'lodash';
import React, { useCallback, useEffect, useRef } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ItineraryFormType, itineraryResolver } from '../../common/resolver';
import { Co2State, DotsLoading, RefineListView } from '../../components';
import { useGetGeoLocation } from '../../hooks';
import { VehicleTypeEnum } from '../../providers';
import { mapProvider } from '../../providers/map-provider';
import { ItineraryCard } from './ItineraryCard';
import { DashboardWeather } from './Weather';

export const DashboardPage: React.FC = () => {
  const form = useForm<ItineraryFormType>({ mode: 'onSubmit', resolver: itineraryResolver });
  const { data: itineraryDetails, mutate } = useMutation(['itineraryDetails'], mapProvider.getItinerariesDetails);
  const { data: aiRes, mutate: mutateAi, isLoading: isLoadingAi } = useMutation(['itineraryDetails'], mapProvider.getItineraries);
  const { latitude, longitude } = useGetGeoLocation();
  const directionsRenderer = useRef<google.maps.DirectionsRenderer | null>(null);

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

  const load = useCallback((map: google.maps.Map) => {
    if (!directionsRenderer.current) {
      directionsRenderer.current = new google.maps.DirectionsRenderer();
    }
    directionsRenderer.current.setMap(map);
  }, []);

  useEffect(() => {
    if (directionsRenderer.current && itineraryDetails) {
      directionsRenderer.current.setDirections(itineraryDetails);
    }
  }, [itineraryDetails]);

  return (
    <RefineListView>
      <FormProvider {...form}>
        <DashboardWeather />
        <Stack flexDirection='row' flexWrap='wrap' gap={3} mb={3}>
          <ItineraryCard onSubmit={handleSubmit} />
          <Card sx={{ minWidth: '30rem', flexGrow: 3, height: '500px' }}>
            <GoogleMap center={{ lat: latitude, lng: longitude }} zoom={15} mapContainerStyle={{ width: '100%', height: '100%' }} onLoad={load}></GoogleMap>
          </Card>
        </Stack>
      </FormProvider>
      <Stack>
        {(aiRes || isLoadingAi) && (
          <Card>
            <CardHeader title={aiRes?.title} />
            <CardContent>
              <Stack flexDirection='row' width='100%' justifyContent='space-around'>
                <Co2State co2={aiRes?.accommodation} isLoading={isLoadingAi} title='Accommodation' />
                <Co2State co2={aiRes?.transport} isLoading={isLoadingAi} title='Transport' />
              </Stack>
              {isLoadingAi && (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <DotsLoading isLoading={isLoadingAi} />
                </Box>
              )}
              <Markdown remarkPlugins={[remarkGfm]}>{aiRes?.travel_description}</Markdown>
            </CardContent>
          </Card>
        )}
      </Stack>
    </RefineListView>
  );
};
