import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { scale, verticalScale } from 'react-native-size-matters'
import { RFValue } from 'react-native-responsive-fontsize'

import { MaterialIcons } from '@expo/vector-icons';

import Colors from '../../../../Config/Colors'
import { Medium500Text, RegularText } from '../../../../Config/AppText';
import Profile_picture from '../../../../Components/Profile_picture';

const Receipt_items_list_component = ({ name, price, quantity, onPress, isSelected, participants, editing}) => {

    const truncate = (text, maxLength) => {
        return text.length > maxLength ? text.substring(0, maxLength - 3) + '...' : text;
    };

  return (
    <TouchableOpacity activeOpacity={.8} style={[styles.container, isSelected ? styles.selected : {}]} onPress={onPress}>
        {/* <View style={{position: 'absolute', right: 2}}>
            <MaterialIcons name="cancel" size={scale(16)} color="gray" />
        </View> */}
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={[styles.checkbox, isSelected ? styles.selectedbox: {}]}/>
            <RegularText numberOfLines={1} style={styles.name}>{truncate(name, 15)} {quantity}</RegularText>
        </View>
        <Medium500Text style={styles.price}>{price.toFixed(2)}</Medium500Text>
        {participants && participants.length > 0 &&
        <View style={{position: 'absolute', flexDirection: 'row', bottom: 0, left: '10%', alignItems: 'center'}}>
            <RegularText style={{color: Colors.textgray, fontSize: RFValue(10)}}>Also selected by: </RegularText>
            <FlatList 
            data={participants}
            keyExtractor={item => item.id.toString()}
            horizontal={true}
            style={{}}
            renderItem={({ item }) => {
                // console.log("Rendering participant:", item);
                return (
                    <Profile_picture 
                        name={item.name}  
                        sizing_style={{height: scale(12), width: scale(12), borderWidth: 1, marginHorozontal: 5}}
                        text_sizing={{fontSize: RFValue(8)}}
                        maxLength={1}
                        image={item.profile_picture_url}
                    />
                );
            }}
            />
        </View>}
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: Colors.primary,
        borderRadius: scale(15),
        paddingHorizontal: scale(25),
        height: verticalScale(45),
        maxWidth: '100%',
        minWidth: '100%',
        marginVertical: verticalScale(3),
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    name: {
        fontFamily: 'DMSans_500Medium',
        fontSize: RFValue(14),
        // borderWidth: 1
    },
    price: {
        fontSize: RFValue(22),
        // borderWidth: 1
    },
    selected: {
        backgroundColor: Colors.button_fill_green
    },
    checkbox: {
        borderWidth: 1,
        height: scale(12),
        width: scale(12),
        borderRadius: scale(2),
        marginRight: scale(15)
    },
    selectedbox: {
        backgroundColor: Colors.primary
    },
    participants: {
        position: 'absolute',
        bottom: 0,
        left: '10%',
        fontSize: RFValue(10),
        color: Colors.textgray
    }
})

export default Receipt_items_list_component
