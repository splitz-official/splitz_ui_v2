import { StyleSheet, Text, View, Image, TouchableWithoutFeedback, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { scale, verticalScale } from 'react-native-size-matters'
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native'
import { RFValue } from 'react-native-responsive-fontsize'
import * as Clipboard from 'expo-clipboard';
import Toast from 'react-native-toast-message';

import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

import { useAxios } from '../../../Axios/axiosContext'
import Groups_member_list_item from './Components/Groups_member_list_item'
import Screen from '../../../Components/Screen'
import Back_button from '../../../Components/Back_button'
import Colors from '../../../Config/Colors'
import Large_green_button from '../../../Components/Large_green_button'
import Groups_receipt_list_item from './Components/Groups_receipt_list_item'

const Groups_details = () => {

    const { axiosInstance } = useAxios();
    const navigation = useNavigation();
    const route = useRoute();
    // console.log(route.params)
    const { room_code } = route.params;
    // console.log(room_code);
    const [room_details, setRoom_Details] = useState(null);

    const [members, setMembers] = useState([]);
    const [membersdropdown, setMembersDropDown] = useState(true);
    const [receipts, setReceipts] = useState(null);
    const [receiptsDropDown, setReceiptsDropDown] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);
    // console.log(receipts)

    const copyToClipboard = async () => {
        await Clipboard.setStringAsync(room_code);
        Toast.show({
            type: 'success',
            text1: 'Copied to clipboard',
            position: 'bottom',
            autoHide: true,
            visibilityTime: 1000
        })
    }

    useEffect(()=> {
        const fetchRoomDetails = async () => {
            // console.log("Fetching Room Details")
            try {
                const response = await axiosInstance.get(`/room/${room_code}`);
                // console.log(response.data);
                setRoom_Details(response.data);
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
            // console.log(response.data)
        } catch (error) {
            console.error('Failed to fetch room members:', error);
        }
    };
    
    const fetchRoomReceipts = async () => {
        // console.log("Fetching Room Receipts");
        try {
            const response = await axiosInstance.get(`/receipts/${room_code}`);
            // console.log("Fetching room receipts reponse status:", response, response.status);
            setReceipts(response.data);
        } catch (error) {
            console.error('Failed to fetch room receipts', error);
        }
    };

    useEffect(() => {
        if (room_details && room_details.id) {
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

    // members and receipts dropdown touchable too wide. Adjust this later

    if (!room_details) {
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
            <TouchableOpacity style={{position: 'absolute', right: '6%', bottom: scale(5)}} onPress={()=> console.log("Share Button Pressed")}>
                <Entypo name="share-alternative" size={scale(18)} color="black" />
            </TouchableOpacity>
        }
        />
        <View style={styles.top_container}>
            <View style={styles.room_icon}>
                <Text>{room_details.room_code}</Text>
            </View>
            <View style={{justifyContent: 'space-between'}}>
                <Text style={styles.title}>{room_details.room_name}</Text>
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
                <TouchableWithoutFeedback onPress={()=> console.log("Add Users Pressed")}>
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
                    data={receipts}
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
                        owner={item.owner_id}
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
        borderRadius: scale(30),
        borderWidth: 1,
        borderColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        // marginBottom: scale(8)
        marginRight: scale(10)
    },
    title: {
        fontFamily: 'DMSans_700Bold',
        fontSize: RFValue(26),
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
    }
})

export default Groups_details
