import React from 'react';
import { View, StyleSheet } from 'react-native';

import Colors from '../Config/Colors';

function ListItemSeparator() {
    return (
        <View style = {styles.separator}/>
    );
}

const styles = StyleSheet.create({
    separator: {
        width: '80%',
        height: 1,
        backgroundColor: Colors.lightgray,
        marginLeft: '25%'
    }
})

export default ListItemSeparator;