import { ActivityIndicator, Alert, KeyboardAvoidingView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize'
import { scale } from 'react-native-size-matters';
import * as ImagePicker from 'expo-image-picker';

import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';


import Screen from '../../../Components/Screen'
import Back_button from '../../../Components/Back_button'
import Colors from '../../../Config/Colors';
import Large_green_outline_button from '../../../Components/Large_green_outline_button';
import { useAxios } from '../../../Axios/axiosContext';

//lottie-react-native for loading screen in the future

const Upload_take_photo = () => {

    const {axiosInstance, axiosInstanceMultipart} = useAxios();
    const navigation = useNavigation();
    const route = useRoute();
    const room_details = route.params.room_details;
    console.log(route.params);

    const [receiptname, setReceiptName] = useState('');
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);


    const handleScanPress = async () => {
        console.log("Handle Scan Pressed")
        const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();

        if (cameraPermission.granted === false) {
            Alert.alert("Access Denied, Please allow camera access to use this feature!");
            return;
        }

        const pickerResult = await ImagePicker.launchCameraAsync({
            allowsEditing: false,
            aspect: [16,9],
            quality: 1
        });

        let imageURI = '';
        if (!pickerResult.canceled && pickerResult.assets && pickerResult.assets.length > 0) {
            console.log(pickerResult.assets[0].uri);
            setImage(pickerResult.assets[0].uri);
            imageURI = pickerResult.assets[0].uri;
        }

        if(route.params.room_details && !pickerResult.canceled && pickerResult.assets && pickerResult.assets.length > 0) {
            const formData = new FormData();
            formData.append("receipt_img", {
                uri: imageURI,
                type: "image/jpeg",
                name: "receipt.jpg"
            });
            axiosInstanceMultipart
            .post(`/receipts/${room_details.room_code}/upload-receipt`, formData)
            .then((response) => {
                res = response.data;
                navigation.navigate('Receipt_details_stack', {
                    screen: 'Receipt_details',
                    params: {receipt: res}
                })
            }).catch((error) => {
                console.log("Error:", error.response ? error.response.data : error.message);
            });
        }
    }

    const handleUploadPress = async () => {
        setLoading(true);
        console.log("Handle Upload Pressed")
        const mediaLibraryPermissions = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (mediaLibraryPermissions.granted === false) {
            Alert.alert("Access Denied, Please allow access to your photos to use this feature!");
            setLoading(false);
            return;
        }

        const pickerResult = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            aspect: [16,9],
            quality: 1
        });

        if (pickerResult.canceled) {
            console.log("User canceled image pick");
            setLoading(false);
            return;
        }

        imageURI = '';
        if (!pickerResult.canceled && pickerResult.assets && pickerResult.assets.length > 0) {
            console.log(pickerResult.assets[0].uri);
            setImage(pickerResult.assets[0].uri);
            imageURI = pickerResult.assets[0].uri;
            console.log("From uploadPress, imageURI set");

            if (route.params.room_details) {
                const formData = new FormData();
                formData.append("receipt_img", {
                    uri: imageURI,
                    type: "image/jpeg",
                    name: "receipt.jpg"
                });
                axiosInstanceMultipart
                .post(`/receipts/${room_details.room_code}/upload-receipt`, formData)
                .then((response) => {
                    res = response.data;
                    navigation.navigate('Receipt_details_stack', {
                        screen: 'Receipt_details',
                        params: {receipt: res}
                    })
                }).catch((error) => {
                    console.log("Error:", error.response ? error.response.data : error.message);
                }).finally(()=> {
                    setLoading(false);
                })
            }
        } else {
            setLoading(false);
        }
    }

  return (
    <Screen>
        {loading ? (
            <View style={styles.loading_container}>
                <ActivityIndicator size={'large'} color={Colors.primary}/>
                <Text style = {styles.loading_text}>We are processing your receipt, you will be redirected soon!</Text>
            </View>
        ): (
        <>
        <Back_button onPress={()=> navigation.goBack()} title={"Edit Participants"}/>
        <KeyboardAvoidingView style={{flex: 1}} behavior='height'>
        <View style={{flex:1}}>
            <View style={styles.container}>
                <TextInput 
                    style={styles.text_input}
                    placeholder={`What's this for?`}
                    placeholderTextColor={Colors.placeholderTextColor}
                    maxLength={20}
                    value={receiptname}
                    onChangeText={setReceiptName}
                    autoFocus={true}
                    keyboardType='default'
                    autoCorrect={false}
                    />
                <View style={styles.bottom_line}/>
            </View>
            <View style={{flexDirection: 'row', position: 'absolute', bottom: 0, backgroundColor: 'transparent'}}>
                <Large_green_outline_button 
                title={'Upload a Receipt'} 
                icon_component={<MaterialIcons name="perm-media" size={scale(18)} color={Colors.primary} />}
                disabled={receiptname.trim()===''}
                onPress={handleUploadPress}
                />
                <Large_green_outline_button 
                title={'Scan a Receipt'} 
                icon_component={<Feather name="camera" size={scale(18)} color={Colors.primary} />}
                disabled={receiptname.trim()===''}
                onPress={handleScanPress}
                />
            </View>
        </View>
        </KeyboardAvoidingView>
        </>
        )}
    </Screen>
  )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: "6%",
        marginTop: '5%',
        // borderWidth: 1,
        // flex: 1,
    },
    text_input: {
        fontFamily: 'DMSans_700Bold',
        fontSize: RFValue(20),
        color: Colors.primary,
        marginTop: scale(10),
        marginBottom: scale(5),
    },
    bottom_line: {
        height: scale(2),
        backgroundColor: Colors.primary,
        marginBottom: scale(10)
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
        width: '80%',
        // borderWidth: 1
    }
})

export default Upload_take_photo
