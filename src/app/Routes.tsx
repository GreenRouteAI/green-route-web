import { Box } from '@mui/material';
import { Authenticated, ErrorComponent } from '@refinedev/core';
import { ThemedLayoutV2 } from '@refinedev/mui';
import { CatchAllNavigate, NavigateToResource } from '@refinedev/react-router-v6';
import { Outlet, Route, Routes } from 'react-router-dom';
import { Header, Title } from '../components';
import { AuthPage } from '../pages/auth';
import { Radio } from '../pages/radio';
import { DashboardPage } from '../pages/dashboard';
import { HistoryList } from '../pages/history';
import { authenticatedContainer } from './styles';

export const AppRoute = () => {
  return (
    <Routes>
      <Route
        element={
          <Authenticated key='authenticated-routes' fallback={<CatchAllNavigate to='/login' />}>
            <ThemedLayoutV2 Header={Header} Title={Title}>
              <Box sx={authenticatedContainer}>
                <Outlet />
              </Box>
            </ThemedLayoutV2>
          </Authenticated>
        }>
        <Route index element={<DashboardPage />} />
        <Route
          path='/history'
          element={
            <HistoryList>
              <Outlet />
            </HistoryList>
          }></Route>

        <Route path='/radio' element={<Radio />} />
      </Route>

      <Route
        element={
          <Authenticated key='auth-pages' fallback={<Outlet />}>
            <NavigateToResource resource='dashboard' />
          </Authenticated>
        }>
        <Route path='/login' element={<AuthPage type='login' />} />
        <Route path='/register' element={<AuthPage type='register' />} />
      </Route>

      <Route
        element={
          <Authenticated key='catch-all'>
            <ThemedLayoutV2 Header={Header} Title={Title}>
              <Outlet />
            </ThemedLayoutV2>
          </Authenticated>
        }>
        <Route path='*' element={<ErrorComponent />} />
      </Route>
    </Routes>
  );
};
