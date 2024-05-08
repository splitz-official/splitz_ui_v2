import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView, Text, StyleSheet, View, TouchableOpacity, FlatList, Modal, TextInput, Button, Touchable, Image, ScrollView, Alert, Share } from 'react-native';
import * as SecureStore from "expo-secure-store";
import ProfilePicture from 'react-native-profile-picture';
import { LinearGradient } from 'expo-linear-gradient';
import randomColor from 'randomcolor';
import Toast from 'react-native-toast-message';
import * as Haptics from 'expo-haptics';
import { Linking } from 'react-native';


import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';


import Screen from '../../../Components/Screen';
import Colors from '../../../Config/Colors';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import Large_button from './Components/Large_button';
import TopLogo from '../../../Components/TopLogo';
import { useAxios } from '../../../Axios/axiosContext';
import LinearGradient_background from '../../../Components/LinearGradient_background';
import Back_button from '../../../Components/Back_button';
import { scale, verticalScale } from 'react-native-size-matters';
import User_list_item from './Components/User_list_item';
import Profile_picture from '../../../Components/Profile_picture';


function Profile(props) {
    const navigation = useNavigation();
    const { userData, axiosInstance } = useAxios();
    // console.log("From Profile.js: " + userData)

    const name = userData.name;
    const username = userData.username;
    const profile_pic = userData.profile_picture_url;
    // const image = null;
    
    const [profile_color, setProfile_color] = useState(randomColor({luminosity: 'dark', hue: 'green'}));
    const [logoutmodalVisible, setLogoutModalVisible] = useState(false);
    const [friendmodalVisible, setFriendModalVisible] = useState(false);
    const [friendSearch, setFriendSearch] = useState('');
    const [usersList, setUsersList] = useState([]);
    const [filterdUsers, setFilteredUsers] = useState([]);
    const [friends, setFriends] = useState([]);
    const [test, setTest] = useState([]);

    const userListSearchRef = useRef();
    
    const addFriend = async (userID) => {
        try {
            const response = await axiosInstance.post(`/user/add-friend`, {
                friend_id: userID
            });
            fetchFriends();
            Toast.show({
                type: 'success',
                text1: 'Friend added!',
                position: 'top',
                topOffset: verticalScale(45),
                autoHide: true,
                visibilityTime: 1000
            })
            console.log("Friend added");
        } catch (error) {
            console.log("Error: ", error);
        }
    }

    const onShare = async () => {
        try {
            const result = await Share.share({
                message:
                "Omada | An app that revolutionizes the way friends split bills",
                url: "https://splitzcompany.wixstudio.io/splitz"
            });
            if (result.action === Share.sharedAction) {
                if(result.activityType) {

                } else {

                }
            } else if (result.action ===Share.dismissedAction) {

            }
        } catch (error) {
            Alert.alert(error.message);
        }
    }

    const logout = async () => {
        try {
            await SecureStore.deleteItemAsync('access_token');
            axiosInstance.setAuthToken('');
            setLogoutModalVisible(false)
            navigation.navigate('Landing_Screen');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    useEffect(() => {
        if (friendmodalVisible) {
            fetchUsers();
            fetchFriends();
        }
    }, [friendmodalVisible]);

    const fetchUsers = async () => {
        try {
            const response = await axiosInstance.get('/user/list');
            const usersExcludingSelf = response.data.filter(user => user.id !== userData.id)
            setTest(response.data);
            setUsersList(usersExcludingSelf);
            setFilteredUsers(usersExcludingSelf);
            // console.log(response.data)
        } catch (error) {
            console.error('Failed to fetch users:', error);
        }
    };

    function getInitials(fullName) {
        const parts = fullName.trim().split(' '); 
        const initials = parts.slice(0,2).map(part => part.charAt(0).toUpperCase());  
        return initials.join(''); 
    }

    const fetchFriends = async () => {
        try {
            const response = await axiosInstance.get('/user/get-friends');
            setFriends(response.data.map(friend => friend.id));
        } catch (error) {
            console.error('Failed to fetch friends:', error);
        }
    };

    useEffect(() => {
        const filterUsers = () => {
            const filtered = usersList.filter(user => {
                return user.name.toLowerCase().includes(friendSearch.toLowerCase()) ||
                       user.username.toLowerCase().includes(friendSearch.toLowerCase());
            });
            setFilteredUsers(filtered);
        };
        filterUsers();
    }, [friendSearch, usersList]);

    const openURL = async (url) => {
        // Check if the link is supported
        const supported = await Linking.canOpenURL(url);
        if (supported) {
          // Open the link
          await Linking.openURL(url);
        } else {
          Alert.alert(`Don't know how to open this URL: ${url}`);
        }
      };
      

    return (
        <LinearGradient_background>
                <TopLogo/>
                <View style={styles.top_icon_container}>
                    <TouchableOpacity  onPress={() => setLogoutModalVisible(true)} activeOpacity={.5}>
                        <AntDesign name="logout" size={RFValue(16)} color="red" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setFriendModalVisible(true)} activeOpacity={.5} style={styles.add_friend_icon}>
                        <Feather name="user-plus" size={RFValue(18)} color="black" />
                    </TouchableOpacity>
                </View>
                <View style={styles.top_container}>
                    <View style={styles.picture_shadow}>
                        <Profile_picture 
                        image={profile_pic} 
                        name={name} 
                        sizing_style={styles.profile_pic} 
                        text_sizing={{fontSize: RFValue(75)}}/>
                    </View>
                    <Text style={styles.name}>{name}</Text>
                    <Text style={styles.username}>@{username}</Text>
                </View>
                {/* <ScrollView> */}
                <View style={[styles.bottom_container, {}]}>
                    <Large_button 
                    onPress={()=>navigation.navigate('edit_profile')}
                    Iconcomponent={<MaterialIcons name="edit" size={scale(30)} color={Colors.primary} />} 
                    title={'Edit Profile'}/>
                    <Large_button
                    onPress={()=>Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)}
                    Iconcomponent={<Ionicons name="settings-sharp" size={scale(30)} color={Colors.primary} />} 
                    title={'Settings'}/>
                    <Large_button 
                    onPress={onShare}
                    Iconcomponent={<Feather name="share" size={scale(30)} color={Colors.primary} />} 
                    title={'Invite Someone'}/>
                    <Large_button 
                    onPress={()=>openURL('https://splitzcompany.wixstudio.io/splitz')}
                    Iconcomponent={<Ionicons name="information-circle-outline" size={scale(30)} color={Colors.primary} />} 
                    title={'Learn More'}/>
                    <Large_button 
                    onPress={()=> openURL('https://forms.gle/gFRnaPcdQqgBed6Z8')}
                    Iconcomponent={<MaterialIcons name="feedback" size={scale(30)} color={Colors.primary} />} 
                    title={'Send feedback'}/>
                </View>
                {/* </ScrollView> */}
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={logoutmodalVisible}
                    onRequestClose={() => {
                        setLogoutModalVisible(false);
                    }}
                >
                    <View style={styles.modal_centeredView}>
                        <View style={styles.modalView}>
                            <Text style={{
                                fontFamily: 'DMSans_500Medium',
                                fontSize: RFValue(14),
                                marginBottom: 10
                            }}
                            >Are you sure you want to log out?</Text>
                            <View style={styles.modal_buttonsContainer}>
                                <TouchableOpacity
                                    style={[styles.modal_buttons]}
                                    onPress={() => setLogoutModalVisible(false)}
                                >
                                    <Text style={styles.modal_text}>No, stay in</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.modal_buttons]}
                                    onPress={logout}
                                >
                                    <Text style={styles.modal_text}>Yes, logout</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
                <Modal
                animationType="slide"
                transparent={true}
                visible={friendmodalVisible}
                onRequestClose={() => {
                    setModalVisible(false);
                }}
                >
                    <Screen>
                        <Toast />
                        <Back_button onPress={()=> setFriendModalVisible(false)}/>
                        <View style={{flex: 1, marginHorizontal: '6%'}}>
                            <TouchableOpacity onPress={()=> userListSearchRef.current.focus()} activeOpacity={1} style={styles.friend_search_input_container}>
                                <FontAwesome name="search" size={scale(20)} color={Colors.primary} />
                                <TextInput 
                                style = {styles.friend_search_input}
                                placeholder='Name, @username'
                                placeholderTextColor={Colors.textgray}
                                maxLength={25}
                                value={friendSearch}
                                onChangeText={setFriendSearch}
                                autoFocus={true}
                                keyboardType='default'
                                autoCorrect={false}
                                ref={userListSearchRef}
                                />
                            </TouchableOpacity>
                            <FlatList 
                            data={filterdUsers}
                            keyExtractor={(item) => item.id.toString()}
                            style={styles.usersList}
                            renderItem={({ item }) => (
                                <User_list_item 
                                name={item.name} 
                                username={item.username} 
                                onPress={()=>addFriend(item.id)} 
                                alreadyFriends={friends.includes(item.id)}
                                image={item.profile_picture_url}
                                initials={getInitials(item.name)}
                                />
                            )}
                            />
                        </View>
                    </Screen>
                </Modal>
        </LinearGradient_background>
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
        // borderWidth: 1
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
        // borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    profile_text: {
        fontSize: RFValue(45)
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
        marginHorizontal: scale(20),
        marginTop: '10%',
        borderTopRightRadius: scale(20),
        borderTopLeftRadius: scale(20),
        paddingHorizontal: '5%',
        paddingVertical: '2%'
    },
    modalView: {
        backgroundColor: "white",
        borderRadius: 20,
        paddingVertical: 30,
        paddingHorizontal: 30,
        alignItems: "center",
        justifyContent: 'center',
        shadowColor: Colors.darkgray,
        shadowOffset: {
            width: 5,
            height: 10
        },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        // borderWidth: 5,
        // borderColor: 'blue'
    },
    modal_centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    modal_buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15,
        width: RFPercentage(30),
        // borderWidth: 2
    },
    modal_buttons: {
        backgroundColor: Colors.primary,
        height: RFPercentage(5),
        width: RFPercentage(13),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    modal_text: {
        color: 'white',
        fontSize: RFValue(12),
        fontFamily: 'DMSans_500Medium'
    },
    friend_modal: {
        flex: 1,
    },
    friend_search_input_container: {
        borderWidth: 1,
        padding: scale(10),
        borderRadius: 25,
        borderColor: Colors.primary,
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: '5%',
        marginTop: '5%'
    },
    friend_search_input: {
        marginLeft: scale(10),
        fontSize: RFValue(12),
        fontFamily: 'DMSans_400Regular',
    },
    usersList: {
        flex: 1,
        marginTop: scale(20)
    },
    profile_pic: {
        height: scale(150), 
        width: scale(150), 
        borderWidth: 2,
        borderColor: 'white',
    },
    picture_shadow: {
        shadowColor: Colors.black,
        shadowOpacity: .5,
        shadowRadius:4,
        shadowOffset: {
            height: 5,
        }
    }
})

export default Profile;