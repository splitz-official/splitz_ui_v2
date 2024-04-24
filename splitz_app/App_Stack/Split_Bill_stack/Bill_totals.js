import { ActivityIndicator, FlatList, Image, Keyboard, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';



import { useAxios } from '../../../Axios/axiosContext'
import Screen from '../../../Components/Screen';
import Back_button from '../../../Components/Back_button';
import Colors from '../../../Config/Colors';
import { RFValue } from 'react-native-responsive-fontsize';
import Large_green_button from '../../../Components/Large_green_button';
import { scale, verticalScale } from 'react-native-size-matters';
import User_total_list_item from './Components/User_total_list_item';

const Bill_totals = () => {

  const { axiosInstance, userData } = useAxios();
  const navigation = useNavigation();
  const route = useRoute();
  const { room_code, receipt_id} = route.params;
  const userID = userData.id;

  const [editingName, setEditingName] = useState(false);
  const [receiptname, setReceiptName] = useState('');
  const [receipt, setReceipt] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [tax, setTax] = useState('');
  const [tip, setTip] = useState('');
  const [total, setTotal] = useState('');
  const [userCost, setUserCost] = useState(0);
  const initialNameRef = useRef();
  const [activeUsers, setActiveUsers] = useState([]);

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
        console.log(response.data.items);
        const userSelectedItems = response.data.items
        .filter(item => item.users.find(user => user.id === userID))
        .map(item => item.id);
        
        const usersMap = new Map();
        response.data.items.forEach(item => {
          item.users.forEach(user => {
            if(!usersMap.has(user.id)){
              usersMap.set(user.id, {
                id: user.id,
                name: user.name.split(' ')[0],
                username: user.username
              });
            }
          });
        });
        const uniqueUsers = Array.from(usersMap.values())
        setActiveUsers(uniqueUsers);
        // console.log(uniqueUsers)

        setReceipt(response.data); 
        setSelectedItems(userSelectedItems);
        setTax(response.data.tax_amount);
        setTip(response.data.tip_amount);
        setTotal(response.data.total_amount);
        initialNameRef.current=response.data.receipt_name;
        setReceiptName(response.data.receipt_name);
        setLoading(false);
      } catch (error) {
        console.log("Error: ", error);
        setLoading(false);
      }
      // console.log("Selected Items: ", selectedItems) this doesn't update in time before the variable is set so ignore first initial result 
    };

    fetchReceipt();
  }, []); 

  const calculateUserTotals = (items, taxAmount, tipAmount) => {
    const userCosts = new Map();

    items.forEach(item=> {
      const pricePerUser = item.item_cost / item.users.length;
      item.users.forEach(user=> {
        if (!userCosts.has(user.id)){
          userCosts.set(user.id, {
            name: user.name,
            subtotal: 0,
            totalCost: 0
          });
        }
        let currentUser = userCosts.get(user.id);
        currentUser.subtotal += pricePerUser;
      })
    })
  }

  const handleReceiptRename = async() => {
    if (receiptname !== initialNameRef.current) {
      console.log("names are different: ", receiptname);
      const response = await axiosInstance.put(`/receipts/${room_code}/rename-receipt/${receipt_id}`, {
        receipt_name: receiptname
      })
      // console.log(response);
    }else {
      console.log("names are same");
    }
  }

  if (loading) {
    return (
      <View style={styles.loading_container}>
        <ActivityIndicator size={'large'} color={Colors.primary}/>
        <Text style = {styles.loading_text}>Getting receipt data!</Text>
      </View>
    )
  }

  return (
    <Screen>
      <Back_button title={"Back"} onPress={()=> navigation.goBack()}/>
      <KeyboardAvoidingView
      behavior='height'
      style={{flex: 1}}
      >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <TextInput 
          style={styles.receipt_name}
          value={receiptname}
          onFocus={()=> setEditingName(true)}
          onBlur={()=> setEditingName(false)}
          onChangeText={setReceiptName}
          placeholder='Name this bill!'
          placeholderTextColor={Colors.textInputPlaceholder}
          autoFocus={false}
          />
        <View style={styles.top_total_container}>
          <Text style={styles.top_total_text}>{total}</Text>
        </View>
      <View style={styles.list_container}>
        <FlatList 
        data={activeUsers}
        // style={{borderWidth: 1}}
        contentContainerStyle={{flexGrow: 1}}
        keyExtractor={item => item.id.toString()}
        ListEmptyComponent={
          <>
          <Image style={{width: '100%', height: '100%'}} 
          source={require('../../../assets/Lookin_empty.png')}
          resizeMode='contain'/>
          </>
        }
        renderItem={({ item })=> (
          <User_total_list_item name={item.name} first_letter={item.name[0]}/>
        )}
        />
      </View>
      </View>
      </TouchableWithoutFeedback>
      {editingName ? (
        <Large_green_button 
          title={"Confirm Name"} 
          onPress={() => {
              handleReceiptRename();
              Keyboard.dismiss();
              // setEditingName(false);
          }}
        />
      ) : (
        <Large_green_button title={"Select your items"} onPress={()=> navigation.navigate('Receipt_items', {
          room_code: room_code,
          receipt_id: receipt_id
        })}/>
      )}
      </KeyboardAvoidingView>
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
  top_total_container: {
    alignItems: 'center',
    marginTop: '8%',
    // borderWidth: 1,
  },
  top_total_text: {
    fontFamily: 'DMSans_700Bold',
    fontSize: RFValue(24)
  },
  list_container: {
    // borderWidth: 1,
    marginTop: '8%',
    height: verticalScale(360),
  },
  loading_container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'transparent'
    // borderWidth: 1
  },
  loading_text: {
      fontFamily: 'DMSans_700Bold',
      marginTop: scale(10),
      color: Colors.primary,
      fontSize: RFValue(16),
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      width: '80%',
      textAlign: 'center'
      // borderWidth: 1
  }
})

export default Bill_totals
