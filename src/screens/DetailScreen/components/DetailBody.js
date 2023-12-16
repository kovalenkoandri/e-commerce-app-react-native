import React from "react";
import { View, StyleSheet, Dimensions, Text } from "react-native";
//Animatable
import * as Animatable from "react-native-animatable";
//icon
import { AntDesign } from "@expo/vector-icons";
//import CustomText
import CustomText from "../../../components/UI/CustomText";
//Color
import Colors from "../../../utils/Colors";
//number format
import NumberFormat from "../../../components/UI/NumberFormat";
//PropTypes check
import PropTypes from "prop-types";
import { Formik } from "formik";
import { addOrderAvtoNova } from "../../../reducers";
import { useDispatch } from "react-redux";
import { TextInput, Button } from "react-native-paper";
import { MaskedTextInput } from "react-native-mask-text";
const { width, height } = Dimensions.get("window");

export const DetailBody = ({ item, color }) => {
  const dispatch = useDispatch();
  //action Add Order
  const addOrderAct = async ({ phone, quantity }) => {
    try {
      dispatch(
        addOrderAvtoNova(
          // token,
          // orderItems,
          // name,
          // total,
          // paymentMethod,
          // fullAddress,
          phone,
          quantity,
          item,
        ),
      );
    } catch (err) {
      alert(err);
    }
  };
  return (
    <View style={[styles.footer]}>
      {/* <Animatable.View 
        animation="lightSpeedIn"
        delay={1000}
        style={styles.footer_header}
      > 
      */}
      {/* <CustomText selectable={true} style={{ ...styles.title, color }}>
          Искомый код{" "}
          {item["Каталожный номер производителя"] !== "#NULL!" ||
          item["Оригинальный номер Идентификатор"]}
        </CustomText> */}
      {/* <NumberFormat
          style={{ color: '#fff', fontSize: 13 }}
          price={item.price}
          color={color}
        /> */}
      {/* </Animatable.View> */}
      <CustomText
        style={{
          ...styles.title,
          fontWeight: "500",
          marginTop: 20,
          marginBottom: 10,
          textDecorationLine: "underline",
        }}
      >
        Информація про товар
      </CustomText>
      <View style={{ flexDirection: "row", marginTop: 10 }}>
        <Animatable.View animation="bounceIn" delay={1600}>
          <AntDesign name="star" size={15} color={color} />
        </Animatable.View>
        <Animatable.View animation="bounceIn" delay={1700}>
          <AntDesign name="star" size={15} color={color} />
        </Animatable.View>
        <Animatable.View animation="bounceIn" delay={1800}>
          <AntDesign name="star" size={15} color={color} />
        </Animatable.View>
        <Animatable.View animation="bounceIn" delay={1900}>
          <AntDesign name="star" size={15} color={color} />
        </Animatable.View>
        <Animatable.View animation="bounceIn" delay={2000}>
          <AntDesign name="star" size={15} color={color} />
        </Animatable.View>
      </View>
      <Animatable.View
        animation="fadeInUpBig"
        delay={1000}
        style={styles.description}
      >
        <View style={styles.infoContainer}>
          <CustomText selectable={true} style={styles.infoText}>
            Оригінальний номер ідентифікатор:{" "}
            {item["Оригинальный номер - Идентификатор"]}
          </CustomText>
        </View>
        <View style={styles.infoContainer}>
          <CustomText selectable={true} style={styles.infoText}>
            Каталожний номер виробника: {item["Каталожный номер производителя"]}
          </CustomText>
        </View>
        <View style={styles.infoContainer}>
          <CustomText selectable={true} style={styles.infoText}>
            Виробник: {item["Производитель"]}
          </CustomText>
        </View>
        <View style={styles.infoContainer}>
          <CustomText selectable={true} style={styles.infoText}>
            Назва: {item["Наименование"]}
          </CustomText>
        </View>
        <View style={styles.infoContainer}>
          <CustomText selectable={true} style={styles.infoText}>
            Наявність шт: {item["Наличие шт"]}
          </CustomText>
        </View>
        <View style={styles.infoContainer}>
          <CustomText selectable={true} style={styles.infoText}>
            Ціна грн: {item["Цена спец"]}
          </CustomText>
        </View>
        {/* <CustomText
          style={{
            ...styles.title,
            textDecorationLine: "underline",
            fontWeight: "500",
            marginBottom: 10,
          }}
          >
          Depict
        </CustomText>
        <CustomText selectable={true} style={styles.detail}>
        {item.description}
        </CustomText> */}
      </Animatable.View>
      <Formik
        initialValues={{ phone: "", quantity: "1" }}
        onSubmit={(values) => addOrderAct(values)}
      >
        {({ handleChange, handleSubmit, values }) => (
          <View>
            <View style={styles.contactsContainer}>
              <CustomText selectable={true} style={styles.contactsLabel}>
                Залишити телефон в форматі 067-000-00-00
              </CustomText>
              <MaskedTextInput
                mask="999-999-99-99"
                onChangeText={(text, rawText) => {
                  values.phone=text;
                }}
                keyboardType="numeric"
                style={styles.contactsInput}
              />
              <CustomText selectable={true} style={styles.contactsLabel}>
                Кількість
              </CustomText>
              <TextInput
                onChangeText={handleChange("quantity")}
                value={values.quantity}
                style={styles.contactsInput}
                keyboardType="phone-pad"
              />
            </View>
            <Button
              mode="elevated"
              style={styles.button}
              onPress={handleSubmit}
            >
              <Text style={styles.btnText}>Надіслати</Text>
            </Button>
          </View>
        )}
      </Formik>
    </View>
  );
};

DetailBody.propTypes = {
  item: PropTypes.object.isRequired,
  color: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  footer: {
    width,
    backgroundColor: Colors.bluegreen,
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginBottom: 10,
    // marginTop: 200, // header disappears/appears
    borderRadius: 30,
  },
  footer_header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 17,
    color: Colors.dark,
  },
  detail: {
    fontSize: 15,
    lineHeight: 20,
  },

  price: {
    color: "#fff",
  },
  description: {
    marginTop: 10,
  },
  infoContainer: {
    marginBottom: 20,
    flexDirection: "row",
  },
  infoText: {
    fontSize: 24,
    lineHeight: 24,
    color: Colors.dark,
  },
  contactsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderColor: Colors.dark,
    borderWidth: 1,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: Colors.bluegreen,
    overflow: "hidden",
    padding: 12,
    borderRadius: 20,
  },
  contactsLabel: {
    fontSize: 25,
    lineHeight: 25,
  },
  contactsInput: {
    borderWidth: 1,
    width: "90%",
    height: 44,
    paddingHorizontal: 16,
    fontSize: 20,
    lineHeight: 20,
    margin: 8,
    backgroundColor: Colors.dark,
    color: Colors.white
  },
  button: {
    marginTop: 16,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 6,
    paddingHorizontal: 32,
    borderRadius: 20,
    elevation: 3,
    backgroundColor: Colors.bg,
  },
  btnText: {
    fontSize: 32,
    lineHeight: 32,
    fontWeight: "bold",
    letterSpacing: 3,
    color: Colors.dark,
  },
});
