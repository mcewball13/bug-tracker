import { Drawer, Stack, Typography } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Scrollbar from '../../../components/Scrollbar';
import { NAVBAR } from '../../../config';
import useCollapseDrawer from '../../../hooks/useCollapseDrawer';
import useResponsive from '../../../hooks/useResponsive';
import cssStyles from '../../../utils/cssStyles';
import CollapseButton from './CollapseButton';
import NavbarAccount from './NavbarAccount';

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

  const renderContent = (
    <Scrollbar sx={{ height: 1, '& .simplebar-content': { height: 1, display: 'flex', flexDirection: 'column' } }}>
      <Stack
        spacing={3}
        sx={{
          pt: 3,
          pb: 2,
          px: 2.5,
          flexShrink: 0,
          ...(isCollapse && { alignItems: 'center' }),
        }}
      >
        <Stack direction="row" alignContent="center" justifyContent="space-between">
          <Typography variant="h4" sx={{ ml: 2, mt: 2, mb: 2 }}>
            Logo
          </Typography>
          {isDesktop && !isCollapse && (
            <CollapseButton onToggleCollapse={onToggleCollapse} collapseClick={collapseClick} />
          )}
        </Stack>

        <NavbarAccount isCollapse={isCollapse} />
      </Stack>

      {/* <NavSectionVertical navConfig={navConfig} isCollapse={isCollapse} /> */}
    </Scrollbar>
  );
  return (
    <RootStyle
      sx={{
        width: {
          lg: isCollapse ? NAVBAR.DASHBOARD_COLLAPSE_WIDTH : NAVBAR.DASHBOARD_WIDTH,
        },
        ...(collapseClick && {
          position: 'absolute',
        }),
      }}
    >
      {!isDesktop && (
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{
            sx: {
              width: NAVBAR.DASHBOARD_WIDTH,
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
      {isDesktop && (
        <Drawer
          open
          variant="persistent"
          onMouseEnter={onHoverEnter}
          onMouseLeave={onHoverLeave}
          PaperProps={{
            sx: {
              width: NAVBAR.DASHBOARD_WIDTH,
              bgcolor: 'background.default',
              borderRightStyle: 'dashed',
              transition: (theme) =>
                theme.transitions.create('width', {
                  duration: theme.transitions.duration.standard,
                }),
              ...(collapseHover && {
                ...cssStyles(theme).bgBlur(),
                boxShadow: (theme) => theme.customShadows.z24,
              }),
              ...(isCollapse && {
                width: NAVBAR.DASHBOARD_COLLAPSE_WIDTH,
              }),
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </RootStyle>
  );
}
