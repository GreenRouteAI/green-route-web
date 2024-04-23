import { People } from '@mui/icons-material';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const itineraryValidator = z.object({
  from: z.string(),
  to: z.string(),
  people: z.number().min(1),
  nights: z.number().min(0),
  vehicle: z.string(),
  fuel: z.number(),
  hotel: z.string(),
});

export const itineraryResolver = zodResolver(itineraryValidator);
export type ItineraryFormType = z.infer<typeof itineraryValidator>;
