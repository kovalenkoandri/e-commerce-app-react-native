import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
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
import { Button } from "react-native-paper";
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
  const [quantity, setQuantity] = useState(1);
  const [phone, setPhone] = useState("");
  const [isButtonActive, setButtonActive] = useState(true);
  const [hasButtonBeenPressed, setButtonPressed] = useState(false);

  const incrementQuantity = (values) => {
    setQuantity((prevQuantity) => {
      const newQuantity = prevQuantity + 1;
      values.quantity = newQuantity;
      return newQuantity; // Return the new state value
    });
  };

  const decrementQuantity = (values) => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => {
        const newQuantity = prevQuantity - 1;
        values.quantity = newQuantity;
        return newQuantity; // Return the new state value
      });
    }
  };
  const [windowHeight, setWindowHeight] = useState(height); // Initial height

  const handleInputFocus = () => {
    // Update the window height when the input is focused
    setWindowHeight(height + height * 0.35); // Adjust the height as needed
    console.log(windowHeight + " focus");
  };
  const handleInputQuantityFocus = () => {
    // Update the window height when the input is focused
    setWindowHeight(height + height * 0.3); // Adjust the height as needed
    console.log(windowHeight + " focus");
  };

  return (
    <View style={[styles.footer, { height: windowHeight + 50 }]}>
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
        {({ handleChange, handleSubmit, values }) => {
          const handleSubmitBtn = () => {
            // Your submission logic goes here
            handleSubmit();
            // Set the button to inactive
            setButtonActive(false);

            // Set hasButtonBeenPressed to true after the first press
            if (!hasButtonBeenPressed) {
              setButtonPressed(true);
            }
            // Reset the button to active after 5 seconds
            setTimeout(() => {
              setButtonActive(true);
              setButtonPressed(false);
              values.phone = "";
              setPhone("");
              values.quantity = "1";
              setQuantity(1);
            }, 5000);
          };
          return (
            <View>
              <Button
                mode="elevated"
                style={[
                  styles.button,
                  {
                    backgroundColor:
                      !isButtonActive || phone.length !== 13
                        ? Colors.grey
                        : Colors.bg,
                  },
                ]}
                onPress={handleSubmitBtn}
                disabled={!isButtonActive || phone.length !== 13}
              >
                <Text style={styles.btnText}>
                  {hasButtonBeenPressed ? "Відправлено" : "Надіслати"}
                </Text>
              </Button>
              <View style={styles.contactsContainer}>
                <CustomText selectable={true} style={styles.contactsLabel}>
                  Кількість
                </CustomText>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <TouchableOpacity onPress={() => decrementQuantity(values)}>
                    <Text style={styles.decBtn}>—</Text>
                  </TouchableOpacity>
                  <TextInput
                    style={styles.inputQuant}
                    value={quantity.toString()}
                    keyboardType="numeric"
                    onChangeText={(text) => {
                      setQuantity(parseInt(text, 10) || "");
                      values.quantity = text;
                    }}
                    onFocus={handleInputQuantityFocus}
                  />
                  <TouchableOpacity onPress={() => incrementQuantity(values)}>
                    <Text style={styles.incBtn}>+</Text>
                  </TouchableOpacity>
                </View>
                <CustomText selectable={true} style={styles.contactsLabel}>
                  Залишити телефон в форматі 067-000-00-00
                </CustomText>
                <MaskedTextInput
                  mask="999-999-99-99"
                  onChangeText={(text, rawText) => {
                    values.phone = text;
                    setPhone(text);
                  }}
                  onFocus={handleInputFocus}
                  keyboardType="numeric"
                  style={styles.contactsInput}
                />
              </View>
            </View>
          );
        }}
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
    // height,
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
    width: "90%",
    fontSize: 36,
    margin: 8,
    backgroundColor: Colors.dark,
    color: Colors.white,
    borderRadius: 8,
    textAlign: "center",
    padding: 4,
  },
  inputQuant: {
    color: Colors.white,
    backgroundColor: Colors.dark,
    margin: 8,
    borderRadius: 8,
    fontSize: 36,
    padding: 4,
    width: 150,
    textAlign: "center",
  },
  decBtn: { fontSize: 44, color: Colors.dark, marginRight: 10 },
  incBtn: { fontSize: 44, color: Colors.dark, marginLeft: 10 },
  button: {
    marginBottom: 16,
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
