import React from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Text,
} from "react-native";
import Colors from "../../../utils/Colors";
import { Ionicons } from "@expo/vector-icons";
import PropTypes from "prop-types";
// import { Text } from "react-native-paper";

export default SearchItem = ({ item, navigation }) => {
  console.log(item);
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate("Detail", { item })}
        style={styles.btn}
      >
        <Ionicons name="ios-search" size={72} color={Colors.dark} />
        <Text variant="titleLarge" style={styles.name}>
          Ціна: {item.price}
        </Text>
        <Text variant="titleLarge" style={styles.name}>
          Посилання на веб-ресурс: {item.siteAddress}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

SearchItem.propTypes = {
  item: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light_grey,
    alignItems: "stretch",
  },
  name: {
    color: Colors.dark,
    textAlign: "center",
    marginBottom: 10,
  },
  btn: {
    alignItems: "center",
  },
});
