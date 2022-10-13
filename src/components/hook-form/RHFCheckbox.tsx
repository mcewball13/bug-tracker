// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { Checkbox, FormControlLabel, FormGroup, FormControlLabelProps } from '@mui/material';

interface RHFCheckboxProps extends Omit<FormControlLabelProps, 'control'> {
    name: string;
  }
  
  export function RHFCheckbox({ name, ...other }: RHFCheckboxProps) {
    const { control } = useFormContext();
  
    return (
      <FormControlLabel
        control={
          <Controller
            name={name}
            control={control}
            render={({ field }) => <Checkbox {...field} checked={field.value} />}
          />
        }
        {...other}
      />
    );
  }