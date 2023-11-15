import React, { useEffect, useState } from "react";
import { LogBox } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector } from "react-redux";
import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";
import { navigationRef } from "./RootNavigation";
import { DrawerNavigator, IntroStackScreen } from "./StoneNavigator";
import { useDispatch } from "react-redux";
import { Logout } from "../reducers";
//Modalize
import { Host } from "react-native-portalize";
//Deep Link
import { urlRedirect } from "../utils/Tools";
import * as Linking from "expo-linking";
import {
  PaperProvider,
  MD3LightTheme,
  MD3DarkTheme,
  adaptNavigationTheme, Appbar, Switch
} from "react-native-paper";
import { PreferencesContext } from "./PreferencesContext";

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

const CombinedDefaultTheme = {
  ...MD3LightTheme,
  ...LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    ...LightTheme.colors,
  },
};
const CombinedDarkTheme = {
  ...MD3DarkTheme,
  ...DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    ...DarkTheme.colors,
  },
};

// LogBox.ignoreLogs(['Setting a timer']);

export const AppNavigator = () => {
  const [isThemeDark, setIsThemeDark] = React.useState(false);

  let theme = isThemeDark ? CombinedDarkTheme : CombinedDefaultTheme;

  const toggleTheme = React.useCallback(() => {
    return setIsThemeDark(!isThemeDark);
  }, [isThemeDark]);

  const preferences = React.useMemo(
    () => ({
      toggleTheme,
      isThemeDark,
    }),
    [toggleTheme, isThemeDark],
  );

  const [value, setValue] = useState(null);
  const dispatch = useDispatch();
  const isFirstOpen = useSelector((state) => state.store.isFirstOpen);
  useEffect(() => {
    // listen for new url events coming from Expo
    Linking.addEventListener(
      "url",
      (event) => {
        urlRedirect(event.url);
      },
      [urlRedirect],
    );
    Linking.getInitialURL().then(urlRedirect);
    // Linking.removeEventListener(
    //   'url',
    //   (event) => {
    //     urlRedirect(event.url);
    //   },
    //   [urlRedirect],
    // );
  }, [urlRedirect]);

  useEffect(() => {
    const isFirstTime = async () => {
      const firstOpen = await AsyncStorage.getItem("isFirstTime");
      setValue(firstOpen);
    };
    isFirstTime();
    const autoLogout = async () => {
      const getUser = await AsyncStorage.getItem("user");
      if (getUser) {
        const user = await JSON.parse(getUser);
        if (user.data.expireTime - Date.now() < 0) {
          dispatch(Logout());
        }
      }
      return;
    };
    autoLogout();
  }, []);
  useEffect(() => {
    const autoLogout = async () => {
      const getUser = await AsyncStorage.getItem("user");
      if (getUser) {
        const user = await JSON.parse(getUser);
        if (user.data.expireTime - Date.now() < 0) {
          dispatch(Logout());
        }
      }
      return;
    };
    autoLogout();
  }, []);
  return (
    <PreferencesContext.Provider value={preferences}>
      <PaperProvider theme={theme}>
        <NavigationContainer ref={navigationRef} theme={theme}>
              <Appbar.Header
                theme={{
                  colors: {
                    primary: theme?.colors.surface,
                  },
                }}
              >
                <Appbar.Content title={"Light or Dark mode"} />
                <Switch
                  color={"red"}
                  value={isThemeDark}
                  onValueChange={toggleTheme}
                />
              </Appbar.Header>
          <Host>
            {(isFirstOpen || value !== null) && <DrawerNavigator />}
            {!isFirstOpen && value === null && <IntroStackScreen />}
          </Host>
        </NavigationContainer>
      </PaperProvider>
    </PreferencesContext.Provider>
  );
};
