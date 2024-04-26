import { RefineThemes } from '@refinedev/mui';
import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import gray from '@mui/material/colors/grey';

const LightTheme = createTheme({
  ...RefineThemes.Green,
  components: {
    ...RefineThemes.GreenDark.components,
    MuiChip: {
      styleOverrides: {
        labelSmall: {
          lineHeight: '18px',
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        'main.MuiBox-root': {
          backgroundColor: gray[100],
        },
        body: {
          backgroundColor: gray[100],
        },
      },
    },
    MuiTypography: {
      defaultProps: {
        variant: 'body2',
      },
    },
  },
});

const DarkTheme = createTheme({
  ...RefineThemes.GreenDark,
  components: {
    ...RefineThemes.GreenDark.components,
    MuiChip: {
      styleOverrides: {
        labelSmall: {
          lineHeight: '18px',
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        'main.MuiBox-root': {
          backgroundColor: '#121212',
        },
        body: {
          backgroundColor: '#121212',
        },
      },
    },
    MuiTypography: {
      defaultProps: {
        variant: 'body2',
      },
    },
  },
});

const DarkThemeWithResponsiveFontSizes = responsiveFontSizes(DarkTheme);
const LightThemeWithResponsiveFontSizes = responsiveFontSizes(LightTheme);

export { LightThemeWithResponsiveFontSizes, DarkThemeWithResponsiveFontSizes };
