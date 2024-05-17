import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { scale, verticalScale } from 'react-native-size-matters'
import { RFValue } from 'react-native-responsive-fontsize'

import { MaterialIcons } from '@expo/vector-icons';

import Colors from '../../../../Config/Colors'
import { Medium500Text, RegularText } from '../../../../Config/AppText';
import Profile_picture from '../../../../Components/Profile_picture';

const Receipt_items_list_component = ({ 
    name, 
    price, 
    quantity, 
    onPress, 
    isSelected, 
    participants, 
    editing, quick = false, 
    readOnly = true,
    changeName,
    changeQuantity,
    changePrice
    }) => {

    const truncate = (text, maxLength) => {
        return text.length > maxLength ? text.substring(0, maxLength - 3) + '...' : text;
    };

  return (
    <TouchableOpacity activeOpacity={.8} style={!readOnly ? [styles.container, {backgroundColor: 'white'}] : [styles.container, isSelected ? styles.selected : {}]} onPress={onPress}>
        {!readOnly ? <TouchableOpacity activeOpacity={1} style={{position: 'absolute', right: 2, top: -6, backgroundColor: 'white'}}>
            <MaterialIcons name="cancel" size={scale(16)} color="red" />
        </TouchableOpacity>
        : 
        null
        }
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {!readOnly ? null : <View style={[styles.checkbox, isSelected ? styles.selectedbox: {}]}/>}
            {!readOnly ? 
                <>
                <TextInput 
                value={name}
                onChangeText={changeName}
                placeholder={name}
                // readOnly={readOnly}
                keyboardType='default'
                style={[styles.name, !readOnly ? [styles.textinput, {}] : {}]}
                />
                <TextInput
                value={quantity}
                onChangeText={changeQuantity}
                placeholder={quantity}
                // readOnly={readOnly}
                keyboardType='numeric'
                style={[styles.quantity, !readOnly ? [styles.textinput, {}] : {}]}
                />
                <TextInput
                value={price}
                onChangeText={changePrice}
                placeholder={price}
                // readOnly={readOnly}
                keyboardType='numeric'
                style={[styles.price, !readOnly ? [styles.textinput, {}] : {}]}
                />
                </>
            :
            <>
                <RegularText numberOfLines={1} style={styles.name}>{truncate(name, 15)} {quantity}</RegularText>
                <Medium500Text style={styles.price}>{price}</Medium500Text>
            </>
            }
            
        </View>
        
        {readOnly && participants && participants.length > 0 &&
        <View style={{position: 'absolute', flexDirection: 'row', bottom: 0, left: '10%', alignItems: 'center'}}>
            <RegularText style={{color: Colors.textgray, fontSize: RFValue(10)}}>Selected {quick ? "for" : "by"}: </RegularText>
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
                        sizing_style={{height: scale(12), width: scale(12), borderWidth: 1, marginHorizontal: 1}}
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
        height: verticalScale(48),
        maxWidth: '100%',
        minWidth: '100%',
        marginVertical: verticalScale(3),
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    name: {
        fontFamily: 'DMSans_500Medium',
        fontSize: RFValue(14),
        flex: 1.5
        // borderWidth: 1
    },
    quantity: {
        fontFamily: 'DMSans_500Medium',
        fontSize: RFValue(14),
        flex: .3,
        textAlign: 'center'
        // borderWidth: 1
    },
    price: {
        fontSize: RFValue(22),
        fontFamily: 'DMSans_500Medium',
        textAlign: 'right',
        flex: 1,
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
    },
    textinput: {
        borderBottomWidth: 1,
        paddingHorizontal: scale(5),
        paddingTop: scale(2),
        // borderRadius: scale(5),
        borderColor: Colors.mediumgray,
        backgroundColor: Colors.backgroundFillGray,
        marginHorizontal: scale(1),
        
    }
})

export default Receipt_items_list_component
