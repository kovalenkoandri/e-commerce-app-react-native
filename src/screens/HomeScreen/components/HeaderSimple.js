import React from "react";
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
} from "react-native";
import Colors from "../../../utils/Colors";
import SearchItem from "./SearchItem";
import { Text } from "react-native-paper";
const { height } = Dimensions.get("window");

export class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: "",
      productsFilter: "",
    };
  }
  searchFilterFunction = (searchText) => {
    const dataCatalog = this.props.products.filter((product) =>
      product["Каталожный номер производителя"]
        .toLowerCase()
        .includes(searchText.toLowerCase().trim()),
    );
    const dataOriginal = this.props.products.filter((product) =>
      product["Оригинальный номер Идентификатор"]
        .toLowerCase()
        .includes(searchText.toLowerCase().trim()),
    );
    const resultData = () => {
      if (dataCatalog.length === 0) return dataOriginal;
      return dataCatalog;
    };
    this.setState({
      keyword: searchText,
      productsFilter: resultData(),
    });
  };

  render() {
    return (
      <>
        <View style={styles.input_box}>
          <TextInput
            maxLength={9}
            keyboardType="numeric"
            ref="input"
            placeholder="Введіть 9 цифр коду"
            clearButtonMode="always"
            value={this.state.keyword}
            onChangeText={(value) => this.searchFilterFunction(value)}
            style={styles.input}
          />
        </View>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          {this.state.keyword === "" ? (
            <View style={styles.image_placeholder_container}>
              <Text
                variant="headlineMedium"
                style={styles.image_placeholder_text}
              >
                Приклад: 713656100
              </Text>
              <Image
                source={require("../../../assets/Images/logo1.png")}
                style={styles.image_placeholder}
              />

              <Text
                variant="headlineMedium"
                style={styles.image_placeholder_text}
              >
                Пошук здійснюється по:{"\n"} 1. Каталожному номеру виробника.
                {"\n"} 2. Оригільному номеру ідентифікатору
              </Text>
            </View>
          ) : (
            <View
              style={{
                marginHorizontal: 20,
                marginTop:
                  Platform.OS === "android" ? 0 : height < 668 ? 0 : 60,
              }}
            >
              {this.state.productsFilter.length === 0 ? (
                <Text
                  variant="titleLarge"
                  style={styles.image_placeholder_text}
                >
                  За даним кодом товар не знайдено
                </Text>
              ) : (
                <FlatList
                  style={[styles.flatList]}
                  data={this.state.productsFilter}
                  keyExtractor={(item) => item._id}
                  renderItem={({ item }) => {
                    return (
                      <SearchItem
                        item={item}
                        navigation={this.props.navigation}
                      />
                    );
                  }}
                />
              )}
            </View>
          )}
        </TouchableWithoutFeedback>
      </>
    );
  }
}

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
    marginTop: 72,
  },
  image_placeholder_container: {
    flexDirection: "column",
    marginTop: 40,
    height: height,
  },
  image_placeholder: {
    height: 80,
    resizeMode: "contain",
    alignSelf: "center",
  },
  image_placeholder_text: {
    textAlign: "center",
    color: Colors.dark,
    padding: 20,
  },
});
