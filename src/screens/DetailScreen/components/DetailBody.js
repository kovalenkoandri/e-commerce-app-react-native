import React from "react";
import { View, StyleSheet, Dimensions, Button } from "react-native";
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
import { TextInput } from "react-native-paper";
const { width, height } = Dimensions.get("window");

export const DetailBody = ({ item, color }) => {
  const dispatch = useDispatch();
  //action Add Order
  const addOrderAct = async ({ phone }) => {
    try {
      await dispatch(
        addOrderAvtoNova(
          // token,
          // orderItems,
          // name,
          // total,
          // paymentMethod,
          // fullAddress,
          phone,
          item,
        ),
      );
    } catch (err) {
      alert(err);
    }
  };
  return (
    <View style={[styles.footer]}>
      <Animatable.View
        animation="lightSpeedIn"
        delay={1000}
        style={styles.footer_header}
      >
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
      </Animatable.View>
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
        <CustomText
          style={{
            ...styles.title,
            fontWeight: "500",
            marginTop: 20,
            marginBottom: 10,
            textDecorationLine: "underline",
          }}
        >
          Информация о товаре
        </CustomText>
        <View style={styles.infoContainer}>
          <CustomText selectable={true} style={styles.infoText}>
            Оригинальный номер - Идентификатор:{" "}
            {item["Оригинальный номер Идентификатор"]}
          </CustomText>
        </View>
        <View style={styles.infoContainer}>
          <CustomText selectable={true} style={styles.infoText}>
            Каталожный номер производителя:{" "}
            {item["Каталожный номер производителя"]}
          </CustomText>
        </View>
        <View style={styles.infoContainer}>
          <CustomText selectable={true} style={styles.infoText}>
            Производитель: {item["Производитель"]}
          </CustomText>
        </View>
        <View style={styles.infoContainer}>
          <CustomText selectable={true} style={styles.infoText}>
            Наименование: {item["Наименование"]}
          </CustomText>
        </View>
        <View style={styles.infoContainer}>
          <CustomText selectable={true} style={styles.infoText}>
            Наличие шт: {item["Наличие шт"]}
          </CustomText>
        </View>
        <View style={styles.infoContainer}>
          <CustomText selectable={true} style={styles.infoText}>
            Цена грн: {item["Цена Розница"]}
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
        initialValues={{ phone: "" }}
        onSubmit={(values) => addOrderAct(values)}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View>
            <View style={styles.telView}>
              <CustomText selectable={true} style={styles.telLabel}>
                Телефон
              </CustomText>
              <TextInput
                onChangeText={handleChange("phone")}
                onBlur={handleBlur("phone")}
                value={values.phone}
                style={styles.telInput}
                keyboardType="phone-pad"
              />
            </View>
            <Button onPress={handleSubmit} title="Submit" />
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
    backgroundColor: "#fff",
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
    color: Colors.text,
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
    fontSize: 20,
    lineHeight: 20,
  },
  telView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#000",
    borderWidth: 1,
  },
  telLabel: {
    fontSize: 25,
    lineHeight: 25,
  },
  telInput: {
    flex: 1,
    margin: 10,
    borderWidth: 1,
  },
});
