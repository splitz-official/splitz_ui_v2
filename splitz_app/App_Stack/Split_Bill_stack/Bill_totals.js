import {
  ActivityIndicator,
  FlatList,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { scale, verticalScale } from "react-native-size-matters";
import { RFValue } from "react-native-responsive-fontsize";

import { useAxios } from "../../../Axios/axiosContext";
import Screen from "../../../Components/Screen";
import Back_button from "../../../Components/Back_button";
import Colors from "../../../Config/Colors";
import Large_green_button from "../../../Components/Large_green_button";
import User_total_list_item from "./Components/User_total_list_item";

const Bill_totals = () => {
  const { axiosInstance, userData } = useAxios();
  const navigation = useNavigation();
  const route = useRoute();
  const { room_code = null, receipt_id } = route.params;
  const userID = userData.id;
  // const userID = 2;
  const [owner, setOwner] = useState(false);
  const [editingName, setEditingName] = useState(false);
  const [receiptname, setReceiptName] = useState("");
  const [receipt, setReceipt] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [tax, setTax] = useState(0);
  const [tip, setTip] = useState(0);
  const [total, setTotal] = useState("");
  const [receiptSubTotal, setReceiptSubTotal] = useState(0);
  const [userCost, setUserCost] = useState(0);
  const initialNameRef = useRef();
  const [activeUsers, setActiveUsers] = useState([]);
  const [activeusers_and_costs, setActiveUsers_and_Costs] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const fetchReceipt = async () => {
        if (!receipt_id) {
          console.log("Missing parameters: room_code or receipt_id");
          return;
        }

        setLoading(true);
        try {
          console.log("Fetching receipt data");
          const response = await (room_code
            ? axiosInstance.get(`/receipts/${room_code}/receipt/${receipt_id}`)
            : axiosInstance.get(`/receipts/receipt/${receipt_id}`));
          // console.log(response.data.owner_id);
          const userSelectedItems = response.data.items
            .filter((item) => item.users.find((user) => user.id === userID))
            .map((item) => item.id);

          const Receipt_subTotal = response.data.items.reduce((acc, item) => {
            return acc + item.item_cost * item.item_quantity;
          }, 0);
          console.log(response.data);
          setReceiptSubTotal(Receipt_subTotal);
          setOwner(response.data.owner_id === userID);
          setReceipt(response.data);
          setSelectedItems(userSelectedItems);
          setTax(response.data.tax_amount);
          setTip(response.data.tip_amount);
          setTotal(
            calculateBillTotal(
              response.data.items,
              response.data.tip_amount,
              response.data.tax_amount
            )
          );
          initialNameRef.current = response.data.receipt_name;
          setReceiptName(response.data.receipt_name);
          calculateUserTotals(
            response.data.items,
            response.data.tax_amount,
            response.data.tip_amount,
            Receipt_subTotal
          );
          setLoading(false);
        } catch (error) {
          // console.log("Error fetching receipt details: ", error);
          setLoading(false);
        }
        // console.log("Selected Items: ", selectedItems) this doesn't update in time before the variable is set so ignore first initial result
      };
      fetchReceipt();
    }, [])
  );

  const calculateBillTotal = (items, tip, tax) => {
    const itemsTotal = items.reduce((acc, item) => {
      const itemCost = parseFloat(item.item_cost);
      if (isNaN(itemCost)) {
        console.log("Invalid item cost:", item.item_cost);
        return acc;
      }
      return acc + itemCost;
    }, 0);

    // console.log("Raw Tip:", tip);
    // console.log("Raw Tax:", tax);

    const tipAmount = parseFloat(tip);
    const taxAmount = parseFloat(tax);

    console.log("Tax:", taxAmount);
    console.log("Tip:", tipAmount);

    if (isNaN(tipAmount)) {
      console.log("Invalid tip amount:", tip);
    }
    if (isNaN(taxAmount)) {
      console.log("Invalid tax amount:", tax);
    }

    const total =
      itemsTotal +
      (isNaN(tipAmount) ? 0 : tipAmount) +
      (isNaN(taxAmount) ? 0 : taxAmount);
    return total.toFixed(2);
  };

  function First_last_initial(fullName) {
    if (!fullName) {
      return;
    }
    const parts = fullName.trim().split(" ");
    if (parts.length === 1) {
      return parts[0];
    } else {
      const firstName = parts[0];
      const lastNameInitial = parts[1].charAt(0);
      return `${firstName} ${lastNameInitial}.`;
    }
  }

  const calculateUserTotals = (items, taxAmount, tipAmount, subTotal) => {
    const userCosts = new Map();
    const totalTaxAndTip = taxAmount + tipAmount;
    console.log(taxAmount, tipAmount, subTotal, totalTaxAndTip);

    items.forEach((item) => {
      const pricePerUser =
        (item.item_cost * item.item_quantity) / (item.users.length || 1);
      item.users.forEach((user) => {
        if (!userCosts.has(user.id)) {
          userCosts.set(user.id, {
            name: user.name,
            username: user.username,
            id: user.id,
            subtotal: 0,
            totalCost: 0,
            items: [],
            tax_tip: 0,
          });
        }
        let currentUser = userCosts.get(user.id);
        currentUser.subtotal += pricePerUser;
        currentUser.items.push({
          ...item,
          pricePerUser: pricePerUser.toFixed(2),
        });
      });
    });

    userCosts.forEach((user) => {
      // const userSubtotal = user.subtotal;
      const taxTipProportion =
        totalTaxAndTip === 0 ? 0 : (user.subtotal / subTotal) * totalTaxAndTip;
      // console.log(typeof userSubtotal, typeof subTotal, typeof taxTipProportion)
      user.tax_tip = taxTipProportion.toFixed(2);
      user.totalCost = (user.subtotal + taxTipProportion).toFixed(2);
    });

    const userCost_array = Array.from(userCosts.values());
    setActiveUsers_and_Costs(userCost_array);
    userCost_array.forEach(
      user => console.log(user.items)
    )
    console.log(userCost_array);
  };

  const handleReceiptRename = async () => {
    if (receiptname !== initialNameRef.current) {
      console.log("names are different: ", receiptname);
      await axiosInstance
        .put(`/receipts/${room_code}/rename-receipt/${receipt_id}`, {
          receipt_name: receiptname,
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      console.log("names are same");
    }
  };

  if (loading) {
    return (
      <View style={styles.loading_container}>
        <ActivityIndicator size={"large"} color={Colors.primary} />
        <Text style={styles.loading_text}>Getting receipt data!</Text>
      </View>
    );
  }

  return (
    <Screen>
      <Back_button
        title={room_code ? "Group" : "Home"}
        onPress={() => {
          if (room_code) {
            navigation.navigate("Groups_details", { room_code: room_code });
            // navigation.goBack();
          } else {
            navigation.navigate("home");
          }
        }}
      />
      <KeyboardAvoidingView behavior="height" style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <TextInput
              style={styles.receipt_name}
              value={receiptname}
              onFocus={() => setEditingName(true)}
              onBlur={() => setEditingName(false)}
              onChangeText={setReceiptName}
              placeholder="Name this bill!"
              placeholderTextColor={Colors.textInputPlaceholder}
              autoFocus={false}
              clearButtonMode="while-editing"
              readOnly={!room_code}
            />
            <View style={styles.top_total_container}>
              <Text style={styles.top_total_text}>{total}</Text>
              <Text style={[styles.top_total_text, { fontSize: RFValue(12) }]}>
                Bill Total
              </Text>
            </View>
            <View style={styles.list_container}>
              {activeusers_and_costs.length > 0 ? (
                <Text style={styles.list_message}>
                  Totals below include proportional tax and tip
                </Text>
              ) : null}
              <FlatList
                data={activeusers_and_costs}
                // style={{borderWidth: 1}}
                contentContainerStyle={{ flexGrow: 1 }}
                keyExtractor={(item) => item.id.toString()}
                ListEmptyComponent={
                  <>
                    <Image
                      style={{ width: "100%", height: "100%" }}
                      source={require("../../../assets/Lookin_empty.png")}
                      resizeMode="contain"
                    />
                  </>
                }
                renderItem={({ item }) => (
                  <User_total_list_item
                    name={
                      item.id === userID ? "You" : First_last_initial(item.name)
                    }
                    first_letter={item.name.trim()[0]}
                    price={item.totalCost}
                    items={item.items}
                    tax_tip={item.tax_tip}
                  />
                )}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
        {(room_code || owner) &&
          (editingName ? (
            <Large_green_button
              title={"Confirm Name"}
              onPress={() => {
                handleReceiptRename();
                Keyboard.dismiss();
              }}
            />
          ) : room_code ? (
            <Large_green_button
              title={"Select your items"}
              onPress={() =>
                navigation.navigate("Receipt_items", {
                  room_code: room_code,
                  receipt_id: receipt_id,
                })
              }
            />
          ) : (
            <Large_green_button
              title={"Assign items"}
              onPress={() =>
                navigation.navigate("Quick_split", {
                  receipt_id: receipt_id,
                })
              }
            />
          ))}
      </KeyboardAvoidingView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: "6%",
  },
  receipt_name: {
    borderBottomWidth: 3,
    borderBottomColor: Colors.primary,
    fontFamily: "DMSans_700Bold",
    color: Colors.primary,
    fontSize: RFValue(18),
    marginTop: "10%",
  },
  top_total_container: {
    alignItems: "center",
    marginTop: "8%",
    // borderWidth: 1,
  },
  top_total_text: {
    fontFamily: "DMSans_700Bold",
    fontSize: RFValue(24),
  },
  list_container: {
    // borderWidth: 1,
    marginTop: "8%",
    height: verticalScale(360),
  },
  loading_container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: "transparent",
    // borderWidth: 1
  },
  loading_text: {
    fontFamily: "DMSans_700Bold",
    marginTop: scale(10),
    color: Colors.primary,
    fontSize: RFValue(16),
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    width: "80%",
    textAlign: "center",
    // borderWidth: 1
  },
  list_message: {
    fontFamily: "DMSans_400Regular",
    fontSize: RFValue(8),
    textAlign: "center",
    color: Colors.textgray,
    // borderWidth: 1,
  },
});

export default Bill_totals;
