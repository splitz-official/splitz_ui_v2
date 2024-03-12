import React from 'react';
import { StyleSheet, View, Text, SafeAreaView } from 'react-native';
import { RegularText } from './Config/AppText';

function Text_example(props) {
    return (
        <SafeAreaView>
            <View style={styles.container}>
                <Text style = {styles.Text}>TEXT text 123 EXAMPLE example 456</Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        // borderWidth: 2,
        height: '100%',
        marginHorizontal: 20
    },
    Text: {
        fontSize: 40,
        fontWeight: '900',
        fontFamily: 'DMSans_400Regular',
        // fontFamily: 'DMSans_500Medium',
        // fontFamily: 'DMSans_700Bold',
        // fontFamily: 'Chalkduster',
        // fontFamily: 'Baskerville',
        // fontFamily: 'DMSans_400Regular_Italic'
    }
})

export default Text_example;