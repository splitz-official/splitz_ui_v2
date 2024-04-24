import { ActivityIndicator, KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import ProfilePicture from 'react-native-profile-picture';
import randomColor from 'randomcolor';
import { scale } from 'react-native-size-matters';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

import Screen from '../../../Components/Screen'
import TopLogo from '../../../Components/TopLogo'
import Back_button from '../../../Components/Back_button'
import { useAxios } from '../../../Axios/axiosContext';
import Colors from '../../../Config/Colors';
import Edit_profile_text_fields from './Components/Edit_profile_text_fields';

//keyboard avoiding view not working fix later!

const Edit_profile = () => {

    const { userData, axiosInstance, setUpdateCount } = useAxios();
    const { navigate } = useNavigation();
    const [loading, setLoading] = useState(false);
    const timeoutRef = useRef(null);

    const [editingprofile, setEditingProfile] = useState(false);
    const [profile_color, setProfile_color] = useState(randomColor({luminosity: 'dark'}));


    const [initialname, setInitialName] = useState(userData.name);
    const [initialemail, setInitialEmail] = useState(userData.email);
    // console.log(initialemail, initialname)

    const [name, setName] = useState(userData.name);
    const [email, setEmail] = useState(userData.email);
    // console.log(email, name);

    useEffect(()=> {
        return ()=> {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

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

    if (loading) {
        return (
        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
            <ActivityIndicator size={'large'} color={Colors.primary}/>
        </View>
        )
    }

  return (
    <Screen style={{backgroundColor: Colors.white}}>
        {/* <TopLogo/> */}
        {editingprofile ? <View style={{height: RFPercentage(6)}}/> : <Back_button title={'Back'} onPress={()=>navigate('profile')}/>}
        {loading && <ActivityIndicator style={{position:'absolute', top: .5, bottom: .5, left: .5, right: .5}}size={'large'} color={Colors.primary}/>}
        <KeyboardAvoidingView behavior='height' style={styles.container}>
            <View style={styles.top_title_icon}>
                <Text style={styles.title}>Edit Profile</Text>
                {editingprofile ? (
                    <TouchableOpacity activeOpacity={.8} style={{justifyContent: 'center', alignItems: 'center'}}onPress={handleSubmit}>
                        <Text style={{fontSize: RFValue(14), color: Colors.primary, fontFamily: 'DMSans_500Medium'}}>Done</Text>
                    </TouchableOpacity>
                ): (
                    <TouchableOpacity 
                    activeOpacity={.8}
                    style={{alignItems: 'center', justifyContent: 'center'}}
                    onPress={()=>setEditingProfile(true)}>
                        <FontAwesome name="circle" size={RFValue(45)} color={Colors.primary} />
                        <View style={{position: 'absolute'}}>
                            <Entypo name="edit" size={RFValue(24)} color="white" />
                        </View>
                    </TouchableOpacity>
                )}
            </View>
            <View style={styles.profile_picture}>
                <ProfilePicture 
                    isPicture={false}
                    user={userData.name}
                    width={RFPercentage(15)}
                    height={RFPercentage(15)}
                    pictureStyle={{
                        borderWidth: 2,
                        borderColor: 'white'
                    }}
                    backgroundColor={profile_color}
                    userTextStyle={styles.profile_pic_text}
                    />
            </View>
            <View>
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
        alignItems: 'center'
    },
    title: {
        fontFamily: 'DMSans_700Bold',
        fontSize: RFValue(18),
    },
    profile_picture: {
        // justifyContent: 'center',
        alignItems: 'center',
        // borderWidth: 2,
        marginTop: scale(20),
        marginBottom: scale(30)
    },
    profile_pic_text: {
        fontSize: RFValue(45)
    }
})

export default Edit_profile
