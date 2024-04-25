import { Card, CardContent, CardHeader, Skeleton, Stack, Switch, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useGetGeoLocation } from '../../hooks';
import { FC, useEffect, useState } from 'react';
import { weatherProvider } from '../../providers/weather-provider';
import { Weather } from '../../providers';
import { useWatch } from 'react-hook-form';

interface DashboardWeatherProps {
  origin?: string;
  destination?: string;
}

export const DashboardWeather: FC<DashboardWeatherProps> = () => {
  const { name } = useGetGeoLocation();
  const { from, to } = useWatch();
  const [isOrigin, setIsOrigin] = useState(false);
  const currentOrigin = from || name || '';
  const currentDestination = to || name || '';
  const { data } = useQuery(['weather' + currentOrigin + currentDestination], async () => {
    if (currentOrigin.length > 0) {
      return (await weatherProvider.getWeather(currentOrigin, currentDestination)) as Weather;
    }
  });

  const toShow = isOrigin ? data?.origin : data?.destination;

  return (
    <>
      {currentOrigin !== currentDestination && (
        <Stack flexDirection='row' justifyContent='space-between'>
          <Typography>{isOrigin ? 'Origin' : 'Destination'}</Typography>
          <Switch onChange={(_event, isChecked) => setIsOrigin(isChecked)} value={isOrigin} />
        </Stack>
      )}
      <Stack flexWrap='wrap' flexDirection='row' my={3} justifyContent='space-evenly' gap={3}>
        {toShow?.forecast?.map((e, k) => (
          <Card key={k} title='Today' elevation={0} sx={{ minWidth: '17rem', flexGrow: 1, borderRadius: '1rem', height: '158px' }}>
            <CardHeader title={e.day?.condition?.text} subheader={new Date(e.date || '').toISOString().split('T')[0]}></CardHeader>
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
              <Stack flexDirection='row' gap={2}>
                <Stack>
                  <Typography>Max</Typography>
                  {e.day?.max_temp}°C
                </Stack>
                <Stack>
                  <Typography>Min</Typography>
                  {e.day?.min_temp}°C
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </>
  );
};
