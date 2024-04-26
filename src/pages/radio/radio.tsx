import { Card, CardContent, CardHeader } from '@mui/material';
import { RadioPlayer } from './player';

export const Radio = () => {
  return (
    <Card sx={{ width: '100%', height: '100%' }}>
      <CardHeader title='Radio' />
      <CardContent sx={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'space-around' }}>
        <RadioPlayer />
      </CardContent>
    </Card>
  );
};
