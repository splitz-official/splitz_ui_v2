import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { SafeAreaView, Text, StyleSheet, View, TouchableOpacity, FlatList } from 'react-native';
import axios from 'axios';
import * as SecureStore from "expo-secure-store";
import ProfilePicture from 'react-native-profile-picture';
import { LinearGradient } from 'expo-linear-gradient';

import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';


import Screen from '../../../Components/Screen';
import Colors from '../../../Config/Colors';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import Large_button from './Components/Large_button';
import TopLogo from '../../../Components/TopLogo';
import { useAxios } from '../../../Axios/axiosContext';
import randomColor from 'randomcolor';

//user actual name not placeholder(add this in)

function Profile(props) {
    const { navigate } = useNavigation();
    const { userData } = useAxios();

    const name = userData.name;
    const username = userData.username;
    const [profile_pic, setProfile_pic] = useState(false);
    //how does work if the user closes the app. Maybe consider storing in securestore or something
    const [profile_color, setProfile_color] = useState(randomColor({luminosity: 'dark'}));
    

    const logout = async () => {
        try {
            await SecureStore.deleteItemAsync('access_token');
            navigate('Landing_Screen');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    return (
        <LinearGradient colors={['#005D1A','#C1EBCD']} 
        start={{ x: 0.5, y: 1 }}
        end={{ x: .5, y: 0 }}
        style={{flex:1}}>
            <Screen>
                <TopLogo/>
                <View style={styles.top_icon_container}>
                    <TouchableOpacity  onPress={logout} activeOpacity={.3}>
                        <AntDesign name="logout" size={RFValue(16)} color="red" />
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={.8} style={styles.add_friend_icon}>
                        <Feather name="user-plus" size={RFValue(18)} color="black" />
                    </TouchableOpacity>
                </View>
                <View style={styles.top_container}>
                    <ProfilePicture 
                    isPicture={profile_pic}
                    user={name}
                    requirePicture={require('../../../placeholder_images/Rainer.png')}
                    width={RFPercentage(15)}
                    height={RFPercentage(15)}
                    pictureStyle={{
                        borderWidth: 2,
                        borderColor: 'white'
                    }}
                    backgroundColor={profile_color}
                    userTextStyle={{
                        fontSize: RFValue(45)
                    }}
                    />
                    {name? 
                    <Text style={styles.name}>{name}</Text>:
                    <Text style={styles.name}>Edit Profile</Text>
                    }
                    {name? 
                    <Text style={styles.username}>@{username}</Text>:
                    <Text style={styles.username}>Edit Profile</Text>
                    }
                </View>
                <View style={styles.bottom_container}>
                    <Large_button 
                    Iconcomponent={<MaterialIcons name="edit" size={RFPercentage(4)} color={Colors.primary} />} 
                    title={'Edit Profile'}/>
                    <Large_button 
                    Iconcomponent={<Ionicons name="settings-sharp" size={RFPercentage(4)} color={Colors.primary} />} 
                    title={'Settings'}/>
                    <Large_button 
                    Iconcomponent={<Feather name="share" size={RFPercentage(4)} color={Colors.primary} />} 
                    title={'Invite Someone'}/>
                    <Large_button 
                    Iconcomponent={<MaterialIcons name="feedback" size={RFPercentage(4)} color={Colors.primary} />} 
                    title={'Send feedback'}/>
                </View>
            </Screen>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    top_icon_container: {
        justifyContent:'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        paddingRight: '10%',
        paddingLeft: '8%',
        // marginTop: 35,
        // borderWidth: 2
    },
    add_friend_icon:{
        backgroundColor: Colors.white,
        height: RFValue(36),
        width: RFValue(36),
        borderRadius: RFValue(18),
        justifyContent: 'center',
        alignItems: 'center',
    },
    top_container: {
        // borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    name: {
        color: Colors.white,
        marginTop: 15,
        marginBottom: 2,
        fontFamily: 'DMSans_700Bold',
        fontSize: RFValue(18),
    },
    username: {
        color: Colors.white,
        fontFamily: 'DMSans_400Regular',
        fontSize: RFValue(12)
    },
    bottom_container: {
        // borderWidth: 2,
        backgroundColor: 'white',
        flex: 1,
        marginHorizontal: 20,
        marginTop: 40,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: RFPercentage(2)
    }
})

export default Profile;