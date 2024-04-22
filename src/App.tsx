import Dashboard from '@mui/icons-material/Dashboard';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';
import { Authenticated, Refine } from '@refinedev/core';
import { KBarProvider } from '@refinedev/kbar';
import { ErrorComponent, RefineSnackbarProvider, ThemedLayoutV2, useNotificationProvider } from '@refinedev/mui';
import routerProvider, { CatchAllNavigate, DocumentTitleHandler, NavigateToResource, UnsavedChangesNotifier } from '@refinedev/react-router-v6';
import dataProvider from '@refinedev/simple-rest';
import { useTranslation } from 'react-i18next';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import { Header, Title } from './components';
import { ColorModeContextProvider } from './contexts';
import { AuthPage } from './pages/auth';
import { CategoryList } from './pages/categories';
import { CourierCreate, CourierEdit, CourierList } from './pages/couriers';
import { CustomerList, CustomerShow } from './pages/customers';
import { DashboardPage } from './pages/dashboard';
import { OrderList, OrderShow } from './pages/orders';
import { ProductCreate, ProductEdit, ProductList } from './pages/products';
import { StoreCreate, StoreEdit, StoreList } from './pages/stores';
import { authProvider } from './providers';

const API_URL = 'https://api.finefoods.refine.dev';

const App: React.FC = () => {
  const { t, i18n } = useTranslation();
  const i18nProvider = {
    translate: (key: string, params: object) => t(key, params),
    changeLocale: (lang: string) => i18n.changeLanguage(lang),
    getLocale: () => i18n.language,
  };

  return (
    <BrowserRouter>
      <KBarProvider>
        <ColorModeContextProvider>
          <CssBaseline />
          <GlobalStyles styles={{ html: { WebkitFontSmoothing: 'auto' } }} />
          <RefineSnackbarProvider>
            <Refine
              routerProvider={routerProvider}
              dataProvider={dataProvider(API_URL)}
              authProvider={authProvider}
              i18nProvider={i18nProvider}
              options={{
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
                breadcrumb: false,
                useNewQueryKeys: true,
              }}
              notificationProvider={useNotificationProvider}
              resources={[
                {
                  name: 'dashboard',
                  list: '/',
                  meta: {
                    label: 'Dashboard',
                    icon: <Dashboard />,
                  },
                },
              ]}>
              <Routes>
                <Route
                  element={
                    <Authenticated key='authenticated-routes' fallback={<CatchAllNavigate to='/login' />}>
                      <ThemedLayoutV2 Header={Header} Title={Title}>
                        <Box sx={{ maxWidth: '1200px', marginLeft: 'auto', marginRight: 'auto' }}>
                          <Outlet />
                        </Box>
                      </ThemedLayoutV2>
                    </Authenticated>
                  }>
                  <Route index element={<DashboardPage />} />

                  <Route path='/orders'>
                    <Route index element={<OrderList />} />
                    <Route path=':id' element={<OrderShow />} />
                  </Route>
                  <Route
                    path='/customers'
                    element={
                      <CustomerList>
                        <Outlet />
                      </CustomerList>
                    }>
                    <Route path=':id' element={<CustomerShow />} />
                  </Route>

                  <Route
                    path='/products'
                    element={
                      <ProductList>
                        <Outlet />
                      </ProductList>
                    }>
                    <Route path=':id/edit' element={<ProductEdit />} />
                    <Route path='new' element={<ProductCreate />} />
                  </Route>

                  <Route path='/stores'>
                    <Route index element={<StoreList />} />
                    <Route path='new' element={<StoreCreate />} />
                    <Route path=':id/edit' element={<StoreEdit />} />
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
                  <Route path='/login' element={<AuthPage type='login' formProps={{ defaultValues: { email: '', password: '' } }} />} />
                  <Route
                    path='/register'
                    element={
                      <AuthPage
                        type='register'
                        formProps={{
                          defaultValues: {
                            email: '',
                            password: '',
                          },
                        }}
                      />
                    }
                  />
                  <Route
                    path='/forgot-password'
                    element={
                      <AuthPage
                        type='forgotPassword'
                        formProps={{
                          defaultValues: {
                            email: 'demo@refine.dev',
                          },
                        }}
                      />
                    }
                  />
                  <Route path='/update-password' element={<AuthPage type='updatePassword' />} />
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
              <UnsavedChangesNotifier />
              <DocumentTitleHandler />
            </Refine>
          </RefineSnackbarProvider>
        </ColorModeContextProvider>
      </KBarProvider>
    </BrowserRouter>
  );
};

export default App;
