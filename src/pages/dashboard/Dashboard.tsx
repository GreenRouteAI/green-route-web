import Grid from '@mui/material/Grid';
import { useApiUrl, useCustom, useTranslate } from '@refinedev/core';
import dayjs from 'dayjs';
import React, { useMemo, useState } from 'react';
import { Card, RefineListView } from '../../components';
import { DashboardMap } from '../../components/dashboard';
import { IOrderChart, ISalesChart } from '../../interfaces';
import { DashboardWeather } from './Weather';

type DateFilter = 'lastWeek' | 'lastMonth';

const DATE_FILTERS: Record<
  DateFilter,
  {
    text: string;
    value: DateFilter;
  }
> = {
  lastWeek: {
    text: 'lastWeek',
    value: 'lastWeek',
  },
  lastMonth: {
    text: 'lastMonth',
    value: 'lastMonth',
  },
};

export const DashboardPage: React.FC = () => {
  const t = useTranslate();

  return (
    <RefineListView>
      <DashboardWeather />
      <Grid container columns={24} spacing={3}>
        <Grid
          item
          xs={24}
          sm={24}
          md={24}
          lg={15}
          xl={15}
          sx={{
            height: '504px',
          }}>
          <Card
            title={t('dashboard.deliveryMap.title')}
            cardContentProps={{
              sx: {
                height: '424px',
              },
            }}>
            <DashboardMap />
          </Card>
        </Grid>
        <Grid
          item
          xs={24}
          sm={24}
          md={24}
          lg={9}
          xl={9}
          sx={{
            height: '504px',
          }}>
          <Card title={t('dashboard.timeline.title')}></Card>
        </Grid>
        <Grid
          item
          xs={24}
          sm={24}
          md={24}
          lg={15}
          xl={15}
          sx={{
            height: '800px',
          }}>
          <Card
            title={t('dashboard.recentOrders.title')}
            cardContentProps={{
              sx: {
                height: '688px',
              },
            }}></Card>
        </Grid>
      </Grid>
    </RefineListView>
  );
};
