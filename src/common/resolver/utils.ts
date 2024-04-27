import z from 'zod';

export const numberResolver = () =>
  z.custom(data => data && typeof data === 'string' && /[\d]/gi.test(data), { message: 'Invalid input, integer was expected.' }).transform(data => +(data as string));
