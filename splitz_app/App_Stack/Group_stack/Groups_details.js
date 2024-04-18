import { StyleSheet, Text, View, Image, TouchableWithoutFeedback, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { scale } from 'react-native-size-matters'
import { useNavigation, useRoute } from '@react-navigation/native'
import { RFValue } from 'react-native-responsive-fontsize'

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
    const [room_details, setRoom_Details] = useState(null);


    //can we change /room/members/{room_id} endpoint to grab all user info not just id and phone_number
    const [members, setMembers] = useState([]);
    const [membersdropdown, setMembersDropDown] = useState(true);
    const [receipts, setReceipts] = useState(null);
    const [receiptsDropDown, setReceiptsDropDown] = useState(true);

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
            // console.log("Fetching room receipts")
            const response = await axiosInstance.get(`/receipts/${room_details.room_code}`);
            console.log("Fetching room receipts reponse status:", response, response.status);
            console.log(response.data)
            setReceipts(response.data);
        } catch (error) {
            console.error('Failed to fetch room receipts', error);
        }
    };

    useEffect(() => {
        if (room_details && room_details.id) {
            fetchRoomMembers();
        }
        if (room_details && room_details.room_code){
            fetchRoomReceipts();
        }
    }, [room_details]);

    // members and receipts touchable too wide. Adjust this later

    if (!room_details) {
        return (
            <View style={{flex: 1, justifyContent:'center', alignItems: 'center'}}>
                <ActivityIndicator size={"large"} color={Colors.primary}/>
            </View>
        );
    }

  return (
    <Screen>
        <View style={styles.top_icons}>
            <Back_button title= {'Home'} onPress={()=> navigation.navigate('home')}/>
            <TouchableWithoutFeedback onPress={()=> console.log("Share Button Pressed")}>
                <Entypo name="share-alternative" size={scale(18)} color="black" />
            </TouchableWithoutFeedback>
        </View>
        <View style={styles.top_container}>
            <View style={styles.room_icon}>
                <Text>{room_details.room_code}</Text>
            </View>
            <Text style={styles.title}>{room_details.room_name}</Text>
            <Text style={styles.subtitle}>ID: {room_details.room_code}</Text>
        </View>
        <View style={styles.bottom_container}>
            <View style={{}}>
                <TouchableWithoutFeedback onPress={()=> setMembersDropDown(!membersdropdown)}>
                    <View style={styles.drop_down}>
                        <Text style={{fontFamily: 'DMSans_700Bold', fontSize: RFValue(18), marginRight: scale(5)}}>Members</Text>
                        {membersdropdown ? <Entypo name="chevron-small-down" size={scale(22)} color="black" /> : <Entypo name="chevron-small-up" size={scale(24)} color="black" />}
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={()=> console.log("Add Users Pressed")}>
                    <View style={{position: 'absolute', right: 3}}>
                        <AntDesign name="adduser" size={scale(22)} color="black" />
                    </View>
                </TouchableWithoutFeedback>
                {membersdropdown && (
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
                )}
            </View>
            <View>
                <TouchableWithoutFeedback onPress={()=> setReceiptsDropDown(!receiptsDropDown)}>
                    <View style={[styles.drop_down, {marginTop: scale(10)}]}>
                        <Text style={{fontFamily: 'DMSans_700Bold', fontSize: RFValue(18), marginRight: scale(5)}}>Receipts</Text>
                        {receiptsDropDown ? <Entypo name="chevron-small-down" size={scale(22)} color="black" /> : <Entypo name="chevron-small-up" size={scale(24)} color="black" />}
                    </View>
                </TouchableWithoutFeedback>
                {receiptsDropDown && (
                    <FlatList 
                    data={receipts}
                    keyExtractor={item => item.id.toString()}
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    style={styles.receipts_list}
                    renderItem={({ item }) => 
                        <Groups_receipt_list_item 
                        title={item.receipt_name}/>
                    }
                    />
                )}
            </View>
        </View>
        <Large_green_button 
        text_style={{fontSize: RFValue(14)}}
        title={"Add Bill"} 
        onPress={()=> navigation.navigate('Split_bill_stack', {
            screen: 'upload_or_take_photo',
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
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: scale(30),
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
        marginBottom: scale(8)
    },
    title: {
        fontFamily: 'DMSans_700Bold',
        fontSize: RFValue(26),
        color: Colors.primary
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
        marginTop: scale(25)
    },
    drop_down: {
        flexDirection: 'row',
        justifyContent: 'Flex-start',
        alignItems: 'center',
        // borderWidth: 1
    },
    members_list: {
        marginTop: scale(15),
        paddingHorizontal: scale(5),
        // borderWidth: 1
    },
    receipts_list: {
        marginTop: scale(15),
        paddingHorizontal: scale(5),
        // borderWidth: 1
    }
})

export default Groups_details
