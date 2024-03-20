import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import axios from 'axios';
import { RFPercentage, RFValue} from "react-native-responsive-fontsize"


import Listitem from '../../../../Components/ListItem'; 
import ListItemSeparator from '../../../../Components/List_item_separator';
import Colors from '../../../../Config/Colors'; 

import { items } from '../../../../placeholder_data';
import { RegularText, Bold700Text, Medium500Text } from '../../../../Config/AppText';


const Placecholder_list = () => {
    const [data, setData] = useState(items);
    
    return (
        <View style={styles.container}>
            <Medium500Text style = {styles.text}>Activity</Medium500Text>
            <FlatList
                style={styles.FlatList}
                data={data}
                keyExtractor={data => data.id.toString()}
                renderItem={({ item }) => (
                    <Listitem
                        title={item.name}
                        subTitle={item.action_description}
                        // image={{ uri: item.icon}} 
                        image={item.icon}
                        date={item.date}
                        onPress={() => console.log('Activity Tapped', item)}
                    />
                )}
                ItemSeparatorComponent={ListItemSeparator}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // borderWidth: 2,
        borderColor: 'blue'
    },
    FlatList: {
        // borderWidth: 2
    },
    text: {
        marginLeft: 15,
        marginTop: 10,
        marginBottom: 5,
        fontSize: RFValue(15),
        // borderWidth: 2
    }
});

export default Placecholder_list;
