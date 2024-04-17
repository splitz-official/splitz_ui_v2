import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import Constants from 'expo-constants';

import Logo from './Logo';
import Screen from '../../../Components/Screen';
import Colors from '../../../Config/Colors';

function GradientBackground({children, showBottomView = false}) {
    return (
        <LinearGradient
            colors={['#005D1A','#005D1A','#428E57', '#65A878','#C1EBCD']} 
            start={{ x: 0, y: 0.6 }}
            end={{ x: 1, y: 0 }}
            style={styles.container}>
            <SafeAreaView style={{paddingTop: Constants.statusBarHeight, flex: 1}}>
                <Logo/>
                {children}
            </SafeAreaView>
            {showBottomView && <View style={styles.bottom}/>}
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    bottom: {
        backgroundColor: Colors.white,
        flex: .1
    },
})

export default GradientBackground;
