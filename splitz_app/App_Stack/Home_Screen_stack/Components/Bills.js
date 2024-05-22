import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { useNavigation } from "@react-navigation/native";
import * as Haptics from "expo-haptics";
import { scale, verticalScale } from "react-native-size-matters";

import { useAxios } from "../../../../Axios/axiosContext";
import Colors from "../../../../Config/Colors";
import Bills_list_item_component from "./Bills_list_item_component";
import { Bold700Text, Medium500Text } from "../../../../Config/AppText";
import DeleteModal from "../../../../Components/Delete_modal";

const Bills = ({ searchQuery }) => {
  const { axiosInstance, userData } = useAxios();
  const [receipts, setReceipts] = useState([]);
  const [selectedReceiptId, setSelectedReceiptId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const userID = userData.id;

  const fetchReceipts = async () => {
    setRefreshing(true);
    try {
      const response = await axiosInstance.get(
        `/receipts/one-off_receipt_list`
      );
      setReceipts(response.data);
      // console.log(response.data);
    } catch (error) {
      console.error("Receipts", error);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchReceipts();
  }, []);

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

  const filteredData = receipts.filter(
    (bill) =>
      bill.receipt_name &&
      bill.receipt_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = async () => {
    if (selectedReceiptId) {
      try {
        await axiosInstance.post(`receipts/delete/${selectedReceiptId}`);
        console.log("delete button working");
        fetchReceipts();
        setModalVisible(false);
      } catch (error) {
        console.error("Delete Error", error);
      }
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color={Colors.primary} />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id.toString()}
        onRefresh={fetchReceipts}
        style={{ width: "100%", height: "100%", paddingHorizontal: scale(10) }}
        contentContainerStyle={{flexGrow: 1}}
        refreshing={refreshing}
        ItemSeparatorComponent={
          <View
            style={{
              backgroundColor: Colors.primary,
              height: verticalScale(1),
            }}
          />
        }
        renderItem={({ item }) => (
          <Bills_list_item_component
            title={item.receipt_name}
            subtitle={First_last_initial(item.owner_name)}
            onPress={() => {
              navigation.navigate("Split_bill_stack", {
                screen: "Bill_totals",
                params: { receipt_id: item.id },
              });
              Haptics.selectionAsync();
            }}
            deletePress={() => {
              Haptics.selectionAsync();
              setSelectedReceiptId(item.id);
              setModalVisible(true);
            }}
            owner={item.owner_id === userID}
          />
        )}
      />
      <DeleteModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onConfirm={handleDelete}
        title="Delete Receipt"
        message="Are you sure you want to delete this receipt?"
        confirmText="Delete"
        cancelText="Cancel"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "18%",
    paddingHorizontal: scale(15),
    // borderWidth: 1
  },
});

export default Bills;
