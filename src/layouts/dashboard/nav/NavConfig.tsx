import SvgIconStyle from "../../../components/SvgIconStyle";
import Iconify from "../../../components/Iconify";

const getIcon = (name: string) => (
    <SvgIconStyle src={`/static/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
)


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