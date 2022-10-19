import { AppBar, Stack, Toolbar } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';
import { IconButtonAnimate } from '../../components';
import Iconify from '../../components/Iconify';
import { HEADER, NAVBAR } from '../../config';
import useOffSetTop from '../../hooks/useOffsetTop';
import useResponsive from '../../hooks/useResponsive';
import cssStyles from '../../utils/cssStyles';

type RootStyleProps = {
  isCollapse: boolean;
  isOffset: boolean;
  verticalLayout: boolean;
};

const RootStyle = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== 'isCollapse' && prop !== 'isOffset' && prop !== 'verticalLayout',
})<RootStyleProps>(({ isCollapse, isOffset, verticalLayout, theme }) => ({
  ...cssStyles(theme).bgBlur(),
  boxShadow: 'none',
  height: HEADER.MOBILE_HEIGHT,
  zIndex: theme.zIndex.appBar + 1,
  transition: theme.transitions.create(['width', 'height'], {
    duration: theme.transitions.duration.short,
  }),
  [theme.breakpoints.up('lg')]: {
    height: HEADER.DASHBOARD_DESKTOP_HEIGHT,
    width: `calc(100% - ${NAVBAR.DASHBOARD_WIDTH + 1}px)`,
    ...(isCollapse && {
      width: `calc(100% - ${NAVBAR.DASHBOARD_COLLAPSE_WIDTH}px)`,
    }),
    ...(isOffset && {
      height: HEADER.DASHBOARD_DESKTOP_OFFSET_HEIGHT,
    }),
    ...(verticalLayout && {
      width: '100%',
      height: HEADER.DASHBOARD_DESKTOP_OFFSET_HEIGHT,
      backgroundColor: theme.palette.background.default,
    }),
  },
}));

type Props = {
  onOpenSidebar: VoidFunction;
  isCollapse?: boolean;
  verticalLayout?: boolean;
};

export default function DashboardHeader({ onOpenSidebar, isCollapse = false, verticalLayout = false }: Props) {
  const isOffset = useOffSetTop(HEADER.DASHBOARD_DESKTOP_HEIGHT) && !verticalLayout;

  const isDesktop = useResponsive('up', 'lg');

  {isDesktop && verticalLayout && <div>Logo</div>}

  {!isDesktop && (
    <IconButtonAnimate onClick={onOpenSidebar} sx={{ mr: 1, color: 'text.primary' }}>
      <Iconify icon="eva:menu-2-fill" />
    </IconButtonAnimate>
  )}

  return (
    <RootStyle isCollapse={isCollapse} isOffset={isOffset} verticalLayout={verticalLayout}>
      <Toolbar sx={{ minHeight: '100%!important', px: { lg: 5 } }}>
        <Stack direction="row" alignItems="center" spacing={{ xs: 0.5, sm: 1.5 }}>
          {/*
          <NotificationsPopover />
          <ContactsPopover />
          <AccountPopover /> 
          */}
        </Stack>
      </Toolbar>
    </RootStyle>
  );
}
