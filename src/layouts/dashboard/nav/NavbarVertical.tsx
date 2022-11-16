import { styled, useTheme } from '@mui/material/styles';


import navConfig from './NavConfig';




const RootStyle = styled('div')(({ theme }) => ({
    [theme.breakpoints.up('lg')]: {
      flexShrink: 0,
      transition: theme.transitions.create('width', {
        duration: theme.transitions.duration.shorter,
      }),
    },
  }));