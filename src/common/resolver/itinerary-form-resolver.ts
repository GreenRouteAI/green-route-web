import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import { numberResolver } from './utils';

const itineraryValidator = z.object({
  from: z.string(),
  to: z.string(),
  people: numberResolver(),
  nights: numberResolver(),
  vehicle: z.string(),
  fuel: z.string(),
  accommodation: z.string(),
});

export const itineraryResolver = zodResolver(itineraryValidator);
export type ItineraryFormType = z.infer<typeof itineraryValidator>;
