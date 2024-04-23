import { Card, CardContent, CardHeader, Skeleton, Stack, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useGetGeoLocation } from '../../hooks';
import { FC, useEffect } from 'react';
import { weatherProvider } from '../../providers/weather-provider';
import { Weather } from '../../providers';

interface DashboardWeatherProps {
  origin?: string;
  destination?: string;
}

export const DashboardWeather: FC<DashboardWeatherProps> = ({ destination, origin }) => {
  const { name } = useGetGeoLocation();
  const currentOrigin = origin || name || '';
  const currentDestination = destination || name || '';
  const { data } = useQuery(['weather' + currentOrigin + currentDestination], async () => {
    if (currentOrigin.length > 0) {
      return (await weatherProvider.getWeather(currentOrigin, currentDestination)) as Weather;
    }
  });

  return (
    <Stack flexWrap='wrap' flexDirection='row' my={3} justifyContent='space-evenly' gap={3}>
      {data?.destination?.forecast?.map((e, k) => (
        <Card key={k} title='Today' elevation={0} sx={{ minWidth: '17rem', flexGrow: 1, borderRadius: '1rem', height: '208px' }}>
          <CardHeader title={e.day?.condition?.text}></CardHeader>
          <CardContent sx={{ width: '100%', height: '100%', p: 2, position: 'relative' }}>
            <img
              src={e.day?.condition?.icon}
              alt='img'
              loading='lazy'
              style={{
                height: '60%',
                objectFit: 'cover',
                position: 'absolute',
                right: 2,
                top: 2,
                transform: 'translateY(-50%)',
              }}
            />
            <Stack flexDirection='row'>
              <Stack>
                <Typography>Max</Typography>
                {e.day?.max_temp}C
              </Stack>
              <Stack>
                <Typography>Min</Typography>
                {e.day?.min_temp}C
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      ))}
    </Stack>
  );
};
