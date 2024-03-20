import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { SafeAreaView, Text, StyleSheet, View, TouchableOpacity, FlatList } from 'react-native';
import axios from 'axios';
import * as SecureStore from "expo-secure-store";
import ProfilePicture from 'react-native-profile-picture';
import { LinearGradient } from 'expo-linear-gradient';

import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';


import Screen from '../../../Components/Screen';
import Colors from '../../../Config/Colors';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import Large_button from './Components/Large_button';

//user actual name not placeholder(add this in)

function Profile(props) {
    const { navigate } = useNavigation();

    const logout = async () => {
        try {
            //ask Nikhil about needing to add backend call
            await SecureStore.deleteItemAsync('access_token');
            navigate('Landing_Screen');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    

    const buttonData = [
        { 
            id: '1', 
            title: 'Edit Profile', 
            IconComponent: <MaterialIcons name="edit" size={RFPercentage(4)} color={Colors.primary} />, 
        },
        { 
            id: '2', 
            title: 'Settings', 
            IconComponent: <Ionicons name="settings-sharp" size={RFPercentage(4)} color={Colors.primary} />, 
        },
        { 
            id: '3', 
            title: 'Invite Someone', 
            IconComponent: <Feather name="share" size={RFPercentage(4)} color={Colors.primary} />, 
        },
        { 
            id: '4', 
            title: 'Send feedback', 
            IconComponent: <MaterialIcons name="feedback" size={RFPercentage(4)} color={Colors.primary} />, 
        },
    ];

    const renderButton = ({ item }) => (
        <Large_button Iconcomponent={item.IconComponent} title={item.title} />
    );

    const renderLogoutButton = () => (
        <TouchableOpacity onPress={logout}>
            <Text style={{
                color: 'red',
                fontSize: RFValue(14),
                paddingLeft: RFPercentage(3),
                marginTop: 20,
                fontFamily: 'DMSans_700Bold'
            }}>Logout</Text>
        </TouchableOpacity>
    );

    return (
        <LinearGradient colors={['#005D1A','#C1EBCD']} 
        start={{ x: 0.5, y: 1 }}
        end={{ x: .5, y: 0 }}
        style={{flex:1}}>
            <Screen>
                <View style={styles.add_friend_icon_container}>
                    <TouchableOpacity activeOpacity={.8} style={styles.add_friend_icon}>
                        <Feather name="user-plus" size={RFValue(18)} color="black" />
                    </TouchableOpacity>
                </View>
                <View style={styles.top_container}>
                    <ProfilePicture 
                    isPicture={true}
                    requirePicture={require('../../../placeholder_images/Rainer.png')}
                    width={RFPercentage(15)}
                    height={RFPercentage(15)}
                    pictureStyle={{
                        borderWidth: 2,
                        borderColor: 'white'
                    }}
                    />
                    <Text style={styles.name}>Rainer Setiawan</Text>
                    <Text style={styles.username}>@rainersetiawan</Text>
                </View>
                <View style={styles.bottom_container}>
                    <FlatList 
                        data={buttonData}
                        renderItem={renderButton}
                        keyExtractor={item => item.id}
                        ListFooterComponent={renderLogoutButton}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
                {/* <View style={styles.bottom_container}>
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
                    <TouchableOpacity
                    onPress={logout}>
                        <Text style={{
                            color: 'red',
                            fontSize: RFValue(14),
                            paddingLeft: 30,
                            marginTop: 10,
                            fontFamily: 'DMSans_700Bold'
                        }}>Logout</Text>
                    </TouchableOpacity>
                </View> */}
            </Screen>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    add_friend_icon_container: {
        justifyContent:'flex-end',
        flexDirection: 'row',
        paddingRight: RFValue(35),
        marginTop: 35,
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