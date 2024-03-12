import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, View } from 'react-native';

import Logo from './Logo';
import Screen from '../../../Components/Screen';
import Colors from '../../../Config/Colors';

function GradientBackground({children, showBottomView = false}) {
    return (
        <View style={{flex:1}}>
            <LinearGradient
                colors={['#005D1A','#005D1A','#428E57', '#65A878','#C1EBCD']} 
                start={{ x: 0, y: 0.6 }}
                end={{ x: 1, y: 0 }}
                style={styles.container}>
                <Screen>
                    <Logo/>
                    {children}
                </Screen>
            </LinearGradient>
            {showBottomView && <View style={styles.bottom}/>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    bottom: {
        backgroundColor: Colors.white,
        flex: .1
    },
})

export default GradientBackground;
