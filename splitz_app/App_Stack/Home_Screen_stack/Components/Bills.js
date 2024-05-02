import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';
import { scale, verticalScale } from 'react-native-size-matters';


import { useAxios } from '../../../../Axios/axiosContext';
import Colors from '../../../../Config/Colors';
import Bills_list_item_component from './Bills_list_item_component';

const Bills = () => {

  const { axiosInstance } = useAxios();
  const [receipts, setReceipts] = useState([]);
  const navigation = useNavigation();
  const [loading, SetLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const fetchReceipts = async () => {
    // SetLoading(true);
    setRefreshing(true);
    try {
      const response = await axiosInstance.get(`/receipts/receipts-list`);
      console.log(response.data);
      setReceipts(response.data);
    } catch (error) {
      console.error("Receipts", error);
    } finally {
      setRefreshing(false);
    }
  }

  useEffect(()=> {
    fetchReceipts();
  }, []);

  if (loading) {
    return (
      <ActivityIndicator size='large' color={Colors.primary}/>
    )
  }

  return (
    <View style={styles.container}>
      <FlatList 
      data={receipts}
      keyExtractor={item => item.id.toString()}
      onRefresh={()=>fetchReceipts}
      style={{width: '100%', height: '100%', paddingHorizontal: scale(10)}}
      refreshing={refreshing}
      ItemSeparatorComponent={
        <View style={{backgroundColor: Colors.primary, height: verticalScale(1)}}/>
      }
      renderItem={({ item }) => 
        <Bills_list_item_component 
          title={item.receipt_name}
          subtitle={item.owner_id}
          onPress={()=> {
            navigation.navigate('Split_bill_stack', {
              screen: 'Bill_totals',
              params: {receipt_id: item.id}
            })
            Haptics.selectionAsync()
          }}
        />
      }
      />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '18%',
        // borderWidth: 2,
        paddingHorizontal: scale(15)
    }
})

export default Bills
