import { Coordinate } from '../interfaces';
import { User } from '../providers/gen';

const TOKEN = 'access-token';
const USER = 'user';
const COORDINATES = 'coordinates';

const getItemName = (partName: string) => `green-app-${partName}`;

const setItem = (key: string, value: string) => {
  localStorage.setItem(getItemName(key), value);
};

const getItem = (key: string) => localStorage.getItem(getItemName(key));

const removeItem = (key: string) => {
  localStorage.removeItem(getItemName(key));
};

const setJsonItem = (key: string, object: unknown) => {
  try {
    setItem(key, JSON.stringify(object));
  } catch {
    setItem(key, 'null');
  }
};

const getJsonItem = (key: string) => {
  try {
    return JSON.parse(getItem(key) || 'null');
  } catch {
    return null;
  }
};

export const getCached = {
  token: () => getItem(TOKEN),
  user: () => getJsonItem(USER),
  coordinates: () => getJsonItem(COORDINATES),
};

export const cache = {
  token: (token: string) => setItem(TOKEN, token),
  user: (user: User) => setJsonItem(USER, user),
  coordinates: (coordinate: Coordinate) => setJsonItem(COORDINATES, coordinate),
};

export const clearCached = {
  token: () => removeItem(TOKEN),
  user: () => removeItem(USER),
  coordinates: () => removeItem(COORDINATES),
};
