import React from 'react';
import { TouchableOpacity, View, StyleSheet, Text, Image, ViewComponent } from 'react-native';
import { RFPercentage, RFValue} from "react-native-responsive-fontsize"

import Colors from '../../../../Config/Colors';
import { RegularText, Bold700Text } from '../../../../Config/AppText';


function Split_bill_button({onPress}) {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} activeOpacity={.8} onPress={onPress}>
                <Image resizeMode='contain' style = {styles.image} source={require('../../../../assets/occo(35).png')}></Image>
                <Bold700Text style={styles.text}>Split Bill</Bold700Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginVertical: 2,
        // borderWidth: 2,
        backgroundColor: 'white',
        paddingVertical: 10
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: Colors.primary,
        borderRadius: 25,
        marginHorizontal: 10,
        flex: 1,
    },
    text: {
        color: Colors.white,
        fontSize: RFValue(18),
        paddingVertical: 10,
        fontFamily: 'DMSans_700Bold'
    }, 
    image: {
        marginRight: 8,
        height: RFValue(18),
        width: RFValue(18)
    }
})

export default Split_bill_button;