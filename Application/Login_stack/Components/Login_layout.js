import React from 'react';
import { StyleSheet, View, Text, KeyboardAvoidingView } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import Colors from '../../../Config/Colors';


function Login_layout({title_text, subtitle_text, children}) {
    return (
        <View style={styles.container}>
            <KeyboardAvoidingView style={styles.content}>
                <Text style= {styles.title}>{title_text}</Text>
                <Text style= {styles.subtitle}>{subtitle_text}</Text>
                {children}
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white,
        flex: 1,
        marginTop: '5%',
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
    },
    content: {
        // borderWidth: 2,
        // marginLeft: 20,
        marginTop: 50,
        marginRight: 20
    },
    title: {
        fontFamily: 'DMSans_700Bold',
        fontSize: RFValue(18),
        marginLeft: 20,
    },
    subtitle: {
        fontFamily: 'DMSans_400Regular',
        color: Colors.textgray,
        fontSize: RFValue(12),
        marginTop: 5,
        marginLeft: 20,
    },
})

export default Login_layout;