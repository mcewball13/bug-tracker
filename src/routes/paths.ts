function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '/dashboard';

export const PATH_AUTH = {
  login: path(ROOTS_AUTH, '/login'),
  register: path(ROOTS_AUTH, '/register'),
  resetPassword: path(ROOTS_AUTH, '/reset-password'),
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  general: {
    root: path(ROOTS_DASHBOARD, '/general'),
  },
  project: {
    root: path(ROOTS_DASHBOARD, '/project/:project_id/overview'),
    bug: path(ROOTS_DASHBOARD, '/project/:project_id/bug/:bug_id'),
    ticket: path(ROOTS_DASHBOARD, '/project/:project_id/ticket/:ticket_id'),
  },
  user: {
    root: path(ROOTS_DASHBOARD, '/user'),
    profile: path(ROOTS_DASHBOARD, '/user/profile'),
    new: path(ROOTS_DASHBOARD, '/user/new'),
    account: path(ROOTS_DASHBOARD, '/user/account'),
    list: path(ROOTS_DASHBOARD, '/user/list'),
    edit: (name: string) => path(ROOTS_DASHBOARD, `/user/${name}/edit`),
  },
};
