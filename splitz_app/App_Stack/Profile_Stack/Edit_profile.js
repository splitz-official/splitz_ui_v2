import { ActivityIndicator, Image, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import ProfilePicture from 'react-native-profile-picture';
import randomColor from 'randomcolor';
import { scale, verticalScale } from 'react-native-size-matters';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import * as ImagePicker from 'expo-image-picker';

import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

import Screen from '../../../Components/Screen'
import TopLogo from '../../../Components/TopLogo'
import Back_button from '../../../Components/Back_button'
import { useAxios } from '../../../Axios/axiosContext';
import Colors from '../../../Config/Colors';
import Edit_profile_text_fields from './Components/Edit_profile_text_fields';

//keyboard avoiding view not working fix later!

const Edit_profile = () => {

    const { userData, axiosInstance, setUpdateCount } = useAxios();
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const timeoutRef = useRef(null);

    const [editingprofile, setEditingProfile] = useState(false);
    const [profile_color, setProfile_color] = useState(randomColor({luminosity: 'dark', hue: 'green'}));


    const [initialname, setInitialName] = useState(userData.name);
    const [initialemail, setInitialEmail] = useState(userData.email);
    // console.log(initialemail, initialname)

    const [name, setName] = useState(userData.name);
    const [email, setEmail] = useState(userData.email);
    const [image, setImage] = useState(userData.profile_picture_url);
    // console.log(userData);
    // console.log(name, email, image);

    useEffect(()=> {
        return ()=> {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    function getInitials(fullName) {
        const parts = fullName.trim().split(' '); 
        const initials = parts.slice(0,2).map(part => part.charAt(0).toUpperCase());  
        return initials.join(''); 
    }

    const handleSubmit = async () => {
        if(name !== initialname && name.trim() !== '' || email !== initialemail && email.trim() !== '') {
            setLoading(true);
            const updatedData = {
                ...(name !== initialname && name.trim() !== '' && { name: name.trim()}),
                ...(email !== initialemail && email.trim() !== '' && { email: email.trim() })
            };
            timeoutRef.current = setTimeout( async ()=> {
            console.log(updatedData);
            try {
                console.log("From Edit_profile screen: submitting changes");
                const response = await axiosInstance.put('/user/update', updatedData);
                console.log(response.data);
                setInitialName(name);
                setInitialEmail(email);
                setUpdateCount(count => count + 1);
            } catch (error) {
                console.log(error("From Edit_profile screen: Failed to update uesr"))
            } finally{
                setEditingProfile(false);
                setLoading(false);
                timeoutRef.current = null;
            }
        }, 800);
        } else {
            console.log("no Changes made");
            setEditingProfile(false)
        }
    }

    const addImage = async () => {
        console.log("Handle Upload Pressed")
        const mediaLibraryPermissions = await ImagePicker.requestMediaLibraryPermissionsAsync();
        // console.log(mediaLibraryPermissions);
        
        if (mediaLibraryPermissions.granted === false) {
            Alert.alert("Access Denied, Please allow access to your photos to use this feature!");
            return;
        }

        let _image = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4,3],
            quality:.5
        });

        if (!_image.canceled) {
            setLoading(true);
            const selectedImage = _image.assets[0].uri;
            console.log(selectedImage);
            const formData = new FormData();
            formData.append("profile_picture", {
                uri: selectedImage,
                type: "image/jpeg",
                name: "profile_picture.jpg"
            });
            await axiosInstance.post('/user/upload-profile-picture', formData)
            .then((response) => {
                console.log(response);
                setUpdateCount(count => count + 1);
            })
            .catch((error) => {
                console.log("Upload Error: ", error);
            })
            .finally(()=>{
                setLoading(false);
            })
        }
    }

    if (loading) {
        return (
        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
            <ActivityIndicator size={'large'} color={Colors.primary}/>
        </View>
        )
    }

  return (
    <Screen>
        {/* <TopLogo/> */}
        <Back_button title={'Back'} onPress={()=> navigation.navigate('profile')} disabled={editingprofile}/>
        <KeyboardAvoidingView behavior='padding' style={styles.container} keyboardVerticalOffset={verticalScale(10)}>
            <View style={styles.top_title_icon}>
                <Text style={styles.title}>Edit Profile</Text>
                {editingprofile ? (
                    <TouchableOpacity activeOpacity={.8} style={styles.edit_icon}onPress={handleSubmit}>
                        <Text style={{fontSize: RFValue(14), color: Colors.primary, fontFamily: 'DMSans_500Medium'}}>Done</Text>
                    </TouchableOpacity>
                ): (
                    <TouchableOpacity 
                    activeOpacity={.8}
                    style={styles.edit_icon}
                    onPress={()=>setEditingProfile(true)}>
                        <FontAwesome name="circle" size={RFValue(45)} color={Colors.primary} />
                        <View style={{position: 'absolute'}}>
                            <Entypo name="edit" size={RFValue(24)} color="white" />
                        </View>
                    </TouchableOpacity>
                )}
            </View>
            <ScrollView style={{flexGrow: 1}} showsVerticalScrollIndicator={false}>
            <View style={[styles.image_outer_container]}>
                <View style={styles.image_inner_container}>
                    {image ? (
                        <Image resizeMode='cover' source={{uri: image}} style={styles.imageStyle} /> 
                    ) : (
                        <View style={[styles.imageStyle, {backgroundColor: profile_color}]}>
                            <Text style={styles.no_image_text}>{getInitials(name)}</Text>
                        </View>
                    )}
                    <View style={styles.btn_container}>
                        <TouchableOpacity onPress={addImage} style={styles.uploadBtn}>
                            <Text style={{ fontSize: RFValue(10) }}>{image ? 'Edit' : 'Upload'} Image</Text>
                            <AntDesign name="camera" size={scale(18)} color="black" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={{marginTop: '5%'}}>
                <Edit_profile_text_fields 
                description={'Display name:'}
                placeholder_value={userData?.name ?? 'Name'}
                onChangeText={setName}
                editable={editingprofile}
                placeholderColor={Colors.black}
                />
                <Edit_profile_text_fields 
                description={'Email:'}
                placeholder_value={userData?.email ?? 'Email'}
                onChangeText={setEmail}
                editable={editingprofile}
                placeholderColor={Colors.black}
                />
                <Edit_profile_text_fields 
                description={'Username:'}
                placeholder_value={`@${userData?.username ?? 'Username'}`}
                extra_style={{color: Colors.textgray}}
                editable={false}
                placeholderColor={Colors.textgray}
                />
                <Edit_profile_text_fields 
                description={'Phone Number:'}
                placeholder_value={userData?.phone_number ?? 'Phone Number'}
                extra_style={{color: Colors.textgray}}
                editable={false}
                placeholderColor={Colors.textgray}
                />
            </View>
        </ScrollView>
        </KeyboardAvoidingView>
    </Screen>
  )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: '6%',
        flex: 1
    },
    top_title_icon: {
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '8%'
    },
    title: {
        fontFamily: 'DMSans_700Bold',
        fontSize: RFValue(18),
    },
    image_outer_container: {
        // justifyContent: 'center',
        alignItems: 'center',
        // borderWidth: 2,
        marginTop: '15%',
        marginBottom: scale(20)
    },
    edit_icon: {
        alignItems: 'center', 
        justifyContent: 'center', 
        position: 'absolute',
        right: scale(5),
        // borderWidth: 1, 
    },
    image_inner_container: {
        height: scale(150),
        width: scale(150),
        // borderWidth: 1,
        // borderColor: 'blue',
        borderRadius: 999,
        overflow: 'hidden',
        backgroundColor: Colors.white
    },
    btn_container: {
        position: 'absolute',
        opacity: .7,
        bottom: 0,
        width: '100%',
        height: '25%',
        // borderWidth: 1,
        backgroundColor: 'lightgrey'
    },
    uploadBtn: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    imageStyle: {
        flex: 1,
        // borderWidth: 2,
        // borderColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center',
    },
    no_image_text: {
        fontSize: RFValue(75),
        color: Colors.white
    }
})

export default Edit_profile
