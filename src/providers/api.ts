import { authProvider } from './auth-provider';
import { FileApi, RouteApi, SecurityApi, UserApi } from './gen';

export const securityApi = () => new SecurityApi(authProvider.getConfig());
export const userApi = () => new UserApi(authProvider.getConfig());
export const fileApi = () => new FileApi(authProvider.getConfig());
export const routeApi = () => new RouteApi(authProvider.getConfig());
