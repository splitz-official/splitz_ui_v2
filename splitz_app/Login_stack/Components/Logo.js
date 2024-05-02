import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

function Logo(props) {
    return (
        <Image style={styles.Logo} source={require('../../../assets/White_logo&name.png')} resizeMode='cover'/>
    );
}

const styles = StyleSheet.create({
    Logo: {
        // borderWidth: 2,
        height: RFValue(50),
        width: RFValue(100),
        marginLeft: '5%',
        marginVertical: 5,
    },
})

export default Logo;