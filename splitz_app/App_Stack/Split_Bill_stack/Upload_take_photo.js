import { ActivityIndicator, Alert, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize'
import { scale } from 'react-native-size-matters';
import * as ImagePicker from 'expo-image-picker';
import LottieView from 'lottie-react-native';

import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

//users: [{id: 1, name: "charles"}, {id: 2, name: "Ray"}] [{name: "Charles"}, {name: "Ray"}]
//TODO LIST: 
//ADD CONDITION FOR WHEN THERE IS NO ROOM CODE

import Screen from '../../../Components/Screen'
import Back_button from '../../../Components/Back_button'
import Colors from '../../../Config/Colors';
import Large_green_outline_button from '../../../Components/Large_green_outline_button';
import { useAxios } from '../../../Axios/axiosContext';
import { Medium500Text } from '../../../Config/AppText';


const Upload_take_photo = () => {

    const {axiosInstance} = useAxios();
    const navigation = useNavigation();
    const route = useRoute();
    const { room_code = null, participants = null } = route.params || {};
    console.log(route.params);
    // console.log(room_code);

    const [receiptname, setReceiptName] = useState('');
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

        uploadImage(pickerResult);
    }

    const handleUploadPress = async () => {
        console.log("Handle Upload Pressed")
        const mediaLibraryPermissions = await ImagePicker.requestMediaLibraryPermissionsAsync();
        
        if (mediaLibraryPermissions.granted === false) {
            Alert.alert("Access Denied, Please allow access to your photos to use this feature!");
            return;
        }
        
        const pickerResult = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [16,9],
            quality: 1
        });
        
        uploadImage(pickerResult);
    }

    const uploadImage = async (pickerResult) => {
        if (pickerResult.canceled) {
            console.log("user canceled image pick")
            return;
        }

        if (!pickerResult.canceled && pickerResult.assets && pickerResult.assets.length > 0) {
            setLoading(true);
            // console.log(pickerResult.assets[0].uri);
            const selectedImage = pickerResult.assets[0].uri;
            console.log("From uploadPress", selectedImage);
            const formData = new FormData();
            formData.append("receipt_img", {
                uri: selectedImage,
                type: "image/jpeg",
                name: "receipt.jpg"
            });
            const json_data = {
                room_code: room_code,
                receipt_name: receiptname,
                user_list: participants
            }
            formData.append("data", JSON.stringify(json_data));

            axiosInstance
                .post(`/receipts/upload-receipt`, formData)
                .then((uploadresponse) => {
                    console.log(uploadresponse.data);
                    if(room_code) {
                        console.log("Upload receipt successful: ", uploadresponse.data);
                        navigation.navigate('Receipt_items', { 
                            receipt_id: uploadresponse.data.id, 
                            room_code: uploadresponse.data.room_code
                        })
                    } else {
                        console.log("Upload receipt successful no room_code: ", uploadresponse.data);
                        navigation.navigate('Quick_split', {
                            receipt_id: uploadresponse.data.id
                        })
                    }
                }).catch((error) => {
                    console.log("Error from upload Image function:", error);
                }).finally(()=> {
                    setLoading(false);
                })
        } else {
            setLoading(false);
        }
    }

  return (
    <Screen>
        {loading ? (
            <View style={styles.loading_container}>
                {/* <ActivityIndicator size={'large'} color={Colors.primary}/> */}
                <LottieView 
                source={require('../../../assets/loading_bar_animation.json')} 
                autoPlay={true}
                resizeMode='contain'
                style={{width: '100%', height: '40%'}}/>
                <Text style = {styles.loading_text}>We are processing your receipt, you will be redirected soon!</Text>
            </View>
        ): (
        <>
        <Back_button onPress={()=> navigation.goBack()} title={"Back"}/>
        <KeyboardAvoidingView style={{flex: 1}} behavior='height'>
        <View style={{flex:1}}>
            <View style={styles.container}>
                <TextInput 
                    style={styles.text_input}
                    placeholder={`What's this for?`}
                    placeholderTextColor={Colors.textInputPlaceholder}
                    maxLength={20}
                    value={receiptname}
                    onChangeText={setReceiptName}
                    autoFocus={true}
                    keyboardType='default'
                    autoCorrect={false}
                    />
                <View style={styles.bottom_line}/>
            <TouchableOpacity style={{}} activeOpacity={.5}>
                <Medium500Text style={styles.manual_entry}>Enter items manually</Medium500Text>
            </TouchableOpacity>
            </View>
            {/* <TouchableOpacity onPress={()=> navigation.navigate("Quick_split")}>
                <Text>GO TO RECEIPT - FOR DEVELOPMENT ONLY</Text>
            </TouchableOpacity> */}
            <View style={{flexDirection: 'row', position: 'absolute', bottom: 0, backgroundColor: 'transparent'}}>
                <Large_green_outline_button 
                title={'Upload Receipt'} 
                icon_component={<MaterialIcons name="perm-media" size={scale(16)} color={Colors.mediumgray} />}
                disabled={receiptname.trim()===''}
                onPress={handleUploadPress}
                />
                <Large_green_outline_button 
                title={'Scan Receipt'} 
                icon_component={<Feather name="camera" size={scale(16)} color={Colors.mediumgray} />}
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
        marginBottom: scale(5)
    },
    manual_entry: {
        textAlign: 'right',
        fontSize: RFValue(12),
        color: Colors.primary,
        // borderWidth: 1
    },
    loading_container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        // backgroundColor: 'transparent'
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
        textAlign: 'center',
        // borderWidth: 1,
        // flex: 1
    }
})

export default Upload_take_photo
