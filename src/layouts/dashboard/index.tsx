import { useState, ReactNode } from 'react';
// @mui
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import { HEADER, NAVBAR } from '../../config';
import useSettings from '../../hooks/useSettings';
import useResponsive from '../../hooks/useResponsive';
import DashboardHeader from './header';
import useCollapseDrawer from '../../hooks/useCollapseDrawer';
import AuthGuard from '../../guards/AuthGuard';

// =============================================================================

type MainStyleProps = {
  collapseClick: boolean;
};

const MainStyle = styled('main', {
  shouldForwardProp: (prop) => prop !== 'collapseClick',
})<MainStyleProps>(({ collapseClick, theme }) => ({
  flexGrow: 1,
  paddingTop: HEADER.MOBILE_HEIGHT + 24,
  paddingBottom: HEADER.MOBILE_HEIGHT + 24,
  [theme.breakpoints.up('lg')]: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: HEADER.DASHBOARD_DESKTOP_HEIGHT + 24,
    paddingBottom: HEADER.DASHBOARD_DESKTOP_HEIGHT + 24,
    width: `calc(100% - ${NAVBAR.DASHBOARD_WIDTH}px)`,
    transition: theme.transitions.create('margin-left', {
      duration: theme.transitions.duration.shorter,
    }),
    ...(collapseClick && {
      marginLeft: NAVBAR.DASHBOARD_COLLAPSE_WIDTH,
    }),
  },
}));

// =============================================================================

type Props = {
  children: ReactNode;
};

export default function DashboardLayout({ children }: Props) {
  const { collapseClick, isCollapse } = useCollapseDrawer();
  const [open, setOpen] = useState(false);

  const isDesktop = useResponsive('up', 'lg');

  return (
      <Box sx={{ display: { lg: 'flex' }, minHeight: { lg: 1 } }}>
        <DashboardHeader isCollapse={isCollapse} onOpenSidebar={() => setOpen(true)} />
        <MainStyle collapseClick={collapseClick}>{children}</MainStyle>
      </Box>
  );
}
