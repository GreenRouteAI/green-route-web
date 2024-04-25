import { fileApi } from './api';

export const fileProvider = {
  downloadFile: async (fileId: string) => {
    const { data } = await fileApi().downloadFile({ fileId });
    return data;
  },
  getUrl(fileId: string) {
    return `${import.meta.env.VITE_API_BASE_URL}/raw/${fileId}`;
  },
};
