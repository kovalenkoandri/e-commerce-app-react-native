import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
//Redux
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
//Reducer
import {
  authReducer,
  cartReducer,
  favoriteReducer,
  orderReducer,
  productReducer,
} from './src/reducers';
//Navigator
import { AppNavigator } from './src/navigation';
// import AppLoading from 'expo-app-loading';
// import * as SplashScreen from 'expo-splash-screen';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';

//redux form
import { reducer as formReducer } from 'redux-form';
import { StatusBar } from 'expo-status-bar';
//Notification
import LocalNotication from './src/components/Notification/LocalNotification';
// Keep the splash screen visible while we fetch resources
import { API_URL } from './src/utils/Config';
// SplashScreen.preventAutoHideAsync();
const rootReducer = combineReducers({
  store: productReducer,
  cart: cartReducer,
  order: orderReducer,
  auth: authReducer,
  fav: favoriteReducer,
  form: formReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(ReduxThunk)),
);
const LoadAssets = async () => {
  const imageAssets = Asset.loadAsync([
    require('./src/assets/Images/banner1.jpg'),
    require('./src/assets/Images/banner3.jpg'),
    require('./src/assets/Images/banner4.jpg'),
    require('./src/assets/Images/banner5.jpg'),
    require('./src/assets/Images/banner6.jpg'),
    require('./src/assets/Images/bg1.jpg'),
    require('./src/assets/Images/bg2.jpg'),
    require('./src/assets/Images/bg3.jpg'),
    require('./src/assets/Images/defaultprofile.jpg'),
    require('./src/assets/Images/flower3.jpg'),
    require('./src/assets/Images/logoNoText.png'),
    require('./src/assets/Images/logo1.png'),
    require('./src/assets/Images/logoTextWhite.png'),
    require('./src/assets/Images/slide1.png'),
    require('./src/assets/Images/slide2.png'),
    require('./src/assets/Images/slide3.png'),
    require('./src/assets/Images/social1.png'),
    require('./src/assets/Images/social2.png'),
    require('./src/assets/Images/social3.png'),
    require('./src/assets/Images/creditcards.png'),
    require('./src/assets/Images/faceid.png'),
  ]);
  const fetchFonts = Font.loadAsync({
    'Roboto-Bold': require('./src/assets/Fonts/Roboto-Bold.ttf'),
    'Roboto-BoldItalic': require('./src/assets/Fonts/Roboto-BoldItalic.ttf'),
    'Roboto-Italic': require('./src/assets/Fonts/Roboto-Italic.ttf'),
    'Roboto-LightItalic': require('./src/assets/Fonts/Roboto-LightItalic.ttf'),
    'Roboto-Medium': require('./src/assets/Fonts/Roboto-Medium.ttf'),
    'Roboto-MediumItalic': require('./src/assets/Fonts/Roboto-MediumItalic.ttf'),
    'Roboto-Regular': require('./src/assets/Fonts/Roboto-Regular.ttf'),
  });

  return await Promise.all([imageAssets, fetchFonts]);
};
export default function App() {
  // const [assetLoaded, setAssetLoaded] = useState(false);
  // if (!assetLoaded) {
  //   return (
  //     <AppLoading
  //       startAsync={LoadAssets}
  //       onFinish={() => setAssetLoaded(true)}
  //       onError={console.warn}
  //     />
  //   );
  // }
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // const fetchURL = async () => {
        //   const logged = await fetch(
        //     // `https://e-commerce-app-backend-g3jh.onrender.com/api/v1/user/login`,
        //     // `http://192.168.43.102:8080/api/v1/user/login`,
        //     `${API_URL}/user/login`,
        //     {
        //       headers: {
        //         Accept: 'application/json',
        //         'Content-Type': 'application/json',
        //       },
        //       method: 'POST',
        //       body: JSON.stringify({
        //         email: 'user10@gmail.com',
        //         password: '000000',
        //       }),
        //       //   JSON.stringify({
        //       //   email,
        //       //   password,
        //       //   // pushTokens: [pushToken],
        //       // }),
        //     },
        //   ).catch((error) => {
        //     console.log(error);
        //   });
        //     // .then((logged) => logged.json())
        //     // .then((posts) => console.log(posts));
        //   return logged;
        // };
        // const fetched = await fetchURL();
        // const fetchedJSON = await fetched.json();
        // console.log(fetchedJSON);
        // Pre-load fonts, make any API calls you need to do here
        await LoadAssets();
        // await SplashScreen.hideAsync();
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }
    if (!appIsReady) {
      prepare();
    }
  }, [appIsReady]);
  if (!appIsReady) {
    return null;
  }
  return (
    <Provider store={store}>
      <StatusBar />
      {/* <LocalNotication /> */}
      <AppNavigator />
    </Provider>
  );
}
