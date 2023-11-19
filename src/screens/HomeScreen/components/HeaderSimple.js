import React, { useEffect, useState, useRef } from "react";
import {
  Dimensions,
  StyleSheet,
  View,
  FlatList,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  StatusBar,
  Button,
  ScrollView,
} from "react-native";
import Colors from "../../../utils/Colors";
import SearchItem from "./SearchItemSimple";
import { Text, TextInput } from "react-native-paper";
import { fetchProductByFabricOrOriginalId } from "../../../reducers";
import { useDispatch, useSelector } from "react-redux";
import HeaderTextExample from "./HeaderTextExample";
import BackButton from "./BackButton";
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
      dispatch(fetchProductByFabricOrOriginalId(keyword.trim()));
    } catch (err) {
      alert(err);
    }
  };
  return (
    <View>
      <BackButton navigation={navigation} />
      <View style={styles.input_box}>
        <TextInput
          maxLength={20}
          autoFocus
          placeholder="Введіть код"
          clearButtonMode="always"
          value={keyword}
          onChangeText={(value) => setKeyword(value)}
          style={styles.input}
          mode="outlined"
        />
        <Button
          title="Знайти!"
          disabled={keyword.length < 5}
          onPress={() => onSubmit()}
        />
      </View>

      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {products.length === 0 && !notFound ? (
          <HeaderTextExample />
        ) : (
          <View
            style={{
              marginHorizontal: 20,
              marginTop: Platform.OS === "android" ? 0 : height < 668 ? 0 : 60,
            }}
          >
            {notFound ? (
              <HeaderTextExample>
                <Text
                  variant="headlineMedium"
                  style={styles.searchResultNotFound}
                >
                  За даним кодом товар не знайдено
                </Text>
              </HeaderTextExample>
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
    </View>
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
  searchResultNotFound: {
    textAlign: "center",
    marginTop: StatusBar.currentHeight + 16,
    color: Colors.dark,
    padding: 20,
  },
});
