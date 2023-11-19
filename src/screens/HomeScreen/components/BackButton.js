import { StyleSheet, Text, View, TouchableOpacity, Button } from "react-native";
import React  from "react";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../../utils/Colors";
const BackButton = ({navigation}) => {
  return (
    <Button title="btn"
          onPress={() => {
              console.log(navigation.canGoBack());
              console.log(route);
              if (navigation.canGoBack()) {
                navigation.dispatch(StackActions.goBack());
              }
      }}
    >
      <Ionicons name="ios-arrow-back" size={60} color={Colors.dark} />
    </Button>
  );
};

export default BackButton;

const styles = StyleSheet.create({});
