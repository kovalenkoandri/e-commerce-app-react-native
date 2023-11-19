import React, { useEffect, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  View,
  Image,
  FlatList,
  Platform,
  Keyboard,
  TextInput,
  TouchableWithoutFeedback,
  StatusBar,
  Button,
  ScrollView,
} from "react-native";
import Colors from "../../../utils/Colors";
import SearchItem from "./SearchItemSimple";
import { Text } from "react-native-paper";
import { fetchProductByFabricOrOriginalId } from "../../../reducers";
import { useDispatch, useSelector } from "react-redux";
const { height } = Dimensions.get("window");

export const Header = ({ navigation }) => {
  const [keyword, setKeyword] = useState("");
  const [notFound, setNotFound] = useState(false);
  const dispatch = useDispatch();
  const products = useSelector((state) => state.store.pruductsByFabricId);
  const notFoundFromReduxStore = useSelector((state) => state.store.notFound);
  useEffect(() => {
    setNotFound(notFoundFromReduxStore);
  }, [notFoundFromReduxStore]);

  const onSubmit = () => {
    try {
      dispatch(fetchProductByFabricOrOriginalId(keyword));
    } catch (err) {
      alert(err);
    }
  };
  return (
    <ScrollView>
      <View style={styles.input_box}>
        <TextInput
          maxLength={9}
          // ref="input"
          placeholder="Введіть 9 цифр коду"
          clearButtonMode="always"
          value={keyword}
          onChangeText={(value) => setKeyword(value)}
          style={styles.input}
        />
      </View>
      <Button
        title="Знайти!"
        disabled={keyword.length !== 9}
        onPress={() => onSubmit()}
      />
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {products.length === 0 && !notFound ? (
          <View style={styles.searchResultContainer}>
            <Text
              variant="headlineMedium"
              selectable={true}
              style={styles.searchResultExampleText}
            >
              Приклад: 713656100
            </Text>
            <Image
              source={require("../../../assets/Images/logo1.png")}
              style={styles.searchResultImageBrand}
            />

            <Text
              variant="headlineMedium"
              style={styles.searchResultExampleText}
            >
              Пошук здійснюється по:{"\n"} 1. Каталожному номеру виробника.
              {"\n"} 2. Оригільному номеру ідентифікатору
            </Text>
          </View>
        ) : (
          <View
            style={{
              marginHorizontal: 20,
              marginTop: Platform.OS === "android" ? 0 : height < 668 ? 0 : 60,
            }}
          >
            {notFound ? (
              <>
                <Text
                  variant="headlineMedium"
                  style={styles.searchResultNotFound}
                >
                  За даним кодом товар не знайдено
                </Text>
                <Text
                  variant="headlineMedium"
                  selectable={true}
                  style={styles.searchResultExampleText}
                >
                  Приклад: 713656100
                </Text>
                <Image
                  source={require("../../../assets/Images/logo1.png")}
                  style={styles.searchResultImageBrand}
                />

                <Text
                  variant="headlineMedium"
                  style={styles.searchResultExampleText}
                >
                  Пошук здійснюється по:{"\n"} 1. Каталожному номеру виробника.
                  {"\n"} 2. Оригільному номеру ідентифікатору
                </Text>
              </>
            ) : (
              <FlatList
                style={styles.flatList}
                data={products}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => {
                  return <SearchItem item={item} navigation={navigation} />;
                }}
              />
            )}
          </View>
        )}
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  flatList: {
    height: height,
  },
  input_box: {
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.bluegreen,
  },
  input: {
    flex: 1,
    height: 64,
    backgroundColor: Colors.light_grey,
    borderRadius: 16,
    paddingHorizontal: 16,
    fontSize: 32,
    marginHorizontal: 20,
    marginTop: StatusBar.currentHeight + 16,
  },
  searchResultContainer: {
    flexDirection: "column",
    marginTop: 40,
    height: height,
  },
  searchResultImageBrand: {
    height: 80,
    resizeMode: "contain",
    alignSelf: "center",
  },
  searchResultExampleText: {
    textAlign: "center",
    color: Colors.dark,
    padding: 20,
  },
  searchResultNotFound: {
    textAlign: "center",
    marginTop: StatusBar.currentHeight + 16,
    color: Colors.dark,
    padding: 20,
  },
});
