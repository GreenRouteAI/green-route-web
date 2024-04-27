import LocationOnIcon from '@mui/icons-material/LocationOn';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { debounce } from '@mui/material/utils';
import parse from 'autosuggest-highlight/parse';
import { useState, useMemo, useEffect, HTMLAttributes, FC } from 'react';

const autocompleteService = { current: null };

interface MainTextMatchedSubstrings {
  offset: number;
  length: number;
}
interface StructuredFormatting {
  main_text: string;
  secondary_text: string;
  main_text_matched_substrings?: readonly MainTextMatchedSubstrings[];
}
interface PlaceType {
  description: string;
  structured_formatting: StructuredFormatting;
}

interface GoogleMapsAutocompleteProps {
  label: string;
  onChange: (value: string) => void;
}

export const GoogleMapsAutocompleteOption = (props: HTMLAttributes<HTMLLIElement>, option: PlaceType) => {
  const matches = option.structured_formatting.main_text_matched_substrings || [];

  const parts = parse(
    option.structured_formatting.main_text,
    matches.map((match: any) => [match.offset, match.offset + match.length])
  );

  return (
    <li {...props}>
      <Grid container alignItems='center'>
        <Grid item sx={{ display: 'flex', width: 44 }}>
          <LocationOnIcon sx={{ color: 'text.secondary' }} />
        </Grid>
        <Grid item sx={{ width: 'calc(100% - 44px)', wordWrap: 'break-word' }}>
          {parts.map((part, index) => (
            <Box key={index} component='span' sx={{ fontWeight: part.highlight ? 'bold' : 'regular' }}>
              {part.text}
            </Box>
          ))}
          <Typography variant='body2' color='text.secondary'>
            {option.structured_formatting.secondary_text}
          </Typography>
        </Grid>
      </Grid>
    </li>
  );
};

export const GoogleMapsAutocomplete: FC<GoogleMapsAutocompleteProps> = ({ label, onChange }) => {
  const [value, setValue] = useState<PlaceType | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState<readonly PlaceType[]>([]);

  const fetch = useMemo(
    () =>
      debounce((request: { input: string }, callback: (results?: readonly PlaceType[]) => void) => {
        (autocompleteService.current as any).getPlacePredictions(request, callback);
      }, 400),
    []
  );

  useEffect(() => {
    let active = true;

    if (!autocompleteService.current && (window as any).google) {
      autocompleteService.current = new (window as any).google.maps.places.AutocompleteService();
    }
    if (!autocompleteService.current) {
      return undefined;
    }

    if (inputValue === '') {
      setOptions(value ? [value] : []);
      return undefined;
    }

    fetch({ input: inputValue }, (results?: readonly PlaceType[]) => {
      if (active) {
        let newOptions: readonly PlaceType[] = [];

        if (value) {
          newOptions = [value];
        }

        if (results) {
          newOptions = [...newOptions, ...results];
        }

        setOptions(newOptions);
      }
    });

    return () => {
      active = false;
    };
  }, [value, inputValue, fetch]);

  const handleInputChange = (_event: any, value: string) => setInputValue(value);
  const handleChange = (_event: any, value: PlaceType | null) => {
    setOptions(value ? [value, ...options] : options);
    setValue(value);
    onChange(value?.description || '');
  };

  return (
    <Autocomplete
      getOptionLabel={option => (typeof option === 'string' ? option : option.description)}
      filterOptions={x => x}
      options={options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      value={value}
      noOptionsText='No locations'
      onChange={handleChange}
      onInputChange={handleInputChange}
      renderInput={params => <TextField {...params} size='small' label={label} fullWidth />}
      renderOption={GoogleMapsAutocompleteOption}
    />
  );
};
