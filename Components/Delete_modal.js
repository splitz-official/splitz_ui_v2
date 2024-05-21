import React from "react";
import { StyleSheet, Text, View, Modal, TouchableOpacity } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { scale, verticalScale } from "react-native-size-matters";

import { Bold700Text, Medium500Text } from "../Config/AppText";
import Colors from "../Config/Colors";

const DeleteModal = ({
  visible,
  onClose,
  onConfirm,
  title,
  message,
  confirmText,
  cancelText,
}) => {
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
          <View style={styles.modal_confirm_cancel_buttons_container}>
            <TouchableOpacity
              onPress={onClose}
              activeOpacity={.7}
              style={[styles.modal_buttons, { borderColor: Colors.primary }]}
            >
              <Medium500Text
                style={[styles.modalButtonText, { color: Colors.primary }]}
              >
                {cancelText}
              </Medium500Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onConfirm}
              activeOpacity={.7}
              style={[
                styles.modal_buttons,
                {
                  backgroundColor: Colors.delete_red,
                  borderColor: Colors.delete_red,
                },
              ]}
            >
              <Medium500Text
                style={[styles.modalButtonText, { color: Colors.white }]}
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
  },
  modalText: {
    fontSize: RFValue(16),
    marginBottom: 20,
    textAlign: "center",
  },
  modalButtonText: {
    fontSize: RFValue(12),
  },
  modal_buttons: {
    // borderColor: Colors.primary,
    borderWidth: 1,
    paddingVertical: scale(10),
    width: scale(80),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: scale(10),
  },
  modal_confirm_cancel_buttons_container: {
    flexDirection: "row",
    // borderWidth: 1,
    // flex: 1,
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    // paddingBottom: verticalScale(15),
    paddingHorizontal: scale(20),
    marginTop: verticalScale(10),
  },
});

export default DeleteModal;
