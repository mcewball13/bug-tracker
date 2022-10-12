import { ChangeEvent, createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
// utils
import getColorPresets, { defaultPreset, colorPresets } from '../utils/getColorPresets';
// @types
import {
  SettingsContextProps,
  SettingsValueProps,
  ThemeColorPresets,
  ThemeContrast,
  ThemeMode,
} from '../components/settings/types';
// config
import { cookiesExpires, cookiesKey, defaultSettings } from '../config';

// ===================================================================

const initialState: SettingsContextProps = {
  ...defaultSettings,
  // light Mode
  onToggleMode: () => {},
  onChangeMode: () => {},

  // Contrast
  onToggleContrast: () => {},
  onChangeContrast: () => {},

  // Color
  onChangeColor: () => {},
  setColor: defaultPreset,
  colorOption: [],

  onResetSetting: () => {},
};

export const SettingsContext = createContext(initialState);

//  ===================================================================

type SettingsProviderProps = {
  children: ReactNode;
  defaultSettings: SettingsValueProps;
};

export function SettingsProvider({ children, defaultSettings }: SettingsProviderProps) {
  const [settings, setSettings] = useSettingCookies(defaultSettings);

  const onToggleMode = () => {
    setSettings({
      ...settings,
      themeMode: settings.themeMode === 'light' ? 'dark' : 'light',
    });
  };

  const onChangeMode = (event: ChangeEvent<HTMLInputElement>) => {
    setSettings({
      ...settings,
      themeMode: (event.target as HTMLInputElement).value as ThemeMode,
    });
  };

  const onToggleContrast = () => {
    setSettings({
      ...settings,
      themeContrast: settings.themeContrast === 'default' ? 'bold' : 'default',
    });
  };

  const onChangeContrast = (event: ChangeEvent<HTMLInputElement>) => {
    setSettings({
      ...settings,
      themeContrast: (event.target as HTMLInputElement).value as ThemeContrast,
    });
  };

  //   Color

  const onChangeColor = (event: ChangeEvent<HTMLInputElement>) => {
    setSettings({
      ...settings,
      themeColorPresets: (event.target as HTMLInputElement).value as ThemeColorPresets,
    });
  };

  const onResetSetting = () => {
    setSettings({
      themeMode: initialState.themeMode,
      themeContrast: initialState.themeContrast,
      themeColorPresets: initialState.themeColorPresets,
    });
  };

  return (
    <SettingsContext.Provider
      value={{
        ...settings,
        onToggleMode,
        onChangeMode,
        onToggleContrast,
        onChangeContrast,
        onChangeColor,
        setColor: getColorPresets(settings.themeColorPresets),
        colorOption: colorPresets.map((color) => ({
          name: color.name,
          value: color.main,
        })),
        onResetSetting,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

function useSettingCookies(
    defaultSettings: SettingsValueProps
  ): [SettingsValueProps, Dispatch<SetStateAction<SettingsValueProps>>] {
    const [settings, setSettings] = useState<SettingsValueProps>(defaultSettings);
  
    const onChangeSetting = () => {
      Cookies.set(cookiesKey.themeMode, settings.themeMode, { expires: cookiesExpires });
  
      Cookies.set(cookiesKey.themeColorPresets, settings.themeColorPresets, {
        expires: cookiesExpires,
      });
  
      Cookies.set(cookiesKey.themeContrast, settings.themeContrast, {
        expires: cookiesExpires,
      });
  
    };
  
    useEffect(() => {
      onChangeSetting();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [settings]);
  
    return [settings, setSettings];
  }
