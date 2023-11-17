import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../../reducers";
import Colors from "../../utils/Colors";
//Components
import {
  Header,
} from "./components";
import Skeleton from "../../components/Loaders/SkeletonLoading";
//FloatButton
import { Provider } from "react-native-paper";

export const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const products = useSelector((state) => state.store.products);
  const isLoading = useSelector((state) => state.store.isLoading);
  //fetch Api
  useEffect(() => {
    // AsyncStorage.removeItem("isFirstTime");
    const fetching = async () => {
      try {
        await dispatch(fetchProducts());
      } catch (err) {
        alert(err);
      }
    };
    fetching();
  }, [user.userid]);

  return (
    <Provider>
      {isLoading ? (
        <Skeleton />
      ) : (
        <View style={styles.container}>
          <Header navigation={navigation} products={products}></Header>
        </View>
      )}
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bluegreen,
  },
});
