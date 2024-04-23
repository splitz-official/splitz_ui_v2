import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';

import Screen from '../../../Components/Screen';
import Back_button from '../../../Components/Back_button';
import { scale } from 'react-native-size-matters';
import Colors from '../../../Config/Colors';
import Large_green_button from '../../../Components/Large_green_button';

const Splitting_Screen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { participants, total, items, tax, tip } = route.params;

    const [selectedParticipant, setSelectedParticipant] = useState(null);
    const [itemSelections, setItemSelections] = useState(() =>
        items.reduce((acc, item) => {
            acc[item.name] = { ...item, selectedBy: [] };
            return acc;
        }, {})
    );
    console.log(itemSelections)

    const calculateParticipantTotal = (participant) => {
        const itemsForParticipant = Object.keys(itemSelections)
            .filter(key => itemSelections[key].selectedBy.includes(participant))
            .map(key => itemSelections[key]);

        return itemsForParticipant.reduce((total, item) => {
            return total + (item.price * item.quantity);
        }, 0).toFixed(2);
    };

    const handleSelectItem = (item) => {
        if (!selectedParticipant) return;

        setItemSelections(prev => {
            const isSelected = prev[item.name].selectedBy.includes(selectedParticipant);
            return {
                ...prev, [item.name]: {
                    ...item,
                    selectedBy: isSelected
                        ? prev[item.name].selectedBy.filter(name => name !== selectedParticipant)
                        : [...prev[item.name].selectedBy, selectedParticipant]
                }
            };
        });
    };

    return (
        <Screen>
            <Back_button title={'Back'} onPress={() => navigation.goBack()} />
            <View style={styles.members_container}>
                <Text style={styles.titles}>Members</Text>
                <View style={{}}>
                    <FlatList
                        data={participants}
                        keyExtractor={(item, index) => index.toString()}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                activeOpacity={.5}
                                style={[styles.members_list_item, selectedParticipant === item ? styles.selected : {}]}
                                onPress={() => setSelectedParticipant(prev => prev === item ? null : item)}
                            >
                                <Text style={[styles.members_item_text, selectedParticipant === item ? styles.members_selected_item_text : {}]}>
                                    {item}
                                </Text>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            </View>
            <View style={styles.items_container}>
                <Text style={styles.titles}>Items</Text>
                <View style={{alignItems: 'center'}}>
                    <FlatList
                        data={items}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={[styles.listItem, itemSelections[item.name].selectedBy.includes(selectedParticipant) ? styles.selected : {}]}
                                onPress={() => handleSelectItem(item)}
                                activeOpacity={.5}
                            >
                                <Text style={[styles.itemText, {flex: 1.5}]}>{item.name}</Text>
                                <Text style={[styles.itemText, {flex: 1}]}>({item.quantity})</Text>
                                <Text style={[styles.itemText, {flex: 1}]}>${item.price}/ea</Text>
                                {itemSelections[item.name].selectedBy.length > 0 && (
                                    <Text style={styles.selectedParticipants}>{`Selected by: ${itemSelections[item.name].selectedBy.join(', ')}`}</Text>
                                )}
                            </TouchableOpacity>
                        )}
                    />
                </View>
            </View>
            <View style={{ alignItems: 'center' }}>
                {selectedParticipant ? (
                    <Text style={styles.totalText}>{`${selectedParticipant}'s Total: $${calculateParticipantTotal(selectedParticipant)}`}</Text>
                ) : (
                    <Text style={styles.totalText}>Total: ${total}</Text>
                )}
            </View>
            <Large_green_button title={'Finish Splitting'} onPress={()=> navigation.navigate('Final_Totals', {participants, itemSelections, tax, tip, total})} />
        </Screen>
    );
};

const styles = StyleSheet.create({
    members_container: {
        marginHorizontal: '6%',
        padding: scale(10),
        // borderWidth: 1
    },
    titles: {
        fontFamily: 'DMSans_700Bold',
        fontSize: RFValue(18),
        marginBottom: scale(20),
        color: Colors.primary,
        // borderWidth: 1
    },
    members_list_item: {
        marginHorizontal: scale(5),
        // padding: scale(8),
        paddingHorizontal: scale(5),
        height: scale(45),
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 20,
        borderColor: Colors.primary,
        backgroundColor: Colors.white,
    },
    selected: {
        borderWidth: 2,
        height: scale(50)
        // backgroundColor: '#C1EBCD',
    },
    members_item_text: {
        padding: scale(5),
        fontFamily: 'DMSans_400Regular',
        fontSize: RFValue(14),
    },
    members_selected_item_text: {
        fontFamily: 'DMSans_500Medium',
        fontSize: RFValue(16),
    },
    items_container: {
        marginHorizontal: '6%',
        padding: scale(10),
        flex: 1,
        // borderWidth: 1
    },
    listItem: {
        padding: scale(10),
        marginVertical: scale(5),
        // backgroundColor: '#f0f0f0',
        borderColor: Colors.primary,
        borderWidth: 1,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        minWidth: '100%'
    },
    itemText: {
        color: 'black',
        fontFamily: 'DMSans_500Medium',
        fontSize: RFValue(14),
        // borderWidth: 1
    },
    totalText: {
        fontFamily: 'DMSans_700Bold',
        fontSize: RFValue(16),
        color: Colors.primary,
        textAlign: 'center',
        position: 'absolute',
        bottom: scale(65),
    },
    selectedParticipants: {
        fontFamily: 'DMSans_400Regular',
        fontSize: RFValue(8),
        color: Colors.mediumgray,
        position: 'absolute',
        bottom: 0,
        left: scale(10)
    }
});

export default Splitting_Screen;