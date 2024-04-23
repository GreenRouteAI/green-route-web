import { TextField } from '@mui/material';
import { ComponentProps, FC } from 'react';
import { useFormContext } from 'react-hook-form';

interface RHFInputProps extends ComponentProps<typeof TextField> {
  name: string;
}

export const RHFInput: FC<RHFInputProps> = ({ name, ...props }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name];

  return <TextField {...props} {...register(name)} error={!!error} helperText={(error && (error.message as string)) || ''} size='small' />;
};
