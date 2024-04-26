import { Box } from '@mui/material';
import { Authenticated, ErrorComponent } from '@refinedev/core';
import { CatchAllNavigate, NavigateToResource } from '@refinedev/react-router-v6';
import { Routes, Route, Outlet } from 'react-router-dom';
import { CategoryList } from '../pages/categories';
import { CourierList, CourierCreate, CourierEdit } from '../pages/couriers';
import { HistoryList } from '../pages/history';
import { DashboardPage } from '../pages/dashboard';
import { AuthPage } from '../pages/auth';
import { authenticatedContainer } from './styles';
import { ThemedLayoutV2 } from '@refinedev/mui';
import { Header, Title } from '../components';

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
          }>
        </Route>

        <Route path='/categories' element={<CategoryList />} />

        <Route path='/couriers'>
          <Route
            path=''
            element={
              <CourierList>
                <Outlet />
              </CourierList>
            }>
            <Route path='new' element={<CourierCreate />} />
          </Route>

          <Route path=':id/edit' element={<CourierEdit />} />
        </Route>
      </Route>

      <Route
        element={
          <Authenticated key='auth-pages' fallback={<Outlet />}>
            <NavigateToResource resource='dashboard' />
          </Authenticated>
        }>
        <Route path='/login' element={<AuthPage type='login' />} />
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
