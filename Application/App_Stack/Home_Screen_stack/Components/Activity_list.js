import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import axios from 'axios';
import { RFValue} from "react-native-responsive-fontsize"


import SearchBar from '../../../../Components/SearchBar';
import Listitem from '../../../../Components/ListItem'; 
import ListItemSeparator from '../../../../Components/List_item_separator';
import Colors from '../../../../Config/Colors'; 
import { RegularText, Bold700Text, Medium500Text } from '../../../../Config/AppText';

const Activity_list = () => {
    const [rooms, setRooms] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const baseURL = "http://3.14.255.133"; 
    const access_token = ACCESS_TOKEN; 

    const get_rooms = () => {
        axios
          .get(`${baseURL}/room/`, {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          })
          .then((response) => {
            setRooms(response.data);
            console.log(response.data);
          })
          .catch((error) => {
            console.log("error here 1: ", error);
          });
    };

    useEffect(() => {
        get_rooms();
    }, []);

    return (
        <View style={styles.container}>
            <Medium500Text style = {styles.text}>Activity</Medium500Text>
            <FlatList
                style={styles.FlatList}
                data={rooms}
                keyExtractor={room => room.id.toString()}
                renderItem={({ item }) => (
                    <Listitem
                        title={item.room_name}
                        subTitle={`Members: ${item.num_members}`}
                        image={require("../../../../assets/dark_green_splitzLogo.png")} 
                        onPress={() => console.log('Room Tapped', item)}
                    />
                )}
                ItemSeparatorComponent={ListItemSeparator}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    FlatList: {
    
    },
    text: {
        marginLeft: 20,
        marginTop: 10,
        marginBottom: 5,
        fontWeight: "bold",
        fontSize: RFValue(16)
    }
});

export default Activity_list;
