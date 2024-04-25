import { Button, Card, CardContent, CardHeader, MenuItem, Stack } from '@mui/material';
import { FC, FormEvent } from 'react';
import { useFormContext } from 'react-hook-form';
import { GoogleMapsAutocomplete, RHFInput } from '../../components';

interface ItineraryCardProps {
  onSubmit: (event: FormEvent) => void;
}

const vehicle = [
  'BICYCLE',
  'SMALL_CAR',
  'LARGE_CAR',
  'BUS',
  'MINIVAN',
  'MOTOR_HOME',
  'FLIGHT_REGULAR_ECONOMY',
  'FLIGHT_CHARTER_ECONOMY',
  'HIKING',
  'KAYAK',
  'TRAM',
  'SUBWAY',
  'FERRY',
  'TRAIN',
  'WALKING',
];

const accommodation = ['HOTEL', 'HOSTEL', 'TENT', 'APARTMENT', 'ROOM', 'RENTED_APARTMENT'];

const fuel = ['BIO_DIESEL', 'DIESEL', 'ETHANOL', 'GASOLINE', 'ELECTRICITY', 'NATURAL_GAS', 'BIO_BAS', 'FOSSIL_GAS'];

export const ItineraryCard: FC<ItineraryCardProps> = ({ onSubmit }) => {
  const { setValue } = useFormContext();
  return (
    <Card sx={{ minWidth: '20rem', flexGrow: 1 }}>
      <CardHeader title='Itinerary' />
      <CardContent>
        <form onSubmit={onSubmit}>
          <Stack gap={1}>
            <GoogleMapsAutocomplete onChange={value => setValue('from', value)} label='From' />
            <GoogleMapsAutocomplete onChange={value => setValue('to', value)} label='To' />
            <RHFInput name='people' label='People' />
            <RHFInput name='nights' label='Nights' />
            <RHFInput name='vehicle.type' label='Vehicle' select>
              {vehicle.map(value => (
                <MenuItem key={value} value={value}>
                  {value}
                </MenuItem>
              ))}
            </RHFInput>
            <RHFInput name='vehicle.fuel.type' label='Fuel' select>
              {fuel.map(value => (
                <MenuItem value={value} key={value}>
                  {value}
                </MenuItem>
              ))}
            </RHFInput>
            <RHFInput name='accommodation_type' label='Accommodation' select>
              {accommodation.map(value => (
                <MenuItem value={value} key={value}>
                  {value}
                </MenuItem>
              ))}
            </RHFInput>
            <Button type='submit' sx={{ mt: 3 }}>
              Start
            </Button>
          </Stack>
        </form>
      </CardContent>
    </Card>
  );
};
