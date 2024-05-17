import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View, Modal, TouchableOpacity } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';
import { scale, verticalScale } from 'react-native-size-matters';

import { useAxios } from '../../../../Axios/axiosContext';
import Colors from '../../../../Config/Colors';
import Bills_list_item_component from './Bills_list_item_component';
import { Bold700Text, Medium500Text } from '../../../../Config/AppText';

const Bills = ({ searchQuery }) => {
  const { axiosInstance } = useAxios();
  const [receipts, setReceipts] = useState([]);
  const [selectedReceiptId, setSelectedReceiptId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const fetchReceipts = async () => {
    setRefreshing(true);
    try {
      const response = await axiosInstance.get(`/receipts/one-off_receipt_list`);
      setReceipts(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Receipts", error);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchReceipts();
  }, []);

  const filteredData = receipts.filter(bill => 
    bill.receipt_name && bill.receipt_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = async () => {
    if (selectedReceiptId) {
      try {
        // await axiosInstance.delete(`/receipts/${selectedReceiptId}`);
        console.log("delete button working")
        fetchReceipts();
        setModalVisible(false);
      } catch (error) {
        console.error("Delete Error", error);
      }
    }
  };

  if (loading) {
    return (
      <ActivityIndicator size='large' color={Colors.primary}/>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList 
        data={filteredData}
        keyExtractor={item => item.id.toString()}
        onRefresh={fetchReceipts}
        style={{ width: '100%', height: '100%', paddingHorizontal: scale(10) }}
        refreshing={refreshing}
        ItemSeparatorComponent={
          <View style={{ backgroundColor: Colors.primary, height: verticalScale(1) }}/>
        }
        renderItem={({ item }) => 
          <Bills_list_item_component 
            title={item.receipt_name}
            subtitle={item.owner_id}
            onPress={() => {
              navigation.navigate('Split_bill_stack', {
                screen: 'Bill_totals',
                params: { receipt_id: item.id }
              });
              Haptics.selectionAsync();
            }}
            deletePress={() => {
              Haptics.selectionAsync();
              setSelectedReceiptId(item.id);
              setModalVisible(true);
            }}
          />
        }
      />
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Bold700Text style={styles.modalText}>Are you sure you want to delete this receipt?</Bold700Text>
            <View style={styles.modal_confirm_cancel_buttons_container}>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={[styles.modal_buttons, {borderColor: Colors.primary}]}>
                <Medium500Text style={[styles.modalButtonText, {color: Colors.primary}]}>Cancel</Medium500Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleDelete} style={[styles.modal_buttons, { backgroundColor: Colors.delete_red, borderColor: Colors.delete_red }]}>
                <Medium500Text style={[styles.modalButtonText, { color: Colors.white }]}>Delete</Medium500Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '18%',
        paddingHorizontal: scale(15)
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        // borderWidth: 1,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    modalText: {
        fontSize: RFValue(16),
        marginBottom: 20,
        textAlign: 'center'
    },
    modalButtonText: {
      fontSize: RFValue(12)
    },
    modal_buttons: {
      // borderColor: Colors.primary,
      borderWidth: 1,
      paddingVertical: scale(10),
      width: scale(80),
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: scale(10)
    },
    modal_confirm_cancel_buttons_container: {
      flexDirection: 'row',
      // borderWidth: 1,
      // flex: 1,
      width: '100%',
      justifyContent: 'space-between',
      alignItems: 'center',
      // paddingBottom: verticalScale(15),
      paddingHorizontal: scale(20),
      marginTop: verticalScale(10)
    },
});

export default Bills;
