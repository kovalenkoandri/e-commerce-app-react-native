import { StyleSheet, View, Image, ScrollView } from "react-native";
import { Text } from "react-native-paper";
import Colors from "../../../utils/Colors";
import React from "react";

const HeaderTextExample = ({ children }) => {
  return (
    <ScrollView style={styles.searchResultContainer}>
      {children}
      <Text
        variant="headlineMedium"
        selectable={true}
        style={styles.searchResultExampleText}
      >
        Приклади:{"\n"} 712550710{"\n"} 713501400{"\n"} 713566600
      </Text>
      <Text variant="headlineMedium" style={styles.searchResultExampleText}>
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
  },
});
