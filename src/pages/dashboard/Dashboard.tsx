import { Autocomplete, Button, Card, CardContent, CardHeader, Stack, TextField } from '@mui/material';
import React from 'react';
import usePlacesService from 'react-google-autocomplete/lib/usePlacesAutocompleteService';
import { RefineListView } from '../../components';
import { DashboardMap } from '../../components/dashboard';
import { DashboardWeather } from './Weather';

export const DashboardPage: React.FC = () => {
  const { placePredictions, getPlacePredictions, isPlacePredictionsLoading } = usePlacesService({
    apiKey: import.meta.env.VITE_MAPS_API_KEY,
    debounce: 200,
  });

  return (
    <RefineListView>
      <DashboardWeather />
      <Stack flexDirection='row' flexWrap='wrap' gap={3} mb={3}>
        <Card sx={{ minWidth: '20rem', flexGrow: 1 }}>
          <CardHeader title='Itinerary' />
          <CardContent sx={{ height: '424px' }}>
            <form>
              <Stack gap={1}>
                <Autocomplete
                  disablePortal
                  options={placePredictions}
                  size='small'
                  loading={isPlacePredictionsLoading}
                  renderInput={params => <TextField {...params} onChange={e => getPlacePredictions({ input: e.target.value })} label='Movie' />}
                />
                <TextField size='small' label='From' />
                <TextField size='small' label='To' />
                <TextField size='small' label='People' />
                <TextField size='small' label='Nights' />
                <TextField size='small' label='Vehicle' />
                <TextField size='small' label='Fuel' />
                <TextField size='small' label='Hotel' />
                <Button type='submit' sx={{ mt: 3 }}>
                  Start
                </Button>
              </Stack>
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
