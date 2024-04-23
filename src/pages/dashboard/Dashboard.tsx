import { Card, Stack } from '@mui/material';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { ItineraryFormType, itineraryResolver } from '../../common/resolver';
import { RefineListView } from '../../components';
import { DashboardMap } from '../../components/dashboard';
import { DashboardWeather } from './Weather';
import { ItineraryCard } from './ItineraryCard';

export const DashboardPage: React.FC = () => {
  const form = useForm<ItineraryFormType>({ mode: 'onSubmit', resolver: itineraryResolver });

  const handleSubmit = form.handleSubmit(data => {
    console.log(data);
  });

  return (
    <RefineListView>
      <DashboardWeather />
      <Stack flexDirection='row' flexWrap='wrap' gap={3} mb={3}>
        <FormProvider {...form}>
          <ItineraryCard onSubmit={handleSubmit} />
        </FormProvider>
        <Card sx={{ minWidth: '30rem', flexGrow: 3, height: '500px' }}>
          <DashboardMap />
        </Card>
      </Stack>
    </RefineListView>
  );
};
