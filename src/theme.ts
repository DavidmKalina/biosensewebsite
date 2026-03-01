import { createSystem, defaultConfig } from '@chakra-ui/react';

const bluePalette = {
  50: { value: '#E3F2FD' },
  100: { value: '#BBDEFB' },
  200: { value: '#90CAF9' },
  300: { value: '#64B5F6' },
  400: { value: '#42A5F5' },
  500: { value: '#2196F3' },
  600: { value: '#1E88E5' },
  700: { value: '#1976D2' },
  800: { value: '#1565C0' },
  900: { value: '#0D47A1' },
};

export const theme = createSystem(defaultConfig, {
  theme: {
    semanticTokens: {
      colors: {
        primary: {
          default: { value: 'blue.500' },
          _dark: { value: 'blue.300' },
        },
        secondary: {
          default: { value: 'pink.500' },
          _dark: { value: 'pink.300' },
        },
        text: {
          default: { value: 'gray.800' },
          _dark: { value: 'gray.100' },
        },
        body: {
          default: { value: 'gray.50' },
          _dark: { value: 'gray.900' },
        },
        card: {
          default: { value: 'white' },
          _dark: { value: 'gray.800' },
        },
        border: {
          default: { value: 'gray.200' },
          _dark: { value: 'gray.700' },
        },
      },
    },
    tokens: {
      colors: {
        blue: bluePalette,
        pink: {
          500: { value: '#f50057' },
        },
      },
      fonts: {
        heading: { value: "'Plus Jakarta Sans', sans-serif" },
        body: { value: "'Inter', sans-serif" },
      },
    },
  },

  globalCss: {
    body: {
      fontFamily: 'body',
      bg: 'body',
      color: 'text',
      lineHeight: '1.6',
    },
    'h1, h2, h3, h4, h5, h6': {
      fontFamily: 'heading',
      fontWeight: 'bold',
      color: 'primary',
    },
    a: {
      color: 'primary',
      _hover: {
        textDecoration: 'underline',
      },
    },
  },
});