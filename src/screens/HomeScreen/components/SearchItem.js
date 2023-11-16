import React from "react";
import { View, Image, TouchableOpacity, StyleSheet } from "react-native";
import Colors from "../../../utils/Colors";
import { Ionicons } from "@expo/vector-icons";
//PropTypes check
import PropTypes from "prop-types";
import { Text } from "react-native-paper";

export default SearchItem = ({ item, navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate("Detail", { item })}
        style={styles.btn}
      >
        <Ionicons name="ios-search" size={72} color={Colors.dark} />
        {/* <Image style={styles.image} source={{ uri: item.thumb }} /> */}
      </TouchableOpacity>
      <Text
        variant="titleLarge"
        style={styles.name}
      >
        {item["Наименование"]}
      </Text>
    </View>
  );
};

SearchItem.propTypes = {
  item: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.light_grey,
    alignItems: "stretch",
    // flexDirection: "row-reverse",
    // height: 200 // for image
  },
  name: {
    color: Colors.dark,
    textAlign: "center",
    marginBottom: 10
  },
  btn: {
    alignItems: "center",
  },
  image: {
    height: 50,
    width: 70,
    resizeMode: "stretch",
    borderRadius: 10,
    marginRight: 30,
  },
});
