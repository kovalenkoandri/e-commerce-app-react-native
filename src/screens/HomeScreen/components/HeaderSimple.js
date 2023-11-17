import React from "react";
import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  Platform,
  // TextInput,
} from "react-native";
import Colors from "../../../utils/Colors";
import SearchItem from "./SearchItem";
// import { TextInput } from 'react-native-paper';
import { TextInput } from 'react-native-gesture-handler';
const { width, height } = Dimensions.get("window");

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
        <View style={[styles.input_box]}>
          <TextInput
            maxLength={9}
            keyboardType="numeric"
            ref="input"
            placeholder="Search for products"
            clearButtonMode="always"
            value={this.state.keyword}
            onChangeText={(value) => this.searchFilterFunction(value)}
            style={styles.input}
          />
        </View>
        <View style={[styles.content]}>
          <View style={styles.content_safe_area}>
            {this.state.keyword === "" ? (
              <View style={styles.image_placeholder_container}>
                <Image
                  source={require("../../../assets/Images/logo1.png")}
                  style={styles.image_placeholder}
                />
                <Text style={styles.image_placeholder_text}>
                  Enter keywords{"\n"}
                  to search for :D
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
                  <Text style={styles.image_placeholder_text}>
                    Product not found
                  </Text>
                ) : (
                  <FlatList
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
          </View>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  input_box: {
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.bluegreen,
    width: width,
  },

  input: {
    flex: 1,
    height: 40,
    backgroundColor: Colors.light_grey,
    borderRadius: 16,
    paddingHorizontal: 16,
    fontSize: 15,
    marginHorizontal: 20,
  },
  content: {
    // width: width, // if on => hide Home Screen FlatList
    // height: height, // if on => hide Home Screen FlatList
  },
  content_safe_area: {
    flex: 1,
    backgroundColor: Colors.bluegreen, // hide content_safe_area
  },
  image_placeholder_container: {
    flexDirection: "column",
    marginTop: 100,
  },
  image_placeholder: {
    height: 80,
    resizeMode: "contain",
    alignSelf: "center",
  },
  image_placeholder_text: {
    textAlign: "center",
    color: "gray",
    marginTop: 5,
  },
});
