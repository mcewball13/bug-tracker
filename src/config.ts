import { SettingsValueProps } from "./components/settings/types";
import { PATH_DASHBOARD } from "./routes/paths";

// ROOT PATH AFTER LOGIN SUCCESSFULL
export const PATH_AFTER_LOGIN = PATH_DASHBOARD.root



export const defaultSettings: SettingsValueProps = {
    themeMode: 'light',
    themeContrast: 'default',
    themeColorPresets: 'default'
};

export const cookiesExpires = 3;

export const cookiesKey = {
    themeMode: 'themeMode',
    themeContrast: 'themeContrast',
    themeColorPresets: 'themeColorPresets',
  };