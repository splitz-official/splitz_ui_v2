import { StyleSheet, Text, View, Image, TouchableWithoutFeedback, FlatList, ActivityIndicator, TouchableOpacity, Modal, Share } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { scale, verticalScale } from 'react-native-size-matters'
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native'
import { RFValue } from 'react-native-responsive-fontsize'
import * as Clipboard from 'expo-clipboard';
import Toast from 'react-native-toast-message';
import * as Haptics from 'expo-haptics';
import * as ImagePicker from 'expo-image-picker';

import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

import { useAxios } from '../../../Axios/axiosContext'
import Groups_member_list_item from './Components/Groups_member_list_item'
import Screen from '../../../Components/Screen'
import Back_button from '../../../Components/Back_button'
import Colors from '../../../Config/Colors'
import Large_green_button from '../../../Components/Large_green_button'
import Groups_receipt_list_item from './Components/Groups_receipt_list_item'
import Profile_picture from '../../../Components/Profile_picture'

const Groups_details = () => {

    const { axiosInstance } = useAxios();
    const navigation = useNavigation();
    const route = useRoute();
    // console.log(route.params)
    const { room_code } = route.params;
    // console.log(room_code);
    const [room_details, setRoom_Details] = useState(null);
    const [roomPicture, setRoomPicture] = useState(null);

    const [members, setMembers] = useState([]);
    const [receipts, setReceipts] = useState([]);
    const [mappedReceitps, setMappedReceipts] = useState([]);
    const [receiptsDropDown, setReceiptsDropDown] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [shareModal, setShareModal] = useState(false);
    const [loading, setLoading] = useState(false);
    // console.log(receipts)

    const copyToClipboard = async () => {
        await Clipboard.setStringAsync(room_code);
        Toast.show({
            type: 'success',
            text1: 'Copied to clipboard',
            position: 'top',
            autoHide: true,
            visibilityTime: 1000
        })
    }

    const onShare = async () => {
        try {
            const result = await Share.share({
                message:
                "Omada | An app that revolutionizes the way friends split bills",
                // url: "INSERT URL FOR WEBSITE FOR NOW"
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

    useEffect(()=> {
        const fetchRoomDetails = async () => {
            console.log("Fetching Room Details RUNNING")
            try {
                const response = await axiosInstance.get(`/room/${room_code}`)
                    setRoom_Details(response.data);
                    setRoomPicture(response.data.room_picture_url);
                    // console.log(response.data);
            } catch (error) {
                console.error("Error:", error);
            }
        };
        if (room_code) {
            fetchRoomDetails();
        }
    }, [room_code])

    const fetchRoomMembers = async () => {
        // console.log("Fetching Room Members");
        try {
            const response = await axiosInstance.get(`/room/members/${room_details.id}`);
            setMembers(response.data);
            // const membersMap = {};
            // response.data.forEach(member => membersMap[member.id] = member.name)
            // console.log(membersMap)
            // console.log("Member data: ", response.data)
        } catch (error) {
            console.error('Failed to fetch room members:', error);
        }
    };

    const fetchRoomReceipts = async () => {
        // console.log("Fetching Room Receipts");
        try {
            const response = await axiosInstance.get(`/receipts/room_code/${room_code}`);
            setReceipts(response.data);
            // console.log("Receipt data: ", response.data);
        } catch (error) {
            console.error('Failed to fetch room receipts', error);
        }
    };

    const mapMembersByID = (members, receipts) => {
        const membersMap = {};
        members.forEach(member => {
            membersMap[member.id] = member.name;
        });

        const id_mappedReceipts =  receipts.map(receipt => ({
            ...receipt, 
            ownerName: membersMap[receipt.owner_id]
        }));
        setMappedReceipts(id_mappedReceipts);
    };

    function First_last_initial(fullName) {
        if (!fullName) {
            return;
        }
        const parts = fullName.trim().split(' ');  
        if (parts.length === 1) {
            return parts[0];
        } else {
            const firstName = parts[0];
            const lastNameInitial = parts[1].charAt(0);  
            return `${firstName} ${lastNameInitial}.`; 
        }
    }

    useEffect(() => {
        if (room_details && room_details.id) {
            // console.log("This is running again")
            fetchRoomMembers();
        }
    }, [room_details]);
    
    useFocusEffect(
        useCallback(() => {
            if (room_code) {
                fetchRoomReceipts();
            }
        }, [room_code])
    );

    useEffect(() => {
        if(members && receipts) {
            mapMembersByID(members, receipts);
        }
    }, [members, receipts])

    const updateRoomPicture = async () => {
        console.log("Update Room Picture pressed")
        const mediaLibraryPermissions = await ImagePicker.requestMediaLibraryPermissionsAsync();
        // console.log(mediaLibraryPermissions);
        
        if (mediaLibraryPermissions.granted === false) {
            Alert.alert("Access Denied, Please allow access to your photos to use this feature!");
            return;
        }

        let pickerResult = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4,3],
            quality:.5
        });

        if (!pickerResult.canceled) {
            setLoading(true);
            const selectedImage = pickerResult.assets[0].uri;
            console.log(selectedImage);
            const formData = new FormData();
            formData.append("room_picture", {
                uri: selectedImage,
                type: "image/jpeg",
                name: "room_picture.jpg"
            });
            await axiosInstance.post(`/room/${room_code}/upload-room-picture`, formData)
            .then((response) => {
                console.log(response);
                setRoomPicture(selectedImage);
            })
            .catch((error) => {
                console.log("Upload Error: ", error);
            })
            .finally(()=>{
                setLoading(false);
            })
        }
    }
   

    //is this useful since create group only allows names to be 20 characters
    const truncate = (text, maxLength) => {
        return text.length > maxLength ? text.substring(0, maxLength - 3) + '...' : text;
    };

    // members and receipts dropdown touchable too wide. Adjust this later

    if (!room_details || loading) {
        return (
            <View style={{flex: 1, justifyContent:'center', alignItems: 'center'}}>
                <ActivityIndicator size={"large"} color={Colors.primary}/>
            </View>
        );
    }

  return (
    <Screen>
        <Back_button 
        title= {'Home'} 
        onPress={()=> navigation.navigate('home')}
        children={
            <TouchableOpacity style={{position: 'absolute', right: '6%', bottom: scale(5)}} onPress={()=> setShareModal(true)}>
                <Entypo name="share-alternative" size={scale(18)} color="black" />
            </TouchableOpacity>
        }
        />
        <View style={styles.top_container}>
            <TouchableOpacity activeOpacity={.8} onPress={updateRoomPicture}>
                <Profile_picture name={room_details.room_name} image={roomPicture} sizing_style={styles.room_icon} text_sizing={{fontSize: RFValue(24)}}/>
            </TouchableOpacity>
            <View style={{justifyContent: 'space-between'}}>
                <Text style={styles.title}>{truncate(room_details.room_name, 12)}</Text>
                <TouchableWithoutFeedback onPressIn={copyToClipboard}>
                    <Text style={styles.subtitle}>ID: {room_details.room_code}</Text>
                </TouchableWithoutFeedback>
            </View>
        </View>
        <View style={styles.bottom_container}>
            <View style={{flex: .35}}>
                <View style={styles.drop_down}>
                    <Text style={{fontFamily: 'DMSans_700Bold', fontSize: RFValue(18), marginRight: scale(5)}}>Members</Text>
                </View>
                <TouchableWithoutFeedback onPress={()=> Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)}>
                    <View style={{position: 'absolute', right: 3}}>
                        <AntDesign name="adduser" size={scale(22)} color="black" />
                    </View>
                </TouchableWithoutFeedback>
                    <FlatList 
                        data={members}
                        keyExtractor={item => item.id.toString()}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        style={styles.members_list}
                        renderItem={({ item }) =>
                            <Groups_member_list_item 
                            title={item.name}
                            subtitle={`@${item.username}`}
                            image={item.profile_picture_url}
                            />
                        }
                    />
            </View>
            <View style={{flex: .65}}>
                <TouchableWithoutFeedback onPress={()=> setReceiptsDropDown(!receiptsDropDown)}>
                    <View style={[styles.drop_down]}>
                        <Text style={{fontFamily: 'DMSans_700Bold', fontSize: RFValue(18), marginRight: scale(5)}}>Receipts </Text>
                        {receiptsDropDown ? <Entypo name="chevron-small-down" size={scale(22)} color="black" /> : <Entypo name="chevron-small-up" size={scale(24)} color="black" />}
                    </View>
                </TouchableWithoutFeedback>
                {receiptsDropDown && (
                    <FlatList 
                    data={mappedReceitps}
                    keyExtractor={item => item.id.toString()}
                    onRefresh={()=> fetchRoomReceipts()}
                    refreshing={isRefreshing}
                    showsVerticalScrollIndicator={false}
                    style={styles.receipts_list}
                    ItemSeparatorComponent={
                        <View style={{backgroundColor: Colors.primary, height: verticalScale(1)}}/>
                    }
                    renderItem={({ item }) => 
                        <Groups_receipt_list_item 
                        title={item.receipt_name}
                        owner={First_last_initial(item.ownerName)}
                        onPress={()=> navigation.navigate('Split_bill_stack', {
                            screen: 'Bill_totals',
                            params: {room_code: item.room_code, receipt_id: item.id}
                        })}
                        />
                    }
                    />
                )}
            </View>
        </View>
        <Modal 
        animationType='fade'
        transparent={true}
        visible={shareModal}
        onRequestClose={() => {
            setShareModal(false);
        }}
        >
            <Toast />
            <View style={styles.modal_view}>
                <TouchableWithoutFeedback onPress={()=> setShareModal(false)}>
                    <View style={{flex: .7}}/>
                </TouchableWithoutFeedback>
                <View style={styles.modal}>
                    <View style={styles.share_modal_top}>
                        <Text style={{fontFamily: 'DMSans_700Bold', fontSize: RFValue(16), color: Colors.primary}}>Share group</Text>
                        <TouchableOpacity 
                        activeOpacity={.7} 
                        style={styles.modal_share_button} 
                        onPress={onShare}>
                            <Entypo name="share-alternative" size={scale(16)} color="white" />
                            <Text style={{color: Colors.white, marginLeft: scale(10), fontFamily: 'DMSans_700Bold', fontSize: RFValue(14)}}>Share link</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{height: verticalScale(2), backgroundColor: Colors.primary, width: '88%'}}/>
                    <View style={{width: '100%', paddingHorizontal: '20%'}}>
                        <Text style={{fontFamily: 'DMSans_500Medium', color: Colors.primary, fontSize: RFValue(20), textAlign: 'left'}}>Join ID</Text>
                        <TouchableWithoutFeedback onPress={copyToClipboard}>
                            <Text style={{fontSize: RFValue(26), fontFamily: 'DMSans_700Bold', color: Colors.primary, textAlign: 'right'}}>{room_code}</Text>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
            </View>
        </Modal>
        <Large_green_button 
        text_style={{fontSize: RFValue(14)}}
        title={"Split Bill"} 
        onPress={()=> navigation.navigate('Split_bill_stack', {
            screen: 'Upload_take_photo',
            params: { from: 'Group', room_code: room_code }
        })}/>
    </Screen>
  )
}

const styles = StyleSheet.create({
    top_icons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingRight: scale(20),
        // borderWidth: 2,
    },
    top_container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '6%',
        // borderWidth: 1,
    },
    room_icon: {
        height: scale(60),
        width: scale(60),
        borderColor: Colors.primary,
        // marginBottom: scale(8)
        marginRight: scale(10),
        borderWidth: 1
    },
    title: {
        fontFamily: 'DMSans_700Bold',
        fontSize: RFValue(24),
        color: Colors.primary,
        marginBottom: verticalScale(5),
        // borderWidth: 1,
    },
    subtitle: {
        fontSize: RFValue(12),
        color: Colors.black,
        fontFamily: 'DMSans_400Regular',
        // borderWidth: 1
    },
    bottom_container: {
        marginHorizontal: '6%',
        marginTop: scale(25),
        height: verticalScale(390),
        // borderWidth: 1,
        // borderColor: 'blue'
    },
    drop_down: {
        flexDirection: 'row',
        justifyContent: 'Flex-start',
        alignItems: 'center',
        // borderWidth: 1
    },
    members_list: {
        // marginTop: verticalScale(10),
        paddingHorizontal: scale(5),
        // borderWidth: 1
    },
    receipts_list: {
        // marginTop: verticalScale(10),
        paddingHorizontal: scale(5),
        // height: '50%',
        // flex: 1
        // borderWidth: 1
    },
    modal_view: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.1)',
        // borderWidth: 2,
        // borderColor: 'blue'
    },
    modal: {
        width: '100%',
        backgroundColor: Colors.white,
        // height: verticalScale(200),
        flex: .3,
        borderTopLeftRadius: scale(20),
        borderTopRightRadius: scale(20),
        alignItems: 'center',
        justifyContent: 'space-evenly',
        paddingBottom: '5%',
        shadowColor: Colors.black,
        shadowOpacity: .25,
        shadowRadius:4,
        shadowOffset: {
            height: -4,
        }
    },
    modal_share_button: {
        backgroundColor: Colors.primary,
        marginTop: verticalScale(15),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: verticalScale(40),
        width: scale(170),
        borderRadius: scale(15)
    },
    share_modal_top: {
        alignItems: 'center',
        // borderWidth: 1
    }
})

export default Groups_details
