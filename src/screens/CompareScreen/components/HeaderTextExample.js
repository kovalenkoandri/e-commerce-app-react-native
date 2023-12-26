import { StyleSheet, View, Image, ScrollView } from "react-native";
import { Text } from "react-native";
import Colors from "../../../utils/Colors";
import React from "react";

const HeaderTextExample = ({ children }) => {
  return (
    <ScrollView style={styles.searchResultContainer}>
      {children}
      <Text
        selectable={true}
        style={styles.searchResultExampleText}
      >
        Приклади:{"\n"} karcher wd 3{"\n"} 713501400{"\n"} 713566600
      </Text>
      <Text style={styles.searchResultExampleText}>
        Пошук здійснюється по:{"\n"} 1. Каталожному номеру виробника.
        {"\n"} 2. Оригільному номеру ідентифікатору
      </Text>
    </ScrollView>
  );
};

export default HeaderTextExample;

const styles = StyleSheet.create({
  searchResultContainer: {
    marginTop: 4,
  },
  searchResultExampleText: {
    textAlign: "center",
    color: Colors.dark,
    padding: 12,
    fontSize: 32
  },
});
