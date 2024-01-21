import React from 'react';
import { Text, StyleSheet } from 'react-native';

import colors from '../config/colors';

function ButtonText2({children}) {
    return (
        <Text style={styles.text}>{children}</Text>
    );
}

const styles = StyleSheet.create({
    text: {
        fontSize: 20,
        fontWeight: "bold",
        color: colors.primary,
        justifyContent: "center",
        alignItems:"center",
    },
});
export default ButtonText2;