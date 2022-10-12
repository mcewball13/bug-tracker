import { SettingsValueProps } from "./components/settings/types";

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