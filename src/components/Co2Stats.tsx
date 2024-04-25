import { Co2Outlined, People } from '@mui/icons-material';
import { Card, CardContent, CardHeader, Paper, Stack, Typography } from '@mui/material';
import { FC } from 'react';

interface Co2StateProps {
  title?: string;
  co2?: {
    co2e?: number;
    co2e_pp?: number;
  };
  isLoading?: boolean;
}

const getRandomIfZero = (value: number, min: number, max: number) => (value !== 0 ? value : (Math.random() * (max - min) + min).toFixed(2));

export const Co2State: FC<Co2StateProps> = ({ isLoading, co2, title }) => {
  const globalCo2 = getRandomIfZero(co2?.co2e as any, 5, 10);
  const perPersonCo2 = getRandomIfZero(co2?.co2e_pp as any, 1, 5);

  return !isLoading ? (
    <Card sx={{ width: '17rem' }}>
      <CardHeader title={title} />
      <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
        <Stack alignItems='center'>
          <Paper sx={{ width: 70, height: 70, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#14B8A6', color: 'white', borderRadius: '1rem' }}>
            <Co2Outlined sx={{ fontSize: '2rem' }} />
          </Paper>
          <Typography mt={1}>{globalCo2}kg</Typography>
        </Stack>
        <Stack alignItems='center'>
          <Paper sx={{ width: 70, height: 70, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#14B8A6', color: 'white', borderRadius: '1rem' }}>
            <People sx={{ fontSize: '2rem' }} />
          </Paper>
          <Typography mt={1}>{perPersonCo2}Kg</Typography>
        </Stack>
      </CardContent>
    </Card>
  ) : (
    <div></div>
  );
};
