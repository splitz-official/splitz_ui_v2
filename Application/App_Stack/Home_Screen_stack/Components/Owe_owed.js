import React from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, TouchableOpacity, TouchableHighlight } from 'react-native';
import { RFPercentage, RFValue} from "react-native-responsive-fontsize"

import { RegularText, Bold700Text, Medium500Text } from '../../../../Config/AppText';
import Colors from '../../../../Config/Colors';

const handleyouowepress = () => {
    console.log('You owe Box Pressed');
};

const handleyoureowedpress = () => {
    console.log('Youre owed Box Pressed');
};


function Owe_owed(props) {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.owe_owed_boxes} onPress={handleyouowepress} activeOpacity={.7}>
                    <Medium500Text style={styles.owe_owed_text}>You Owe:</Medium500Text>
                    <Bold700Text style={styles.owed_owed_dollar_amount}>$51.72</Bold700Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.owe_owed_boxes} onPress={handleyoureowedpress} activeOpacity={.7}>
                    <Medium500Text style={styles.owe_owed_text}>You're Owed:</Medium500Text>
                    <Bold700Text style={styles.owed_owed_dollar_amount}>$23.50</Bold700Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        // borderWidth:2,
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 5,
    },
    owe_owed_boxes: {
        borderWidth: 2,
        alignContent: 'flex-start',
        alignItems:'flex-start',
        paddingTop: 5,
        paddingLeft: 15,
        borderRadius: 15,
        borderColor: Colors.lightgray,
        flex: 1,
        maxWidth: '45%',
        marginHorizontal: 5, //this is just for the center spacing since the maxwidth is greater than the marginhorizontal of 5
    },
    owed_owed_dollar_amount: {
        // fontSize: 35,
        fontSize: RFValue(30),
        // borderWidth: 2
    },
    owe_owed_text: {
        fontSize: RFValue(12),
        // borderWidth: 2
    }
})

export default Owe_owed;