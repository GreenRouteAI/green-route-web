import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import { FuelTypeEnum, TravelDescriptionAccommodationTypeEnum, VehicleTypeEnum } from '../../providers';
import { numberResolver } from './utils';

const itineraryValidator = z.object({
  from: z.string(),
  to: z.string(),
  people: numberResolver(),
  nights: numberResolver(),
  vehicle: z.object({
    fuel: z.object({
      type: z.string().transform(e => e as FuelTypeEnum),
    }),
    type: z.string().transform(e => e as VehicleTypeEnum),
  }),
  accommodation_type: z.string().transform(e => e as TravelDescriptionAccommodationTypeEnum),
});

export const itineraryResolver = zodResolver(itineraryValidator);
export type ItineraryFormType = z.infer<typeof itineraryValidator>;
