import { StyleSheet, Text, View, Image, TouchableWithoutFeedback, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { scale } from 'react-native-size-matters'
import { useNavigation, useRoute } from '@react-navigation/native'
import { RFValue } from 'react-native-responsive-fontsize'

import { Entypo } from '@expo/vector-icons';

import { useAxios } from '../../../Axios/axiosContext'
import Groups_member_list_item from './Components/Groups_member_list_item'
import Screen from '../../../Components/Screen'
import Back_button from '../../../Components/Back_button'
import Colors from '../../../Config/Colors'
import Large_green_button from '../../../Components/Large_green_button'

const Groups_details = () => {

    const { axiosInstance } = useAxios();
    const navigation = useNavigation();
    const route = useRoute();
    const { room_details } = route.params;
    // console.log(room_details);


    //can we change /room/members/{room_id} endpoint to grab all user info not just id and phone_number
    const [members, setMembers] = useState([]);
    const [membersdropdown, setMembersDropDown] = useState(false);

    useEffect(() => {
        const fetchRoomMembers = async () => {
            try {
                const response = await axiosInstance.get(`/room/members/${room_details.id}`);
                const data = response.data;
                console.log("Fetching room members:")
                console.log(data);
                setMembers(data);
            } catch (error) {
                console.error('Failed to fetch room members:', error);
            }
        };
        if (room_details.id) {
            fetchRoomMembers();
        }
    }, [room_details.id]); 

  return (
    <Screen>
        <View style={styles.top_icons}>
            <Back_button title= {'Home'} onPress={()=> navigation.navigate('home')}/>
            <TouchableWithoutFeedback>
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
            <View>
                <TouchableWithoutFeedback onPress={()=> setMembersDropDown(!membersdropdown)}>
                    <View style={styles.members_dropdown}>
                        <Text style={{fontFamily: 'DMSans_700Bold', fontSize: RFValue(18), marginRight: scale(5)}}>Members</Text>
                        {membersdropdown ? <Entypo name="chevron-small-down" size={scale(24)} color="black" /> : <Entypo name="chevron-small-up" size={scale(24)} color="black" />}
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
                            title={item.id}
                            subtitle={item.phone_number}
                            />
                    }
                    />
                )}
            </View>
        </View>
        <Large_green_button text_style={{fontSize: RFValue(14)}}title={"Add Bill"}/>
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
        fontFamily: 'DMSans_400Regular'
        // borderWidth: 1
    },
    bottom_container: {
        marginHorizontal: '6%',
        marginTop: scale(25)
    },
    members_dropdown: {
        flexDirection: 'row',
        justifyContent: 'Flex-start',
        alignItems: 'center'
    },
    members_list: {
        marginTop: scale(15),
        paddingHorizontal: scale(5)
    }
})

export default Groups_details
