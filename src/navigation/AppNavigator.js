import React, { useEffect, useState } from "react";
// import { LogBox } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { navigationRef } from "./RootNavigation";
import { DrawerNavigator, IntroStackScreen, TabScreen } from "./StoneNavigator";
import { useDispatch } from "react-redux";
import { Logout } from "../reducers";
//Modalize
import { Host } from "react-native-portalize";
//Deep Link
import { urlRedirect } from "../utils/Tools";
import * as Linking from "expo-linking";
import { PaperProvider, Appbar } from "react-native-paper";
import { PreferencesContext, useThemePreferences } from "./PreferencesContext";
import {
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  Switch,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Colors from "../utils/Colors";
// LogBox.ignoreLogs(['Setting a timer']);

export const AppNavigator = () => {
  const { toggleTheme, isThemeDark, theme } = useThemePreferences();
  const preferences = useThemePreferences();

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
    <PreferencesContext.Provider
      value={preferences}
      onPress={() => Keyboard.dismiss()}
    >
      <PaperProvider theme={theme}>
        <NavigationContainer ref={navigationRef} theme={theme}>
          <Appbar.Header
            theme={{
              colors: {
                primary: theme?.colors.surface,
              },
            }}
          >
            <Appbar.Content title={""} />
            <Appbar.Action
              icon={() => (
                <MaterialCommunityIcons
                  name={isThemeDark ? "weather-night" : "weather-sunny"}
                  size={24}
                  color={isThemeDark ? Colors.green : Colors.black}
                />
              )}
            />
            <Switch
              color={Colors.purple}
              trackColor={{ false: Colors.text, true: Colors.green }}
              thumbColor={isThemeDark ? Colors.bluegreen : Colors.green}
              value={isThemeDark}
              onValueChange={toggleTheme}
              style={styles.switch}
            />
          </Appbar.Header>
          <TabScreen />
        </NavigationContainer>
      </PaperProvider>
    </PreferencesContext.Provider>
  );
};

const styles = StyleSheet.create({
  switch: {
    transform: [{ scaleX: 2 }, { scaleY: 2 }],
    marginHorizontal: 20,
  },
});
