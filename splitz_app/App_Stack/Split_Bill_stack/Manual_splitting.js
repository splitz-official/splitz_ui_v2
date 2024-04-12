import { FlatList, StyleSheet, Text, TouchableOpacity, View, Platform } from 'react-native'
import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';


import Screen from '../../../Components/Screen'
import Back_button from '../../../Components/Back_button'
import { scale } from 'react-native-size-matters';
import Colors from '../../../Config/Colors';
import Large_green_button from '../../../Components/Large_green_button';
import { items } from '../../../placeholder_data';

const Manual_splitting = () => {

    const navigation = useNavigation();
    const route = useRoute();
    console.log(route.params);
    const {participants, total, items, tax, tip} = route.params;

  return (
    <Screen>
        <Back_button title={'Back'} onPress={()=>navigation.goBack()}/>
            <View style={styles.members_container}>
                <Text style={styles.titles}>Members</Text>
                <FlatList 
                data={participants}
                keyExtractor={(item, index) => index.toString()}
                horizontal={true}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.members_list_item}>
                        <Text style={{padding: scale(5), fontFamily: 'DMSans_400Regular', fontSize: RFValue(14)}}>{item}</Text>
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
                    <View style={styles.listItem}>
                        <Text style={[styles.itemText, {flex: 1.5}]}>{item.name}</Text>
                        <Text style={[styles.itemText, {flex: 1}]}>({item.quantity})</Text>
                        <Text style={[styles.itemText, {flex: 1}]}>${item.price}/per</Text>
                    </View>
                )}
                style={{width: '100%', marginBottom: scale(100)}}
                />
            </View>
        <View style={{alignItems: 'center'}}>
            <Text style={styles.totalText}>Total: ${total}</Text>
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
        // borderWidth: 1,
        borderColor: 'pink'
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
})

export default Manual_splitting
