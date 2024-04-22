import { Stack } from '@mui/material';
import { Card } from '../../components';

export const DashboardWeather = () => {
  return (
    <Stack flexWrap='wrap' flexDirection='row' my={3} justifyContent='space-evenly' gap={3}>
      <Card title='Today' sx={{ minWidth: '20rem', flexGrow: 1 }} cardContentProps={{ sx: { height: '208px' } }}></Card>
      <Card title='Today' sx={{ minWidth: '20rem', flexGrow: 1 }} cardContentProps={{ sx: { height: '208px' } }}></Card>
      <Card title='Today' sx={{ minWidth: '20rem', flexGrow: 1 }} cardContentProps={{ sx: { height: '208px' } }}></Card>
    </Stack>
  );
};
