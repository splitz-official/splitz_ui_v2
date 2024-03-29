import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAxios } from '../../../../Axios/axiosContext'
import Groups_list_item from './Groups_list_item';

const Groups = () => {

    const { userData, axiosInstance } = useAxios();
    const [formattedData, setFormattedData] = useState();
    const [isRefreshing, setIsRefreshing] = useState(false);
    // console.log("User ID: " + userData.id)


    const fetchGroups = async () => {
        if(userData && userData.id) {
            setIsRefreshing(true);
            try {
                console.log("From groups screen: getting rooms")
                const response = await axiosInstance.get(`/room/user/${userData.id}`);
                setFormattedData(formatData(response.data, 3));
                console.log(response.data);
            } catch (err) {
                console.error("Failed to fetch groups:", err);
            }
            setTimeout(()=> {
                setIsRefreshing(false);
            }, 1000)
        }
    };

    useEffect(() => {
        fetchGroups();
    }, []);

    const formatData = (data, numColumns) => {
        const copy = [...data];
        if(!copy) return null;
        const numberOfFullRows = Math.floor(copy.length / numColumns);
        let numberOfElementsLastRow = copy.length - (numberOfFullRows * numColumns);
        while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
            copy.push({key: `blank-${numberOfElementsLastRow}`, empty: true});
            numberOfElementsLastRow = numberOfElementsLastRow + 1;
        }
        return copy;
    }

  return (
    <View style={{flex: 1}}>
        <FlatList
            onRefresh={()=> fetchGroups()}
            refreshing={isRefreshing}
            style={styles.groups_grid}
            data={formattedData}
            keyExtractor={data => data.id ? data.id.toString() : data.key}
            numColumns={3}
            renderItem={({ item }) => (
                (()=> {
                    if(item.empty === true) {
                        return <View style={styles.empty}/>
                    }
                    return (
                        <Groups_list_item
                            title={item.room_name}
                            image={require("../../../../assets/dark_green_splitzLogo.png")}
//displaying room code now since we don't have photos for each room. Maybe in the future we ask the user to add a photo or just use the profile pic of the person that created the room
                            icon_text={item.room_code}
                            onPress={() => console.log('Room Tapped', item)}
                        />
                    );
                }) ()
            )}
        />
    </View>
  )
}

const styles = StyleSheet.create({
    groups_grid: {
        // marginBottom: 10,
        // marginTop: 5,
        // borderWidth: 2,
        paddingHorizontal: 10,
        flex: 1
    },
    empty: {
        backgroundColor: 'transparent',
        flex: 1,
        // borderWidth: 2,
        margin: 2
    }
})

export default Groups
