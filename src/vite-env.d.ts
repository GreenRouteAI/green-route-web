/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_MAPS_API_KEY: string;
  readonly VITE_API_BASE_URL: string;
  readonly VITE_FIREBASE_API_KEY: string;
  readonly VITE_FIREBASE_AUTH_DOMAIN: string;
  readonly VITE_FIREBASE_PROJECT_ID: string;
  readonly VITE_FIREBASE_BUCKET: string;
  readonly VITE_FIREBASE_MESSAGE_ID: string;
  readonly VITE_FIREBASE_APP_ID: string;
  readonly VITE_FIREBASE_MEASUREMENT_ID: string;
}
