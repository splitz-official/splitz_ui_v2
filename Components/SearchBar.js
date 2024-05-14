import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '../Config/Colors';
import { scale } from 'react-native-size-matters';

const SearchBar = ({ placeholder, search_styles, onSearchChange }) => {


    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={[styles.container, search_styles]}>
                <FontAwesome name="search" size={18} color={Colors.primary} />
                <TextInput
                    style={styles.input}
                    placeholder={placeholder}
                    placeholderTextColor={Colors.textInputPlaceholder}
                    onChangeText={onSearchChange}
                />
            </View>
        </TouchableWithoutFeedback>

    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 25,
        padding: 8,
        paddingLeft: 14,
        height: 50,
        marginHorizontal: 40,
        alignItems: 'center',
        shadowOpacity: .4,
        shadowOffset: {
        height:2,
        width:2
        },
        shadowRadius: 3
    },
    input: {
        flex: 1,
        marginLeft: 10,
        fontSize: 14,
        fontFamily: "DMSans_500Medium",
        color: Colors.black
    },
});

export default SearchBar;
