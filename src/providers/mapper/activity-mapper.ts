import { Itinerary } from '../gen';
import { v4 } from 'uuid';

export const activityMapper = {
  toDomain(itinerary: Itinerary) {
    return {
      ...itinerary,
      id: v4(),
    };
  },
};
