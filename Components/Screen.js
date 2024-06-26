import React from 'react';
import { StyleSheet, SafeAreaView} from 'react-native';
import Constants from 'expo-constants';
import Colors from '../Config/Colors';


function Screen({children, style}) {
    return (
        <SafeAreaView style = {[styles.screen, style]}>
            {children}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screen: {
        paddingTop: Constants.statusBarHeight,
        flex: 1,
        backgroundColor: Colors.white
    }
})

export default Screen;