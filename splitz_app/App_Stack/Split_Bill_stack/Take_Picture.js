import { StyleSheet, Text, View, Alert, Image, Dimensions, ImageBackground } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import React, { useEffect, useRef, useState, useLayoutEffect } from 'react'

import { Entypo } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

import Screen from '../../../Components/Screen';
import Colors from '../../../Config/Colors';

import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import Button from './Components/Buttons';

// console.log(Dimensions.get('window').width)

const Take_pic = () => {
    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [image, setImage] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
    const cameraRef = useRef(null);

    const navigation = useNavigation();


    useEffect(() => {
      (async () => {
        MediaLibrary.requestPermissionsAsync();
        const cameraStatus = await Camera.requestCameraPermissionsAsync();
        setHasCameraPermission(cameraStatus.status === 'granted')
        console.log(hasCameraPermission)
      })();
    }, [])

    const takePicture = async () => {
      try {
        const data = await cameraRef.current.takePictureAsync();
        console.log(data);
        setImage(data.uri);
      } catch (error) {
        console.log(error)
      }
    }

    const saveImage = async () => {
      if(image) {
        try {
          await MediaLibrary.createAssetAsync(image);
          alert('picture saved!')
          setImage(null);
        } catch (error) {
          console.log(error)
        }
      }
    }

    if(hasCameraPermission === false) {
      Alert.alert('No Camera Access')
    }

  return (
    <Screen style={styles.background}>
      <View style={styles.container}>
        {!image ? 
        <Camera
        style={styles.camera}
        type={type}
        flashMode={flash}
        ref={cameraRef}
        autoFocus={Camera.Constants.AutoFocus}
        >
          <View style={{justifyContent: 'space-between', flex: 1}}>
            <View style={styles.flip_flash_buttons}>
              <Button 
              IconComponent={
              <Ionicons 
                name="chevron-back-outline" 
                size={RFValue(22)} color={Colors.primary} 
                onPress={() => {
                  navigation.navigate('home')
                }} /> 
              }
              button_style={styles.back_button}
              />
              <Button 
              IconComponent={
                <Ionicons 
                name={flash === Camera.Constants.FlashMode.off ? "flash-off" : "flash"}
                size={RFValue(22)} color={flash === Camera.Constants.FlashMode.off ? "gray" : "white"} 
                onPress={() => {
                  setFlash(flash === Camera.Constants.FlashMode.off ? Camera.Constants.FlashMode.on : Camera.Constants.FlashMode.off)
                }}/>
              }
              />
            </View>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Button
              onPress={takePicture} 
              // IconComponent={<Entypo name="camera" size={RFValue(30)} color={Colors.primary} />}
              button_style={styles.take_photo_button}
              />
            </View>
          </View>
        </Camera>
        :
        <ImageBackground style={styles.isImage} source={{uri: image}}>
            <View style={styles.isPictureButtons}>
              <Button
              // title={"Re-take"}
              IconComponent={<Fontisto name="redo" size={RFValue(25)} color="white" onPress={() => setImage(null)}/>}
              />
              <Button
              // title={"Save"}
              IconComponent={<AntDesign name="check" size={RFValue(25)} color="white" onPress={saveImage} />}
              />
          </View>
        </ImageBackground>
        }
      </View>
    </Screen>
  )
}

const styles = StyleSheet.create({
  isImage: {
    justifyContent: 'flex-end',
    flex: 1,
    borderWidth: 2,
    borderColor: 'white'
  },
  background: {
    backgroundColor: Colors.black
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth: 2,
    // borderColor: 'white'
  },
  camera: {
    flex: 1,
    borderRadius: 20,
    width: '100%',
    // borderWidth: 2,
    // borderColor: 'blue'
  },
  take_photo_button: {
    height: RFValue(60),
    width: RFValue(60),
    borderRadius: RFValue(30),
    // backgroundColor: 'white',
    borderWidth: RFValue(6),
    borderColor: Colors.white,
    marginTop: 15,
    marginBottom: 30
  },
  isPictureButtons: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 30,
    width: '100%',
    marginBottom: 30
    // borderWidth: 2,
    // borderColor: 'white',
  },
  flip_flash_buttons: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 30,
    marginTop: 30,
    // borderWidth: 2,
    // borderColor: 'white'
  },
  back_button: {
    backgroundColor: 'white',
    height: RFValue(22),
    width: RFValue(22),
    borderRadius: RFValue(11)
  }
})

export default Take_pic
