import {
  ActivityIndicator,
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Alert,
  Modal,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { scale, verticalScale } from "react-native-size-matters";
import * as Haptics from "expo-haptics";
import Toast from "react-native-toast-message";

import Screen from "../../../Components/Screen";
import Colors from "../../../Config/Colors";
import Receipt_items_list_component from "./Components/Receipt_items_list_component";
import Back_button from "../../../Components/Back_button";
import Large_green_button from "../../../Components/Large_green_button";
import { useAxios } from "../../../Axios/axiosContext";
import Receipt_add_item from "./Components/Receipt_add_item";
import Profile_picture from "../../../Components/Profile_picture";
import { Bold700Text, Medium500Text } from "../../../Config/AppText";

//add item endpoint and rename receipt endpoint

const Receipt_items = () => {
  const { axiosInstance, userData } = useAxios();
  const navigation = useNavigation();
  const route = useRoute();
  const { receipt_id } = route.params;
  const userID = userData.id;
  const [receipt, setReceipt] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(route.params?.editing ?? false);
  const [addingItem, setAddingItem] = useState(false);
  // const [selectedItems, setSelectedItems] = useState([]);
  const [owner, setOwner] = useState(false);

  const [tax, setTax] = useState("");
  const [tip, setTip] = useState("");
  const [total, setTotal] = useState("");
  const [receiptname, setReceiptName] = useState("");
  const [userCost, setUserCost] = useState(0);
  const initialNameRef = useRef();
  const [editingName, setEditingName] = useState(false);

  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [itemsWithSelections, setItemsWithSelections] = useState(new Map());

  const [itemName, setItemName] = useState("");
  const [itemQuantity, setItemQuantity] = useState("1");
  const [itemPrice, setItemPrice] = useState("");

  const fetchReceipt = async () => {
    if (!receipt_id) {
      console.log("Missing parameters: receipt_id");
      return;
    }

    setLoading(true);
    try {
      // console.log("Fetching receipt data")
      const response = await axiosInstance.get(
        `/receipts/receipt/${receipt_id}`
      );
      // console.log(response.data.items[0].users);
      console.log(response.data);

      // const userSelectedItems = response.data.items
      // .filter(item => item.users.find(user => user.id === userID))
      // .map(item => item.id);

      const newItemsWithSelections = new Map();

      // response.data.items.forEach(item => {
      //   newItemsWithSelections.set(item.id, { ...item, selectedBy: [] });
      // });

      response.data.items.forEach((item) => {
        const selectedBy = item.users.map((user) => user);
        newItemsWithSelections.set(item.id, { ...item, selectedBy });
      });
      // console.log(newItemsWithSelections);
      setItemsWithSelections(newItemsWithSelections);

      setUsers(response.data.users);
      setReceipt(response.data);

      // setSelectedItems(userSelectedItems);
      setTax(response.data.tax_amount);
      setTip(response.data.tip_amount);
      setTotal(response.data.total_amount);
      initialNameRef.current = response.data.receipt_name;
      setReceiptName(response.data.receipt_name);
      setLoading(false);
    } catch (error) {
      console.log("fetchReceipt Error: ", error.response.data);
      setLoading(false);
    }
    // console.log("Selected Items: ", selectedItems)
  };

  useEffect(() => {
    fetchReceipt();
  }, []);

  const calculateTotal = () => {
    let totalCost = 0;

    if (selectedUser && itemsWithSelections.size > 0) {
      itemsWithSelections.forEach((item) => {
        if (item.selectedBy.find((user) => user.id === selectedUser.id)) {
          let numUsers = item.selectedBy.length;
          // console.log(numUsers);
          const itemTotalCost =
            (item.item_cost * item.item_quantity) / numUsers;
          totalCost += itemTotalCost;
        }
      });
    }

    setUserCost(totalCost.toFixed(2));
  };

  useEffect(() => {
    calculateTotal();
  }, [selectedUser, itemsWithSelections]);

  const handleSelectItem = (itemId) => {
    if (!selectedUser) return; //is this needed since user cant click on items unless a user is selected think about taking out a;ljdklfj
    // console.log(itemsWithSelections);

    setItemsWithSelections((prevItems) => {
      const newItems = new Map(prevItems);
      const item = newItems.get(itemId);

      if (item) {
        const isSelected = item.selectedBy.some(
          (user) => user.id === selectedUser.id
        );
        const newSelectedBy = isSelected
          ? item.selectedBy.filter((user) => user.id !== selectedUser.id)
          : [...item.selectedBy, selectedUser];

        newItems.set(itemId, {
          ...item,
          selectedBy: newSelectedBy,
        });
      }
      // console.log(newItems);
      return newItems;
    });
  };

  const assignItemsToUsers = async () => {
    console.log("assign is working");
    let promises = [];
    console.log("Users Array:", users);
    console.log("Items With Selections Map:", itemsWithSelections);

    users.forEach((user) => {
      console.log("Checking user:", user.id);
      const itemsSelectedByUser = Array.from(itemsWithSelections.entries())
        .filter(([id, item]) => {
          console.log("Item ID:", id, "Selected By:", item.selectedBy);
          return item.selectedBy.some(
            (selectedUser) => selectedUser.id === user.id
          );
        })
        .map(([id, item]) => id);

      console.log("Items selected by user", user.id, ":", itemsSelectedByUser);

      if (itemsSelectedByUser.length > 0) {
        promises.push(
          axiosInstance.post(`/receipts/assign-items/${receipt_id}`, {
            user_id: user.id,
            item_id_list: itemsSelectedByUser,
            user_total_cost: 1,
          })
        );
      }
    });

    // console.log("Promises to execute:", promises);
    try {
      await Promise.all(promises).then((results) => {
        // console.log("Promise results: ", results)
        Toast.show({
          topOffset: verticalScale(45),
          type: "success",
          text1: "Item Assigned successfully",
        });
      });
    } catch (error) {
      Toast.show({
        topOffset: verticalScale(45),
        type: "error",
        text1: "Failed to update item assignments",
        text2: error.message,
      });
    }
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
  const deleteItem = async (item_id) => {
    console.log("item_id", item_id);
    await axiosInstance
      .post(`/receipts/delete-item/${receipt_id}/${item_id}`)
      .then((response) => {
        Toast.show({
          type: "success",
          text1: "Item Deleted",
          position: "top",
          topOffset: verticalScale(45),
          autoHide: true,
          visibilityTime: 2000,
        });
        fetchReceipt();
      })
      .catch((error) => {
        console.error('Error Data:', error.response.data);
        console.error('Error Status:', error.response.status);
        console.error('Error Headers:', error.response.headers);
      });
  }
  const addItems = async () => {
    console.log(itemName, itemQuantity, itemPrice)
    if (
      itemName.trim() === "" ||
      itemPrice.trim() === "" ||
      itemQuantity.trim() === ""
    ) {
      Alert.alert("Please fill in all fields");
      return;
    }
    const newItem = {
      item_name: itemName,
      item_quantity: parseInt(itemQuantity),
      item_price: parseFloat(itemPrice),
      add_item_price_to_total: true,
    };
    await axiosInstance
      .post(`/receipts/add-item/${receipt_id}`, [newItem])
      .then((response) => {
        Toast.show({
          type: "success",
          text1: "Item Added Successfully",
          position: "top",
          topOffset: verticalScale(45),
          autoHide: true,
          visibilityTime: 2000,
        });
        setItemName("");
        setItemQuantity("1");
        setItemPrice("");
        setAddingItem(false);
        fetchReceipt();
      })
      .catch((error) => {
        console.error('Error Data:', error.response.data);
        console.error('Error Status:', error.response.status);
        console.error('Error Headers:', error.response.headers);
      });
  };

  const handleReceiptRename = async () => {
    if (receiptname !== initialNameRef.current) {
      console.log("names are different: ", receiptname);
      const response = await axiosInstance.put(
        `/receipts/rename-receipt/${receipt_id}`,
        {
          receipt_name: receiptname,
        }
      );
      // console.log(response);
    } else {
      console.log("names are same");
    }
  };

  confirmSelectedItems = () => {
    // console.log(itemsWithSelections);
    assignItemsToUsers();
    setSelectedUser(null);
    navigation.navigate("Bill_totals", {
      receipt_id: receipt_id,
    });
  };

  const handlePriceChange = (text) => {
    if (/^\d*\.?\d{0,2}$/.test(text)) {
      setItemPrice(text);
    }
  };

  function sameArrays(arr1, arr2) {
    const set1 = new Set(arr1);
    const set2 = new Set(arr2);
    if (set1.size !== set2.size) return false;
    for (let item of set1) {
      if (!set2.has(item)) return false;
    }
    return true;
  }

  //refresh on navigation ADD IN FUTURE
  if (loading) {
    return (
      <View style={styles.loading_container}>
        <ActivityIndicator size={"large"} color={Colors.primary} />
        <Bold700Text style={styles.loading_text}>
          Getting receipt data!
        </Bold700Text>
      </View>
    );
  }

  return (
    <Screen>
      <Back_button
        title={"Home"}
        onPress={() => {
          navigation.navigate("home");
        }}
        children={
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.edit_done}
            onPress={() => {
              if (editing) {
                setEditing(false);
                setAddingItem(false);
                Haptics.selectionAsync();
              } else {
                setEditing(true);
                Haptics.selectionAsync();
              }
            }}
          >
            <Medium500Text style={styles.edit_done_text}>
              {editing ? "Done" : "Edit items"}
            </Medium500Text>
          </TouchableOpacity>
        }
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
              readOnly={true}
            />
            <View
              style={{
                marginTop: "5%",
                justifyContent: "flex-start",
                flexDirection: "row",
              }}
            >
              <FlatList
                data={users}
                keyExtractor={(item) => item.id.toString()}
                horizontal={true}
                style={{ height: verticalScale(110) }}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                  <>
                    <TouchableOpacity
                      style={[
                        styles.user,
                        selectedUser === item ? styles.selected : {},
                      ]}
                      activeOpacity={0.7}
                      onPress={() =>
                        setSelectedUser((prev) => (prev === item ? null : item))
                      }
                    >
                      <Profile_picture
                        name={userData.id === item.id ? "You" : item.name}
                        image={item.profile_picture_url}
                        sizing_style={{
                          height: scale(60),
                          width: scale(60),
                          borderWidth: 1,
                          borderColor: Colors.primary,
                        }}
                        text_sizing={{ fontSize: RFValue(24) }}
                      />
                      <Medium500Text
                        style={{
                          fontSize: RFValue(12),
                          marginTop: verticalScale(2),
                        }}
                      >
                        {First_last_initial(
                          userData.id === item.id ? "You" : item.name
                        )}
                      </Medium500Text>
                    </TouchableOpacity>
                  </>
                )}
              />
            </View>
            <View style={[styles.items_container]}>
              <FlatList
                data={Array.from(itemsWithSelections.values())}
                keyExtractor={(item) => item.id.toString()}
                showsVerticalScrollIndicator={false}
                horizontal={false}
                contentContainerStyle={{ justifyContent: "center" }}
                renderItem={({ item }) => (
                  <Receipt_items_list_component
                    name={item.item_name}
                    quick={true}
                    quantity={`(${item.item_quantity})`}
                    // price={item.item_cost * item.item_quantity}
                    price={(item.item_cost * item.item_quantity)
                      .toFixed(2)
                      .toString()}
                    readOnly={!editing}
                    deleteItem={() => deleteItem(item.id)}
                    onPress={() => {
                      if (!selectedUser && !editing) {
                        Toast.show({
                          type: "error",
                          text1: "Please select a user first",
                          position: "top",
                          topOffset: verticalScale(45),
                          autoHide: true,
                          visibilityTime: 1500,
                        });
                      } else if (editing) {
                        null;
                      } else {
                        handleSelectItem(item.id);
                        Haptics.selectionAsync();
                      }
                    }}
                    isSelected={
                      selectedUser
                        ? item.selectedBy.some(
                            (user) => user.id === selectedUser.id
                          )
                        : null
                    }
                    // item.selectedBy.some(selectedUser => selectedUser.id === user.id);
                    participants={
                      item.selectedBy && item.selectedBy.length > 0
                        ? item.selectedBy
                        : []
                    }
                    // participants={item.users}
                  />
                )}
              />
              {editing && !addingItem && (
                <TouchableOpacity
                  activeOpacity={0.5}
                  style={styles.add_item_button}
                  onPress={() => setAddingItem(true)}
                >
                  <Text style={styles.add_item_text}>+ New item</Text>
                </TouchableOpacity>
              )}
              <View
                style={{
                  alignSelf: "center",
                  width: "100%",
                  backgroundColor: Colors.primary,
                  height: scale(2),
                  marginVertical: verticalScale(10),
                }}
              />
              <View style={styles.tax_tip_container}>
                <Medium500Text style={styles.tax_tip_text}>
                  Tip: {tip}
                </Medium500Text>
                <Medium500Text
                  style={[styles.tax_tip_text, { marginLeft: "30%" }]}
                >
                  Tax: {tax}
                </Medium500Text>
              </View>
              {selectedUser ? (
                <>
                  <View style={styles.total_container}>
                    <Bold700Text style={styles.total_text}>
                      {userData.id === selectedUser.id
                        ? "Your"
                        : `${selectedUser?.name.split(" ")[0]}'s`}{" "}
                      Subtotal
                    </Bold700Text>
                    <Bold700Text style={styles.total_text}>
                      {userCost}
                    </Bold700Text>
                  </View>
                </>
              ) : (
                <>
                  <View style={styles.total_container}>
                    <Bold700Text style={styles.total_text}>Total:</Bold700Text>
                    <Bold700Text style={styles.total_text}>{total}</Bold700Text>
                  </View>
                </>
              )}
            </View>
          </View>
        </TouchableWithoutFeedback>
        {editingName && !addingItem ? (
          <Large_green_button
            title={"Confirm Name"}
            onPress={() => {
              handleReceiptRename();
              Keyboard.dismiss();
            }}
          />
        ) : addingItem ? null : (
          <Large_green_button
            title={"Confirm items"}
            onPress={confirmSelectedItems}
          />
        )}
      </KeyboardAvoidingView>
      <Modal
        animationType="fade"
        transparent={true}
        visible={addingItem}
        onRequestClose={() => {
          setAddingItem(false);
        }}
      >
        <View style={styles.modal_view}>
          <View style={styles.modal_box}>
            <View style={styles.modal_text_input_container}>
              <TextInput
                placeholder="Name"
                autoFocus={true}
                placeholderTextColor={Colors.mediumgray}
                style={[styles.modal_text_inputs, { flex: 3 }]}
                keyboardType="default"
                value={itemName}
                onChangeText={setItemName}
              />
              <TextInput
                placeholder="1"
                placeholderTextColor={Colors.mediumgray}
                style={[styles.modal_text_inputs, { flex: 1 }]}
                keyboardType="numeric"
                value={itemQuantity}
                onChangeText={setItemQuantity}
              />
              <TextInput
                placeholder="price"
                placeholderTextColor={Colors.mediumgray}
                style={[styles.modal_text_inputs, { flex: 1.5 }]}
                keyboardType="numeric"
                value={itemPrice}
                onChangeText={handlePriceChange}
              />
            </View>
            <View style={styles.modal_confirm_cancel_buttons_container}>
              <TouchableOpacity
                style={[
                  styles.modal_buttons,
                  { backgroundColor: Colors.white },
                ]}
                onPress={() => {
                  setAddingItem(false),
                    setItemName(""),
                    setItemQuantity("1"),
                    setItemPrice("");
                }}
              >
                <Medium500Text
                  style={{ color: Colors.primary, fontSize: RFValue(12) }}
                >
                  Cancel
                </Medium500Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.modal_buttons,
                  { backgroundColor: Colors.primary },
                ]}
                onPress={addItems}
              >
                <Medium500Text
                  style={{ color: "white", fontSize: RFValue(12) }}
                >
                  Add
                </Medium500Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <Toast />
      </Modal>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: "6%",
  },
  user: {
    alignItems: "center",
    justifyContent: "center",
    // borderWidth: 1,
    paddingHorizontal: scale(5),
    height: verticalScale(100),
    opacity: 0.5,
  },
  selected: {
    borderWidth: 3,
    borderRadius: scale(5),
    borderColor: Colors.primary,
    opacity: 1,
    backgroundColor: Colors.white,
    shadowColor: Colors.black,
    shadowOpacity: 0.25,
    shadowRadius: 4,
    shadowOffset: {
      height: 4,
    },
  },
  receipt_name: {
    borderBottomWidth: 3,
    borderBottomColor: Colors.primary,
    fontFamily: "DMSans_700Bold",
    color: Colors.primary,
    fontSize: RFValue(18),
    marginTop: "10%",
  },
  items_container: {
    alignItems: "center",
    marginTop: verticalScale(5),
    height: verticalScale(310),
    // borderWidth: 1
  },
  tax_tip_container: {
    flexDirection: "row",
    // borderWidth: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
  },
  total_container: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: verticalScale(5),
    marginRight: scale(5),
    alignItems: "center",
  },
  tax_tip_text: {
    fontSize: RFValue(14),
    color: Colors.primary,
  },
  total_text: {
    fontSize: RFValue(18),
  },
  edit_done: {
    borderBottomWidth: 2,
    borderColor: Colors.primary,
    position: "absolute",
    right: "6%",
    bottom: verticalScale(2),
  },
  edit_done_text: {
    fontSize: RFValue(12),
    color: Colors.primary,
    margin: 0,
  },
  add_item_button: {
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: scale(20),
    backgroundColor: Colors.button_fill_green,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: verticalScale(8),
    paddingVertical: scale(6),
    shadowColor: Colors.black,
    shadowOpacity: 0.25,
    shadowRadius: 4,
    shadowOffset: {
      height: 4,
    },
  },
  add_item_text: {
    fontFamily: "DMSans_500Medium",
    color: Colors.primary,
    fontSize: RFValue(12),
  },
  loading_container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: "transparent",
    // borderWidth: 1
  },
  loading_text: {
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
  modal_view: {
    flex: 1,
    // borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "backgroundColor: rgba(0,0,0,0.2)",
  },
  modal_box: {
    height: "20%",
    width: "90%",
    backgroundColor: Colors.white,
    borderWidth: 2,
    borderColor: Colors.primary,
    borderRadius: scale(20),
    marginTop: "-60%",
    shadowColor: Colors.darkgray,
    shadowOffset: {
      height: 5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    paddingHorizontal: scale(10),
  },
  modal_text_input_container: {
    flexDirection: "row",
    flex: 0.7,
    alignItems: "center",
    // borderWidth: 1,
    // borderColor: 'blue',
  },
  modal_text_inputs: {
    borderBottomWidth: 1,
    borderColor: Colors.primary,
    fontFamily: "DMSans_500Medium",
    fontSize: RFValue(12),
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: scale(10),
    paddingTop: scale(10),
    paddingBottom: scale(5),
    flexDirection: "row",
    marginHorizontal: scale(5),
    // borderRadius: scale(10)
  },
  modal_confirm_cancel_buttons_container: {
    flexDirection: "row",
    // borderWidth: 1,
    flex: 0.3,
    justifyContent: "space-around",
    alignItems: "center",
    paddingBottom: verticalScale(15),
    paddingLeft: scale(20),
    paddingRight: scale(20),
  },
  modal_buttons: {
    borderColor: Colors.primary,
    borderWidth: 1,
    paddingVertical: scale(10),
    width: scale(80),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: scale(10),
  },
});

export default Receipt_items;
