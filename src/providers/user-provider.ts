import { userApi } from './api';
import { activityMapper } from './mapper';

export const userProvider = {
  async getActivities() {
    const { data } = await userApi().getActivities();
    return data.map(activityMapper.toDomain);
  },
};
