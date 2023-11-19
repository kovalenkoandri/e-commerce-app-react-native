import React from "react";
import { View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import Colors from "../../utils/Colors";
import {
  Header,
} from "./components";
import Skeleton from "../../components/Loaders/SkeletonLoading";
import { Provider } from "react-native-paper";

export const HomeScreen = ({ navigation }) => {
  const products = useSelector((state) => state.store.products);
  const isLoading = useSelector((state) => state.store.isLoading);

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
