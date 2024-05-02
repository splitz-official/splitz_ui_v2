import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RFPercentage, RFValue} from "react-native-responsive-fontsize"
import { useNavigation } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

import { RegularText, Bold700Text, Medium500Text } from '../../../../Config/AppText';
import Colors from '../../../../Config/Colors';
import { verticalScale } from 'react-native-size-matters';


function Join_create_buttons(props) {
    let iconsize = RFValue(18);
    const navigation = useNavigation();

const handlejoinbutton = () => {
    console.log('Join with ID Pressed')
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    navigation.navigate("Group_stack", {
        screen: 'Join_group',
    })
}

const handlecreatebutton = () => {
    console.log('Create Group Pressed')
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    navigation.navigate("Group_stack", {
        screen: 'Create_group_screen',
    })
}

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.join_group_button} activeOpacity={.7} onPress={handlecreatebutton}>
                <Medium500Text style={styles.text}>Create Group</Medium500Text>
                <AntDesign name="plus" size={iconsize} color={Colors.primary}/>
                <FontAwesome name="group" size={iconsize} color={Colors.primary}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.join_group_button} activeOpacity={.7} onPress={handlejoinbutton}>
                <Medium500Text style={styles.text}>Join Group</Medium500Text>
                <MaterialCommunityIcons name="arrow-right-bottom" size={iconsize} color={Colors.primary}/>
                <FontAwesome name="group" size={iconsize} color={Colors.primary} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: verticalScale(15),
        // marginBottom: verticalScale(10)
        // borderWidth: 1
    },
    join_group_button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        marginHorizontal: 5,
        paddingVertical: verticalScale(12),
        flex: 1,
        maxWidth: '45%',
        borderWidth: 1,
        borderColor: Colors.primary,
        backgroundColor: 'white',
        shadowColor: Colors.black,
        shadowOpacity: .3,
        shadowRadius:4,
        shadowOffset: {
            height: 4,
        }
    },
    text: {
        color: Colors.primary,
        marginRight: 8,
        fontSize: RFValue(12),
        // borderWidth: 2
    }
})

export default Join_create_buttons;