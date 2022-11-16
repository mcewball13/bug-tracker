import SvgIconStyle from '../../../components/SvgIconStyle';
import Iconify from '../../../components/Iconify';
import { PATH_DASHBOARD } from '../../../routes/paths';

const getIcon = (name: string) => (
  <SvgIconStyle src={`/static/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
  blog: getIcon('ic_blog'),
  cart: getIcon('ic_cart'),
  chat: getIcon('ic_chat'),
  mail: getIcon('ic_mail'),
  user: getIcon('ic_user'),
  kanban: getIcon('ic_kanban'),
  banking: getIcon('ic_banking'),
  booking: getIcon('ic_booking'),
  invoice: getIcon('ic_invoice'),
  calendar: getIcon('ic_calendar'),
  ecommerce: getIcon('ic_ecommerce'),
  analytics: getIcon('ic_analytics'),
  dashboard: getIcon('ic_dashboard'),
  menuItem: getIcon('ic_menu_item'),
};

const navConfig = [
  {
    subheader: 'general',
    items: [
      { title: 'all projects', path: PATH_DASHBOARD.general, icon: ICONS.dashboard },
      { title: 'all bugs', path: PATH_DASHBOARD.project.bug, icon: ICONS.kanban },
      { title: 'all tickets', path: PATH_DASHBOARD.project.ticket, icon: ICONS.booking },
    ],
  },
  {
    subheader: 'management',
    items: [
      {
        title: 'user',
        path: PATH_DASHBOARD.user.root,
        Icon: ICONS.user,
        children: [
          { title: 'list', path: PATH_DASHBOARD.user.list },
          { title: 'new user', path: PATH_DASHBOARD.user.new },
          { title: 'edit', path: PATH_DASHBOARD.user.edit },
          { title: 'profile', path: PATH_DASHBOARD.user.profile },
          { title: 'account', path: PATH_DASHBOARD.user.account },
        ],
      },
    ],
  },
];

export default navConfig;