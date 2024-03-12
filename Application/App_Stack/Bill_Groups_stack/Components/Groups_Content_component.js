import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';
import SearchBar from '../../../../Components/SearchBar';
import Listitem from '../../../../Components/ListItem'; 
import ListItemSeparator from '../../../../Components/List_item_separator';
import Colors from '../../../../Config/Colors'; 

const Groups_Content = () => {
    const [rooms, setRooms] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const baseURL = "http://3.14.255.133"; 
    const access_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3IiOnsiaWQiOjMsInBob25lX251bWJlciI6IisxNjI2ODA4Njk1OSJ9LCJleHAiOjE3MDg3NTM0NjF9.lwuTFXk3vpU5kWhDj7EhSH-FxJtgKlnDyetQqGLRyd4"; 

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

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    const filteredRooms = rooms.filter(room => {
        return room.room_name.toLowerCase().includes(searchQuery.toLowerCase());
    });

    return (
        <View style={styles.container}>
            <SearchBar
                search_styles={{ marginBottom: 15, marginTop: 5 }}
                placeholder={"Group, bill name, person..."}
                onSearchChange={handleSearch}
            />
            <FlatList
                style={styles.FlatList}
                data={filteredRooms}
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
    
    }
});

export default Groups_Content;
