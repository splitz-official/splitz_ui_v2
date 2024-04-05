import { KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View, TouchableWithoutFeedback, Keyboard, Alert, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize'
import { useRoute } from '@react-navigation/native'

import { MaterialCommunityIcons } from '@expo/vector-icons';

import Screen from '../../../Components/Screen'
import Back_button from '../../../Components/Back_button'
import Colors from '../../../Config/Colors'
import Large_green_button from '../../../Components/Large_green_button'
import { scale } from 'react-native-size-matters'
import ToggleSwitch from '../../../Components/ToggleSwitch'

const Create_Group_password = () => {
    const route = useRoute();
    const groupName = route.params?.groupName || "Default Group Name";

    const { navigate } = useNavigation();
    const [isPasswordEnabled, setIsPasswordEnabled] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    

    const handleToggle = () => {
        setIsPasswordEnabled(!isPasswordEnabled);
    };

    const isCreateButtonEnabled = () => {
        if (!isPasswordEnabled) return true;
        return password === confirmPassword && password.length > 0;
    };

    const handleCreateGroup = () => {
        // Check if password is enabled and if passwords match
        if (isPasswordEnabled && (password !== confirmPassword)) {
            // Alert the user that passwords do not match
            Alert.alert("Password Mismatch", "The passwords you entered do not match. Please try again.");
            return; // Stop the execution further
        }

        // Proceed with your group creation logic here
        // navigate(...) or any other logic you have for creating the group
    };

    return (
            <Screen>
                <Back_button 
                    onPress={() => navigate('home')}
                    title={'Home'}
                />
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{flex: 1}}>
        <View style={styles.flexContainer}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View>
                    <View style={styles.top_container}>
                        <View style={styles.image}/>
                        <View style={styles.input_box}>
                            <Text style={styles.Group_name_input}>{groupName}</Text>
                            <View style={styles.bottom_line}/>
                        </View>
                    </View>

                    <View>
                        <View style={styles.password_container}>
                            <Text style={styles.title_text}>Enable password?</Text>
                            <ToggleSwitch isEnabled={isPasswordEnabled} onToggle={handleToggle} />
                        </View>
                        {isPasswordEnabled && (
                            <>
                                <View style={styles.password_container}>
                                    <Text style={styles.title_text}>Password:</Text>
                                    <TextInput 
                                        style={styles.textInput}
                                        maxLength={20}
                                        value={password}
                                        onChangeText={setPassword}
                                        secureTextEntry
                                    />
                                </View>
                                <View style={styles.password_container}>
                                    <Text style={styles.title_text}>Confirm:</Text>
                                    <TextInput 
                                        style={styles.textInput}
                                        maxLength={20}
                                        value={confirmPassword}
                                        onChangeText={setConfirmPassword}
                                        secureTextEntry
                                    />
                                </View>
                            </>
                        )}
                    </View>
                </View>
                    </TouchableWithoutFeedback>
                </ScrollView>
                <Large_green_button 
                        title={'Create'}
                        onPress={handleCreateGroup}
                        disabled={!isCreateButtonEnabled()}
                    />
                    </View>
            </KeyboardAvoidingView>
            </Screen>
    );
};

const styles = StyleSheet.create({
    top_container: {
        flexDirection: "row",
        marginHorizontal: "6%",
        marginTop: "5%",
    },
    bottom_container: {
        marginHorizontal: '6%',
        marginTop: "2%",
        flexDirection: "row",
    },
    password_container: {
        flexDirection: "row",
        alignItems: 'center',
        marginHorizontal: "6%",
        marginTop: scale(25),
    },
    image: {
        height: RFPercentage(8),
        width: RFPercentage(8),
        borderRadius: RFPercentage(4),
        borderWidth: 2,
        borderColor: Colors.primary,
        marginBottom: 8,
    },
    title_text: {
        width: RFPercentage(20), // Set a fixed width for titles
        fontSize: RFValue(14),
        fontFamily: 'DMSans_700Bold',
    },
    subtitle_text: {
        fontSize: RFValue(18),
        fontFamily: 'DMSans_500Medium',
        marginTop: 20
    },
    textInput: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: Colors.textInputGray,
        fontFamily: 'DMSans_400Regular',
        fontSize: RFValue(12),
        flex: 1, // Adjusted to take up available space rather than specifying width
        maxHeight: RFPercentage(4), // Ensure the height is controlled
        marginRight: 10,
        padding: 5,
    },
    Group_name_input: {
        fontFamily: 'DMSans_700Bold',
        fontSize: RFValue(22),
        marginTop: 10,
        marginBottom: 10,
        color: Colors.primary,
    },
    input_box: {
        flexDirection:"column", 
        marginLeft: 15,
    },
    bottom_line:{
        height: RFPercentage(0.6),
        width: RFPercentage(31),
        backgroundColor: Colors.primary,
    },
    button: {
        borderRadius: 100,
        borderWidth: 1,
        width: 50,
        height: 20,
    },
    flexContainer: {
        flex: 1, // Make sure this container takes up all available space
    },
})

export default Create_Group_password
