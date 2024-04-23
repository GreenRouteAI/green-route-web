import { Autocomplete, Button, Card, CardContent, CardHeader, Stack, TextField } from '@mui/material';
import React from 'react';
import { GoogleMapsAutocomplete, RefineListView } from '../../components';
import { DashboardMap } from '../../components/dashboard';
import { DashboardWeather } from './Weather';
import { FormProvider, useForm } from 'react-hook-form';

export const DashboardPage: React.FC = () => {
  const form = useForm();

  return (
    <RefineListView>
      <DashboardWeather />
      <Stack flexDirection='row' flexWrap='wrap' gap={3} mb={3}>
        <Card sx={{ minWidth: '20rem', flexGrow: 1 }}>
          <CardHeader title='Itinerary' />
          <CardContent sx={{ height: '424px' }}>
            <form>
              <FormProvider {...form}>
                <Stack gap={1}>
                  <GoogleMapsAutocomplete onChange={() => {}} label='From' />
                  <GoogleMapsAutocomplete onChange={() => {}} label='To' />
                  <TextField size='small' label='People' />
                  <TextField size='small' label='Nights' />
                  <TextField size='small' label='Vehicle' />
                  <TextField size='small' label='Fuel' />
                  <TextField size='small' label='Hotel' />
                  <Button type='submit' sx={{ mt: 3 }}>
                    Start
                  </Button>
                </Stack>
              </FormProvider>
            </form>
          </CardContent>
        </Card>
        <Card sx={{ minWidth: '30rem', flexGrow: 3, height: '500px' }}>
          <DashboardMap />
        </Card>
      </Stack>
    </RefineListView>
  );
};
