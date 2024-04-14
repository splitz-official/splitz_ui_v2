import { FlatList, StyleSheet, Text, TouchableOpacity, View, Platform } from 'react-native'
import React, { useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';


import Screen from '../../../Components/Screen'
import Back_button from '../../../Components/Back_button'
import { scale } from 'react-native-size-matters';
import Colors from '../../../Config/Colors';
import Large_green_button from '../../../Components/Large_green_button';
import { items } from '../../../placeholder_data';

const Splitting_Screen = () => {

    const navigation = useNavigation();
    const route = useRoute();
    // console.log(route.params);
    const {participants, total, items, tax, tip} = route.params;

    const [selectedParticipant, setSelectedParticipant] = useState();
    const [participantItems, setParticipantItems] = useState({});
    console.log("Selected Participant:", selectedParticipant);
    console.log("Participant Items:", participantItems)

    const [itemSelections, setItemSelections] = useState(
        items.reduce((acc, item) => {
            acc[item.name] = { ...item, selectedBy: [] };
            return acc;
        }, {})
    );

    const calculateParticipantTotal = (participant) => {
        const items = participantItems[participant] || [];
        return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    };

    const handleSelectItem = (item) => {
        if (!selectedParticipant) return; 
    
        const existingItems = participantItems[selectedParticipant] || [];
        if (existingItems.find(i => i.name === item.name)) {
            setParticipantItems({
                ...participantItems,
                [selectedParticipant]: existingItems.filter(i => i.name !== item.name)
            });
        } else {
            setParticipantItems({
                ...participantItems,
                [selectedParticipant]: [...existingItems, item]
            });
        }
    };

  return (
    <Screen>
        <Back_button title={'Back'} onPress={()=>navigation.goBack()}/>
            <View style={styles.members_container}>
                <Text style={styles.titles}>Members</Text>
                <FlatList 
                data={participants}
                keyExtractor={(item, index) => index.toString()}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    <TouchableOpacity style={[styles.members_list_item, selectedParticipant === item ? styles.selected : {borderColor: 'gray', backgroundColor: Colors.lightgray}]}
                    onPress={()=> setSelectedParticipant(prev => prev === item ? null : item)}
                    >
                        <Text style={[styles.members_item_text, selectedParticipant === item ? styles.members_selected_item_text : {color: Colors.mediumgray}]}>{item}</Text>
                    </TouchableOpacity>
                )}
                />
            </View>
            <View style={styles.items_container}>
                <Text style={styles.titles}>Items</Text>
                <FlatList
                data={items}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity style={[styles.listItem, participantItems[selectedParticipant]?.find(i => i.name === item.name) ? styles.selected : {}]}
                    onPress={()=> handleSelectItem(item)}
                    >
                        <Text style={[styles.itemText, {flex: 1.5}]}>{item.name}</Text>
                        <Text style={[styles.itemText, {flex: 1}]}>({item.quantity})</Text>
                        <Text style={[styles.itemText, {flex: 1}]}>${item.price}/ea</Text>
                    </TouchableOpacity>
                )}
                style={{width: '100%', marginBottom: scale(100)}}
                />
            </View>
        <View style={{alignItems: 'center'}}>
            {selectedParticipant ? (
                <Text style={styles.totalText}>{selectedParticipant}'s Total': ${calculateParticipantTotal(selectedParticipant).toFixed(2)}</Text>
            ) : (
                <Text style={styles.totalText}>Total: ${total}</Text>
            )}

        </View>
        <Large_green_button title={'Finish Splitting'}/>
    </Screen>
  )
}
const styles = StyleSheet.create({
    members_container: {
        // justifyContent: 'center',
        alignItems: 'center',
        padding: scale(10),
        // borderWidth: 1,
        borderColor: 'blue'
    },
    titles: {
        fontFamily: "DMSans_700Bold",
        fontSize: RFValue(18),
        marginBottom: scale(20),
        color: Colors.primary
    },
    members_list_item: {
        margin: scale(5),
        borderWidth: 1,
        borderRadius: 5
    },
    items_container: {
        alignItems: 'center',
        padding: scale(10),
        flex: 1,
        borderWidth: 1
    },
    totalText: {
        fontFamily: 'DMSans_700Bold',
        fontSize: RFValue(16),
        color: Colors.primary,
        textAlign: 'center',
        position: 'absolute',
        bottom: scale(65)
    },
    listItem: {
        padding: scale(10),
        marginVertical: scale(5),
        backgroundColor: '#f0f0f0',
        borderColor: Colors.primary,
        borderWidth: 1,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    itemText: {
        color: 'black',
        fontFamily: 'DMSans_500Medium',
        fontSize: RFValue(14),
    },
    selected: {
        borderColor: Colors.primary,
        borderWidth: 2,
        backgroundColor: '#C1EBCD'
    },
    members_item_text: {
        padding: scale(5), 
        fontFamily: 'DMSans_400Regular', 
        fontSize: RFValue(14)
    },
    members_selected_item_text: {
        fontFamily: 'DMSans_500Medium',
        fontSize: RFValue(16)
    }
})

export default Splitting_Screen
