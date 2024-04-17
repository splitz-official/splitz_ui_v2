import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';

import Screen from '../../../Components/Screen';
import Back_button from '../../../Components/Back_button';
import { scale } from 'react-native-size-matters';
import Colors from '../../../Config/Colors';

const Final_totals = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { participants, itemSelections, total, tax, tip } = route.params;
    console.log(route.params)

    const totalTaxAndTip = parseFloat(tax) + parseFloat(tip);
    const subtotal = parseFloat(total) - totalTaxAndTip;

    const calculateParticipantTotal = (participant) => {
        let participantTotal = 0;
        Object.values(itemSelections).forEach(item => {
            if (item.selectedBy.includes(participant)) {
                const numSelectors = item.selectedBy.length;
                participantTotal += (item.price * item.quantity) / numSelectors;
            }
        });

        const participantShareOfSubtotal = participantTotal / subtotal;
        const participantTaxAndTip = participantShareOfSubtotal * totalTaxAndTip;

        return (participantTotal + participantTaxAndTip).toFixed(2);
    };

    //Fix nan when no tax and tip are inputted 
    return (
        <Screen>
            <Back_button title={'Back'} onPress={() => navigation.goBack()} />
            <Text style={styles.title}>Participant Totals</Text>
            <FlatList
                data={participants}
                keyExtractor={(item, index) => item + index}
                renderItem={({ item }) => (
                    <View style={styles.participantContainer}>
                        <Text style={styles.participantName}>{item}</Text>
                        <Text style={styles.participantTotal}>${calculateParticipantTotal(item)}</Text>
                    </View>
                )}
                // ListHeaderComponent={() => (
                //     <Text style={styles.header}>Participants' Totals</Text>
                // )}
            />
        </Screen>
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: RFValue(20),
        fontWeight: 'bold',
        color: Colors.primary,
        textAlign: 'center',
        marginVertical: scale(10),
    },
    participantContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: scale(10),
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    participantName: {
        fontSize: RFValue(16),
    },
    participantTotal: {
        fontSize: RFValue(16),
        fontWeight: 'bold',
        color: Colors.primary,
    },
    header: {
        fontSize: RFValue(18),
        fontWeight: 'bold',
        color: Colors.primary,
        padding: scale(10),
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    }
});

export default Final_totals;
