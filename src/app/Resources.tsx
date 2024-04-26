import { Dashboard as DashboardIcon, History as HistoryIcon, Radio as RadioIcon, StarOutline } from '@mui/icons-material';

export const appResources = [
  {
    name: 'dashboard',
    list: '/',
    meta: {
      label: 'Dashboard',
      icon: <DashboardIcon />,
    },
  },
  {
    name: 'radio',
    list: '/radio',
    meta: {
      label: 'Radio',
      icon: <RadioIcon />,
    },
  },
  {
    name: 'history',
    list: '/history',
    meta: {
      label: 'Travel History',
      icon: <HistoryIcon />,
    },
  },
  {
    name: 'plan',
    list: '/plan',
    meta: {
      label: 'Upgrade Plan',
      icon: <StarOutline />,
    },
  },
];
