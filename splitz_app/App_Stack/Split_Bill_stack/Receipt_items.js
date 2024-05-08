import { ActivityIndicator, FlatList, Keyboard, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View, Alert, Modal} from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize'
import { scale, verticalScale } from 'react-native-size-matters';
import * as Haptics from 'expo-haptics';
import Toast from 'react-native-toast-message';

import Screen from '../../../Components/Screen';
import Colors from '../../../Config/Colors';
import Receipt_items_list_component from './Components/Receipt_items_list_component';
import Back_button from '../../../Components/Back_button';
import Large_green_button from '../../../Components/Large_green_button';
import { useAxios } from '../../../Axios/axiosContext';
import Receipt_add_item from './Components/Receipt_add_item';
import Profile_picture from '../../../Components/Profile_picture';
import { Bold700Text, Medium500Text } from '../../../Config/AppText';

//add item endpoint and rename receipt endpoint

const Receipt_items = () => {

  const { axiosInstance, userData } = useAxios();
  const navigation = useNavigation();
  const route = useRoute();
  const { receipt_id, room_code} = route.params;
  // console.log(room_code);
  // const receipt_id = '32'
  // const room_code = '0K23HE'
  // console.log(receipt_id, room_code);
  const userID = userData.id;
  const [receipt, setReceipt] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [addingItem, setAddingItem] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [initialselectedItems, setInitialSelectedItems] = useState([]);

  const [tax, setTax] = useState('');
  const [tip, setTip] = useState('');
  const [total, setTotal] = useState('');
  const [receiptname, setReceiptName] = useState('');
  const [userCost, setUserCost] = useState(0);
  const initialNameRef = useRef();
  const [editingName, setEditingName] = useState(false);

  const [itemName, setItemName] = useState('');
  const [itemQuantity, setItemQuantity] = useState('1');
  const [itemPrice, setItemPrice] = useState('');

  useEffect(() => {
    const fetchReceipt = async () => {
      if (!room_code || !receipt_id) {
        console.log('Missing parameters: room_code or receipt_id');
        return;
      }

      setLoading(true);
      try {
        // console.log("Fetching receipt data")
        const response = await axiosInstance.get(`/receipts/${room_code}/receipt/${receipt_id}`);
        // console.log(response.data.items);
        const userSelectedItems = response.data.items
        .filter(item => item.users.find(user => user.id === userID))
        .map(item => item.id);

        setReceipt(response.data); 
        setInitialSelectedItems(userSelectedItems);
        setSelectedItems(userSelectedItems);
        setTax(response.data.tax_amount);
        setTip(response.data.tip_amount);
        setTotal(response.data.total_amount);
        initialNameRef.current=response.data.receipt_name;
        setReceiptName(response.data.receipt_name);
        setLoading(false);
      } catch (error) {
        console.log("fetchReceipt Error: ", error.response.data);
        setLoading(false);
      }
      // console.log("Selected Items: ", selectedItems)
    };

    fetchReceipt();
  }, []); 


  useEffect(() => {
    const calculateTotal = () => {
      if (receipt.items && Array.isArray(receipt.items)) {
        const total = receipt.items.reduce((acc, item) => {
          if (selectedItems.includes(item.id)) {
            let numUsers = item.users.length;
            if (!item.users.find(user => user.id === userID)) {
              numUsers += 1;
            }
            const itemTotalCost = (item.item_cost * item.item_quantity) / numUsers;
            return acc + itemTotalCost;
          }
          return acc;
        }, 0);
        setUserCost(total);
      }
    };

    calculateTotal();
  }, [selectedItems, receipt.items]);

  //refresh on navigation ADD IN FUTURE
  if(loading) {
    return (
      <View style={styles.loading_container}>
        <ActivityIndicator size={'large'} color={Colors.primary}/>
        <Bold700Text style={styles.loading_text}>Getting receipt data!</Bold700Text>
      </View>
  )
  }

  const handleItemPress = (item) => {
    if (selectedItems.includes(item.id)) {
      setSelectedItems((prevSelectedItems) => {
        return prevSelectedItems.filter((itemId) => itemId !== item.id);
      });
    } else {
      setSelectedItems((prevSelectedItems) => {
        return [...prevSelectedItems, item.id];
      });
    }
  };

  const addItems = async() => {
    // console.log(itemName, itemQuantity, itemPrice)
    if (itemName.trim() === '' || itemPrice.trim() === '' || itemQuantity.trim() === '') {
      Alert.alert("Please fill in all fields");
      return;
    }
    const newItem = {
      item_name: itemName,
      item_quantity: parseInt(itemQuantity),
      item_price: parseFloat(itemPrice)
    }
    await axiosInstance.post(`/receipts/${room_code}/add-item/${receipt_id}`, [newItem])
    .then((response) => {
      Toast.show({
        type: 'success',
        text1: 'Item Added Successfully',
        position: 'top',
        topOffset: verticalScale(45),
        autoHide: true,
        visibilityTime: 2000
      })
      setItemName("");
      setItemQuantity("1");
      setItemPrice("");
      console.log(response);
    })
    .catch((error) => {
      console.log("Error: ", error);
    })
  }

  const handleReceiptRename = async() => {
    if (receiptname !== initialNameRef.current) {
      console.log("names are different: ", receiptname);
      await axiosInstance.put(`/receipts/${room_code}/rename-receipt/${receipt_id}`, {
        receipt_name: receiptname
      }).catch((error) => {
        console.error(error)
      })
    }else {
      console.log("names are same")
    }
  }

  confirmSelectedItems = () => {
    console.log(selectedItems)
    if(sameArrays(selectedItems, initialselectedItems)){
      console.log("Equal and this is working");
      navigation.navigate("Bill_totals", {
        room_code: room_code,
        receipt_id: receipt_id
      })
    }else {
      const user_selected_items = {
        item_id_list: selectedItems,
        user_total_cost: 1,
      };
      axiosInstance
        .post(
          "/receipts/" + receipt.room_code + "/select-items/" + receipt.id,
          user_selected_items
        )
        .then((response) => {
          if (response.data === true) {
            // Alert.alert("Items Selected Successfully!");
            console.log("Items added successfullyalfjad;lskfja!: ")
            navigation.navigate("Bill_totals", {
              room_code: room_code,
              receipt_id: receipt_id
            })
          } else {
            Alert.alert("Error", "Item could not be added.");
          }
        })
        .catch((error) => {
          console.log("Error", error);
        });
    }
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

  return (
    <Screen>
        <Back_button title={room_code ? 'Group' : 'Home'} onPress={() => {
          if (room_code) {
            // console.log("button is pressed and room_code exists")
            // console.log(navigation.getState());
            navigation.navigate('Groups_details', {room_code: room_code});
            // navigation.goBack();
          } else {
            navigation.navigate('home');
          }
        }}
        children={
          <TouchableOpacity activeOpacity={.8} style={styles.edit_done} 
          onPress={() => {
            if (editing) {
              setEditing(false);
              setAddingItem(false)
              Haptics.selectionAsync();
            } else {
              setEditing(true);
              Haptics.selectionAsync();
            }
          }}
          >
            <Medium500Text style={styles.edit_done_text}>{editing ? "Done" : "Edit items"}</Medium500Text>
          </TouchableOpacity>
        }
        />
          
      <KeyboardAvoidingView
      behavior='height'
      style={{flex: 1}}
      >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
            <TextInput 
            style={styles.receipt_name}
            value={receiptname}
            onFocus={()=>setEditingName(true)}
            onBlur={()=>setEditingName(false)}
            onChangeText={setReceiptName}
            placeholder='Name this bill!'
            placeholderTextColor={Colors.textInputPlaceholder}
            autoFocus={false}
            clearButtonMode='while-editing'
            />
            <View style={{marginTop: '5%', justifyContent: 'flex-start', flexDirection: 'row', marginLeft: '5%'}}>
              <View style={{alignItems: 'center'}}>
                <Profile_picture 
                name={userData.name} 
                image={userData.profile_picture_url} 
                sizing_style={{height: scale(50), width: scale(50), borderWidth: 1, borderColor: Colors.primary}} 
                text_sizing={{fontSize: RFValue(18)}}/>
                <Medium500Text style={{fontSize: RFValue(14), marginTop: scale(5)}}>You</Medium500Text>
              </View>
              <View style={{marginHorizontal: scale(15), marginRight: scale(50)}}>
                <Bold700Text style={{fontSize: RFValue(14), marginBottom: verticalScale(5)}}>Pro Tip: </Bold700Text>
                <Medium500Text style={{fontSize: RFValue(12)}}>Make sure to check your receipt against the items below</Medium500Text>
              </View>
            </View>
            <View style={[styles.items_container]}>
              <FlatList 
              data={receipt.items}
              keyExtractor={item => item.id.toString()}
              showsVerticalScrollIndicator={false}
              horizontal={false}
              contentContainerStyle={{justifyContent: 'center'}}
              renderItem={({ item }) => 
                <Receipt_items_list_component 
                name={item.item_name}
                quantity={`(${item.item_quantity})`}
                price={item.item_cost * item.item_quantity}
                onPress={()=> {
                  handleItemPress(item)
                  Haptics.selectionAsync()
                }
                }
                isSelected={selectedItems.includes(item.id)}
                participants={item.users && item.users.length > 0 ? 
                    item.users.filter(user=>user.id !== userID)
                    :
                    []
                }
                // participants={item.users}
                /> 
              }
              />
              {editing && !addingItem &&
              <TouchableOpacity activeOpacity={.5} style={styles.add_item_button} onPress={()=> setAddingItem(true)}>
                <Text style={styles.add_item_text}>+ New item</Text>
              </TouchableOpacity>}
            <View style={{alignSelf: 'center', width: '100%', backgroundColor: Colors.primary, height: scale(2), marginVertical: verticalScale(10)}}/>
            <View style={styles.tax_tip_container}>
                <Medium500Text style={styles.tax_tip_text}>Tip: {tip}</Medium500Text>
                <Medium500Text style={[styles.tax_tip_text, {marginLeft: '30%'}]}>Tax: {tax}</Medium500Text>
              </View>
            {selectedItems.length > 0 ?
            (
            <>
              <View style={styles.total_container}>
                <Bold700Text style={styles.total_text}>Your subtotal:</Bold700Text>
                <Bold700Text style={styles.total_text}>{userCost.toFixed(2)}</Bold700Text>
              </View>
            </> 
            ) : (
              <>
              <View style={styles.total_container}>
                <Bold700Text style={styles.total_text}>Total:</Bold700Text>
                <Bold700Text style={styles.total_text}>{total}</Bold700Text>
              </View>
            </> 
            )
            }
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
        ) : addingItem ? (
            null
        ) : (
          <Large_green_button 
            title={"Confirm items"} 
            onPress={confirmSelectedItems}
          />
        )}
      </KeyboardAvoidingView>
      <Modal
      animationType='fade'
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
              placeholder='Name'
              autoFocus={true}
              placeholderTextColor={Colors.mediumgray}
              style={[styles.modal_text_inputs, {flex: 3}]}
              keyboardType='default'
              value={itemName}
              onChangeText={setItemName}
              />
              <TextInput 
              placeholder='1'
              placeholderTextColor={Colors.mediumgray}
              style={[styles.modal_text_inputs, {flex: 1}]}
              keyboardType='numeric'
              value={itemQuantity}
              onChangeText={setItemQuantity}
              />
              <TextInput 
              placeholder='price'
              placeholderTextColor={Colors.mediumgray}
              style={[styles.modal_text_inputs, {flex: 1.5}]}
              keyboardType='numeric'
              value={itemPrice}
              onChangeText={handlePriceChange}
              />
            </View>
            <View style={styles.modal_confirm_cancel_buttons_container}>
              <TouchableOpacity style={[styles.modal_buttons, {backgroundColor: Colors.white}]} 
              onPress={()=>{setAddingItem(false), setItemName(""), setItemQuantity("1"), setItemPrice("")}}>
                <Medium500Text style={{color: Colors.primary, fontSize: RFValue(12)}}>Cancel</Medium500Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.modal_buttons, {backgroundColor: Colors.primary}]} onPress={addItems}>
                <Medium500Text style={{color: 'white', fontSize: RFValue(12)}}>Add</Medium500Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <Toast/>
      </Modal>
    </Screen>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: '6%'
  },
  receipt_name: {
    borderBottomWidth: 3,
    borderBottomColor: Colors.primary,
    fontFamily: 'DMSans_700Bold',
    color: Colors.primary,
    fontSize: RFValue(18),
    marginTop: '10%'
  },
  items_container: {
    alignItems: 'center',
    marginTop: verticalScale(10),
    height: verticalScale(350),
    // borderWidth: 1
  },
  tax_tip_container: {
    flexDirection: 'row',
    // borderWidth: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
  },
  total_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: verticalScale(5),
    marginRight: scale(5),
    alignItems: 'center'
  },
  tax_tip_text: {
    fontSize: RFValue(14),
    color: Colors.primary
  },
  total_text: {
    fontSize: RFValue(18)
  },
  edit_done: {
    borderBottomWidth: 2, 
    borderColor: Colors.primary,
    position: 'absolute', 
    right: '6%', 
    bottom: verticalScale(2)
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
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: verticalScale(8),
    paddingVertical: scale(6),
    shadowColor: Colors.black,
    shadowOpacity: .25,
    shadowRadius:4,
    shadowOffset: {
        height: 4,
    }
  },
  add_item_text: {
    fontFamily: 'DMSans_500Medium',
    color: Colors.primary,
    fontSize: RFValue(12)
  },
  loading_container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'transparent'
    // borderWidth: 1
  },
  loading_text: {
      marginTop: scale(10),
      color: Colors.primary,
      fontSize: RFValue(16),
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      width: '80%',
      textAlign: 'center'
      // borderWidth: 1
  },
  modal_view: {
    flex: 1,
    // borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'backgroundColor: rgba(0,0,0,0.2)'
  },
  modal_box: {
    height: '20%',
    width: '90%',
    backgroundColor: Colors.white,
    borderWidth: 2,
    borderColor: Colors.primary,
    borderRadius: scale(20),
    marginTop: '-60%',
    shadowColor: Colors.darkgray,
    shadowOffset: {
        height: 5
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    paddingHorizontal: scale(10)
  },
  modal_text_input_container: {
    flexDirection: 'row',
    flex: .7,
    alignItems: 'center',
    // borderWidth: 1,
    // borderColor: 'blue',
  },
  modal_text_inputs: {
    borderBottomWidth: 1,
    borderColor: Colors.primary,
    fontFamily: 'DMSans_500Medium',
    fontSize: RFValue(12),
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: scale(10),
    paddingTop: scale(10),
    paddingBottom: scale(5),
    flexDirection: 'row',
    marginHorizontal: scale(5)
    // borderRadius: scale(10)
  },
  modal_confirm_cancel_buttons_container: {
    flexDirection: 'row',
    // borderWidth: 1,
    flex: .3,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: verticalScale(15),
    paddingLeft: scale(20),
    paddingRight: scale(20)
  },
  modal_buttons: {
    borderColor: Colors.primary,
    borderWidth: 1,
    paddingVertical: scale(10),
    width: scale(80),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scale(10)
  }
})

export default Receipt_items
