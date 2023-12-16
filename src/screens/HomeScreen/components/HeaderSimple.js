import React, { useEffect, useState, useRef, useCallback } from "react";
import {
  Dimensions,
  StyleSheet,
  View,
  FlatList,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  StatusBar,
  // Button,
  ScrollView,
  // TextInput,
} from "react-native";
import { Button } from "react-native-paper";
import Colors from "../../../utils/Colors";
import SearchItem from "./SearchItemSimple";
import { Text, TextInput } from "react-native-paper";
import { fetchProductByFabricOrOriginalId } from "../../../reducers";
import { useDispatch, useSelector } from "react-redux";
import HeaderTextExample from "./HeaderTextExample";
import BackButton from "./BackButton";
const { height, width } = Dimensions.get("window");

export const Header = ({ navigation }) => {
  const [keyword, setKeyword] = useState("");
  const [notFound, setNotFound] = useState(false);
  const dispatch = useDispatch();
  const products = useSelector((state) => state.store.pruductsByFabricId);
  const notFoundFromReduxStore = useSelector((state) => state.store.notFound);
  const loading = useSelector((state) => state.store.isLoading);
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
    <>
      {/* <BackButton navigation={navigation} /> */}
      <View style={styles.input_box}>
        <TextInput
          maxLength={20}
          autoFocus
          placeholder="Введіть код"
          value={keyword}
          onChangeText={(value) => setKeyword(value)}
          style={styles.input}
          mode="outlined"
          contentStyle={{}}
          outlineStyle={{ borderRadius: 12, borderColor: Colors.blue }}
        />
        <Button
          disabled={keyword.length < 5}
          onPress={() => onSubmit()}
          style={styles.button}
          mode="elevated"
          loading={loading}
        >
          <Text style={styles.text}>Знайти!</Text>
        </Button>
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
                nestedScrollEnabled={true}
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
    </>
  );
};

const styles = StyleSheet.create({
  flatList: {
    // height: height,
  },
  input_box: {
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: Colors.bluegreen,
  },
  input: {
    width: "90%",
    height: 80,
    fontSize: 36,
    margin: 8,
    backgroundColor: Colors.dark,
    color: Colors.white,
    textAlign: "center",
    padding: 4,
  },
  searchResultNotFound: {
    textAlign: "center",
    color: Colors.dark,
    padding: 4,
  },
  button: {
    marginTop: 16,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 6,
    paddingHorizontal: 32,
    borderRadius: 12,
    elevation: 3,
    backgroundColor: Colors.bg,
  },
  text: {
    fontSize: 32,
    lineHeight: 32,
    fontWeight: "bold",
    letterSpacing: 3,
    color: Colors.dark,
  },
});
