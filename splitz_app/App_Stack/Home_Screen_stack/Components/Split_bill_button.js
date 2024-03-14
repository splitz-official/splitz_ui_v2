import React from 'react';
import { TouchableOpacity, View, StyleSheet, Text, Image, ViewComponent } from 'react-native';
import { RFPercentage, RFValue} from "react-native-responsive-fontsize"

import Colors from '../../../../Config/Colors';
import { RegularText, Bold700Text } from '../../../../Config/AppText';


function Split_bill_button({onPress}) {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} activeOpacity={.8} onPress={onPress}>
                <Image style = {styles.image} source={require('../../../../assets/occo(35).png')}></Image>
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
        // borderWidth: 2
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: Colors.primary,
        borderRadius: 15,
        maxWidth: '93%',
        flex: 1,
        // borderWidth:2,
    },
    text: {
        color: Colors.white,
        fontSize: RFValue(20),
        paddingVertical: 15
    }, 
    image: {
        marginRight: 8,
        height: RFValue(18),
        width: RFValue(18)
    }
})

export default Split_bill_button;