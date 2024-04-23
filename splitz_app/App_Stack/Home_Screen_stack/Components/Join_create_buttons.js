import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RFPercentage, RFValue} from "react-native-responsive-fontsize"
import { useNavigation } from '@react-navigation/native';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

import { RegularText, Bold700Text, Medium500Text } from '../../../../Config/AppText';
import Colors from '../../../../Config/Colors';


function Join_create_buttons(props) {
    let iconsize = RFValue(18);
    const navigation = useNavigation();

const handlejoinbutton = () => {
    console.log('Join with ID Pressed')
    navigation.navigate("Group_stack", {
        screen: 'Join_group',
    })
}

const handlecreatebutton = () => {
    console.log('Create Group Pressed')
    navigation.navigate("Group_stack", {
        screen: 'Create_group_screen',
    })
}

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.join_group_button} activeOpacity={.7} onPress={handlejoinbutton}>
                <Medium500Text style={styles.text}>Join with ID</Medium500Text>
                <MaterialCommunityIcons name="arrow-right-bottom" size={iconsize} color={Colors.primary}/>
                <FontAwesome name="group" size={iconsize} color={Colors.primary} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.join_group_button} activeOpacity={.7} onPress={handlecreatebutton}>
                <Medium500Text style={styles.text}>Create Group</Medium500Text>
                <AntDesign name="plus" size={iconsize} color={Colors.primary}/>
                <FontAwesome name="group" size={iconsize} color={Colors.primary}/>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 5
    },
    join_group_button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        marginHorizontal: 5,
        paddingVertical: 10,
        flex: 1,
        maxWidth: '45%',
        borderWidth: 1,
        borderColor: Colors.primary,
    },
    text: {
        color: Colors.primary,
        marginRight: 8,
        fontSize: RFValue(12),
        // borderWidth: 2
    }
})

export default Join_create_buttons;