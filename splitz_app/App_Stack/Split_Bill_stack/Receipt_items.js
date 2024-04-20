import { ActivityIndicator, FlatList, Keyboard, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize'
import { scale } from 'react-native-size-matters';


import Screen from '../../../Components/Screen';
import Colors from '../../../Config/Colors';
import Receipt_items_list_component from './Components/Receipt_items_list_component';
import Back_button from '../../../Components/Back_button';
import Large_green_button from '../../../Components/Large_green_button';
import { useAxios } from '../../../Axios/axiosContext';

//add item endpoint and rename receipt endpoint

const Receipt_items = () => {

  const { axiosInstance } = useAxios();
  const navigation = useNavigation();
  const route = useRoute();
  // const { receipt_id, room_code } = route.params;
  // const receipt = {"date": "2018-01-01", "id": 29, "items": [{"id": 216, "item_cost": 6.5, "item_name": "Lorem", "item_quantity": 1, "receipt_id": 29}, {"id": 217, "item_cost": 7.5, "item_name": "Ipsum", "item_quantity": 1, "receipt_id": 29}, {"id": 218, "item_cost": 48, "item_name": "Lorem Ipsum", "item_quantity": 1, "receipt_id": 29}, {"id": 219, "item_cost": 9.3, "item_name": "Lorem", "item_quantity": 1, "receipt_id": 29}, {"id": 220, "item_cost": 11.9, "item_name": "Lorem I", "item_quantity": 1, "receipt_id": 29}, {"id": 221, "item_cost": 1.2, "item_name": "Ipsum", "item_quantity": 1, "receipt_id": 29}, {"id": 222, "item_cost": 0.4, "item_name": "Lorem Ipsum", "item_quantity": 1, "receipt_id": 29}], "merchant_name": "", "owner_id": 3, "owner_name": "Charles Gutcho", "receipt_name": "", "room_code": "0K23HE", "tax_amount": 8, "temporary_users": null, "tip_amount": 0, "total_amount": 84.8}
  const receipt_id = '32'
  const room_code = '0K23HE'
  // console.log(receipt_id, room_code);
  const [receipt, setReceipt] = useState([]);
  const [loading, setLoading] = useState(false);

  const [tax, setTax] = useState('');
  const [tip, setTip] = useState('');
  const [total, setTotal] = useState('');

  const [receiptname, setReceiptName] = useState('');

  useEffect(() => {
    const fetchReceipt = async () => {
      if (!room_code || !receipt_id) {
        console.log('Missing parameters: room_code or receipt_id');
        return;
      }

      setLoading(true);
      try {
        console.log("Fetching receipt data")
        const response = await axiosInstance.get(`/receipts/${room_code}/receipt/${receipt_id}`);
        console.log(response.data);
        setReceipt(response.data); 
        setTax(response.data.tax_amount);
        setTip(response.data.tip_amount);
        setTotal(response.data.total_amount);
        setReceiptName(response.data.receipt_name);
        setLoading(false);
      } catch (error) {
        console.log("Error: ", error);
        setError(error);
        setLoading(false);
      }
    };

    fetchReceipt();
  }, []); 

  if(loading) {
    return <ActivityIndicator size={'large'} color={Colors.primary}/>
  }

  return (
    <Screen>
      <Back_button title={room_code ? 'Back' : 'Home'} onPress={() => {
        if (room_code) {
          navigation.navigate('CreateGroupStackNavigation', {
            screen: 'Group_details', 
            params: {room_code: room_code}
          });
        } else {
          navigation.navigate('home');
        }
      }}/>
      <KeyboardAvoidingView
      behavior='height'
      style={{flex: 1}}
      >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
            <TextInput 
            style={styles.receipt_name}
            value={receiptname}
            onChangeText={setReceiptName}
            placeholder='Name this bill!'
            placeholderTextColor={Colors.textInputPlaceholder}
            autoFocus={false}
            />
            <View style={styles.items_container}>
              <FlatList 
              data={receipt.items}
              keyExtractor={item => item.id.toString()}
              contentContainerStyle={{justifyContent: 'center'}}
              // ListHeaderComponent={()=> (
              //   <Text style={styles.list_header}>Confirm receipt results</Text>
              // )}
              ListHeaderComponent={()=>(
                <Receipt_items_list_component 
                name={'name'}
                price={'price'}
                />
              )}
              renderItem={({ item }) => 
                <Receipt_items_list_component 
                name={item.item_name}
                price={`$${item.item_cost}`}
                /> 
              }
              />
              {/* <Text>USER TOTAL</Text> */}
            </View>
        </View>
      </TouchableWithoutFeedback>
      <Large_green_button title={"Confirm Items"} onPress={()=> navigation.navigate('CreateGroupStackNavigation', {
        screen: 'Group_details',
        params: {room_code: receipt.room_code}
        })}/>
      </KeyboardAvoidingView>
          <View style={{alignSelf: 'center', width: '88%', backgroundColor: Colors.primary, height: scale(2), marginTop: scale(5), position: 'absolute', bottom: scale(90)}}/>
          <View style={styles.total_tax_tip}>
            <Text style={{fontFamily: 'DMSans_500Medium', fontSize: RFValue(14)}}>Tip: ${tip}</Text>
            <Text style={{fontFamily: 'DMSans_500Medium', fontSize: RFValue(14)}}>Tax: ${tax}</Text>
            <Text style={{fontFamily: 'DMSans_700Bold', fontSize: RFValue(18)}}>Total: ${total}</Text>
          </View>
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
    marginTop: scale(20),
    marginBottom: scale(160),
    // borderWidth: 1
  },
  list_header: {
    fontFamily: 'DMSans_500Medium',
    fontSize: RFValue(12)
  },
  total_tax_tip: {
    flexDirection: 'row',
    // borderWidth: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    position: 'absolute',
    bottom: scale(55)
  },
})

export default Receipt_items
