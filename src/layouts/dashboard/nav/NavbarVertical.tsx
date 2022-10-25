import { Stack, Typography } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Scrollbar from '../../../components/Scrollbar';
import useCollapseDrawer from '../../../hooks/useCollapseDrawer';
import useResponsive from '../../../hooks/useResponsive';

import navConfig from './NavConfig';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    flexShrink: 0,
    transition: theme.transitions.create('width', {
      duration: theme.transitions.duration.shorter,
    }),
  },
}));

// ----------------------------------------------------------------------

type Props = {
  isOpenSidebar: boolean;
  onCloseSidebar: VoidFunction;
};

export default function NavbarVertical({ isOpenSidebar, onCloseSidebar }: Props) {
  const theme = useTheme();

  const { pathname } = useRouter();

  const isDesktop = useResponsive('up', 'lg');

  const { isCollapse, collapseClick, collapseHover, onHoverEnter, onHoverLeave, onToggleCollapse } =
    useCollapseDrawer();

  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  <Scrollbar sx={{ height: 1, '& .simplebar-content': { height: 1, display: 'flex', flexDirection: 'column' } }}>
    <Stack direction="row" alignContent="center" justifyContent="space-between">
      <Typography variant="h4" sx={{ ml: 2, mt: 2, mb: 2 }}>
        Logo
      </Typography>
    </Stack>
  </Scrollbar>;
}
