import { AuthProvider } from '@refinedev/core';
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { cache, clearCached, getCached } from '../utils';
import { securityApi, userApi } from './api';
import { auth } from './firebase-conf';
import { Configuration } from './gen';
import { AxiosError } from 'axios';

export const authProvider: AuthProvider & {
  getConfig: () => Configuration;
  loginGoogle: () => void;
} = {
  async check() {
    const token = getCached.token();
    if (!token) {
      return {
        authenticated: false,
        redirectTo: '/login',
      };
    }
    try {
      this.getIdentity && (await this.getIdentity({}));
      return {
        authenticated: true,
      };
    } catch {
      return {
        authenticated: false,
        redirectTo: '/login',
      };
    }
  },
  async login({ email, password }) {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const token = await result?.user?.getIdToken();
      cache.token(token);
      const { data: user } = await securityApi().signIn();
      cache.user(user);
      return {
        success: true,
        redirectTo: '/',
      };
    } catch (err) {
      return {
        success: false,
        error: {
          name: 'LoginError',
          message: (err as Error).message || 'Invalid username or password',
        },
      };
    }
  },
  async logout() {
    clearCached.token();
    clearCached.user();
    signOut(auth);
    return {
      success: true,
      redirectTo: '/login',
    };
  },
  getConfig() {
    const accessToken = getCached.token() || '';
    const conf = new Configuration({ accessToken });
    conf.baseOptions = { headers: { Authorization: `Bearer ${accessToken}` } };
    return conf;
  },
  async onError(error) {
    console.log((error as AxiosError).code);
    return { error };
  },
  async loginGoogle() {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: 'select_account ',
    });
    const { user } = await signInWithPopup(auth, provider);
    const token = await user?.getIdToken();
    cache.token(token);

    try {
      const { data } = await securityApi().signIn();
      cache.user(data);
      return {
        success: true,
        redirectTo: '/',
      };
    } catch (err) {
      const { data } = await securityApi().signUp({
        user: { email: user.email || '', authentication_id: user.uid },
      });
      cache.user(data);
      return {
        success: true,
        redirectTo: '/',
      };
    }
  },
  async getIdentity(params) {
    try {
      const { id } = getCached.user();
      const { data: user } = await userApi().getUserById({ id });
      return user;
    } catch {
      localStorage.clear();
      return {
        success: false,
        redirect: '/login',
      };
    }
  },
  async getPermissions(params) {
    return null;
  },
  async forgotPassword() {
    return {
      success: true,
    };
  },
  updatePassword: async params => {
    return {
      success: true,
    };
  },
};
