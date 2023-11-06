import React, { useState } from "react";
import { View, StyleSheet, TextInput, Image, Platform } from "react-native";
import { BlurView } from "expo-blur";
import { Entypo } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import CustomText from "../../../components/UI/CustomText";
import Colors from "../../../utils/Colors";
import comments from "../../../db/Comments";
import UserComment from "./UserComment";

export const Comments = () => {
  const user = useSelector((state) => state.auth.user);
  const [textComment, setTextComment] = useState("");

  return (
    <>
      <View style={styles.commentContainer}>
        <CustomText style={styles.title}>Comments</CustomText>
        <CustomText style={styles.commentCount}>{comments.length}</CustomText>
      </View>
      <View style={styles.contentContainer}>
        {Object.keys(user).length === 0 ? (
          <></>
        ) : (
          <View style={styles.inputContainer}>
            <View style={styles.profileContainer}>
              <Image
                style={styles.profilePic}
                source={
                  user.profilePicture.length === 0
                    ? require("../../../assets/Images/defaultprofile.jpg")
                    : { uri: user.profilePicture }
                }
              />
            </View>
            <View
              style={{
                justifyContent: "center",
                width: "75%",
              }}
            >
              <BlurView tint="dark" intensity={10} style={styles.inputBlur}>
                <TextInput
                  placeholder="Add a public comment..."
                  style={{ width: "100%" }}
                  onChangeText={(text) => setTextComment(text)}
                />
              </BlurView>
            </View>

            <View
              style={{
                justifyContent: "center",
              }}
            >
              <Entypo
                name="paper-plane"
                size={25}
                color={textComment.length === 0 ? Colors.grey : Colors.blue}
              />
            </View>
          </View>
        )}
        {comments.map((comment) => (
          <UserComment key={comment.id} comment={comment} />
        ))}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  commentContainer: {
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: Colors.light_grey,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
  },
  commentCount: {
    fontSize: 15,
    marginHorizontal: 15,
    color: Colors.grey,
  },
  contentContainer: {
    marginHorizontal: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-between",
    height: 60,
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light_grey,
  },
  inputBlur: {
    height: 40,
    justifyContent: "center",
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  profileContainer: {
    justifyContent: "center",
  },
  profilePic: {
    resizeMode: Platform.OS === "android" ? "cover" : "contain",
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});
