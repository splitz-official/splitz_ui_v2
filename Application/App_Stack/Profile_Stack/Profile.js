import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { SafeAreaView, Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import { Screen } from 'react-native-screens';
import axios from 'axios';
import * as SecureStore from "expo-secure-store";

function Profile(props) {
    const { navigate } = useNavigation();

    const logout = async () => {
        try {
            //ask Nikhil about needing to add backend call
            await SecureStore.deleteItemAsync('access_token');
            navigate('Landing_Screen');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };
    


    return (
        <Screen>
            <View style={styles.container}>
                <Text style = {styles.Text}>PROFILE SCREEN COMING SOON</Text>
                <TouchableOpacity
                onPress={logout}>
                    <Text>Logout</Text>
                </TouchableOpacity>
            </View>
        </Screen>
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
        fontSize: 40
    }
})

export default Profile;