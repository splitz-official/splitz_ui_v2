import React from "react";
import { StyleSheet, Text, View, Modal, TouchableOpacity } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { scale, verticalScale } from "react-native-size-matters";
import { TextInput as RTextInput } from "react-native-paper";

import { Bold700Text, Medium500Text } from "../Config/AppText";
import Colors from "../Config/Colors";

const EditModal = ({
  visible,
  onClose,
  onConfirm,
  message,
  confirmText,
  cancelText,
  value,
  changeText,
  label
}) => {

  const handleChangeText = (text) => {
    if (/^\d*\.?\d{0,2}$/.test(text)) {
      changeText(text);
    }
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Bold700Text style={styles.modalText}>{message}</Bold700Text>
          <RTextInput
            label={label}
            mode="outlined"
            activeOutlineColor={Colors.primary}
            outlineColor={Colors.primary}
            style={{ backgroundColor: 'white', width: 100, marginBottom: 15, fontSize: RFValue(14)}}
            textColor={Colors.black}
            keyboardType="decimal-pad"
            value={value}
            onChangeText={handleChangeText} 
            autoFocus={true}
          />
          <View style={styles.modal_confirm_cancel_buttons_container}>
            <TouchableOpacity
              onPress={onClose}
              activeOpacity={0.7}
              style={[styles.modal_buttons, { borderColor: Colors.delete_red, backgroundColor: Colors.delete_red }]}
            >
              <Medium500Text
                style={[styles.modalButtonText, { color: Colors.white }]}
              >
                {cancelText}
              </Medium500Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onConfirm}
              activeOpacity={0.7}
              style={[
                styles.modal_buttons,
                {
                  backgroundColor: Colors.white,
                  borderColor: Colors.primary
                },
              ]}
            >
              <Medium500Text
                style={[styles.modalButtonText, { color: Colors.primary }]}
              >
                {confirmText}
              </Medium500Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: scale(20),
    alignItems: "center",
    marginTop: '-60%'
  },
  modalText: {
    fontSize: RFValue(16),
    marginBottom: 15,
    textAlign: "center",
  },
  modalButtonText: {
    fontSize: RFValue(12),
  },
  modal_buttons: {
    borderWidth: 1,
    paddingVertical: scale(10),
    width: scale(80),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: scale(10),
  },
  modal_confirm_cancel_buttons_container: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: scale(20),
    marginTop: verticalScale(10),
  },
});

export default EditModal;