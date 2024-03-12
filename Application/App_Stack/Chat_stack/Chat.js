import React from 'react';
import { SafeAreaView, Text, StyleSheet, View } from 'react-native';

function Chat(props) {
    return (
        <SafeAreaView>
            <View style={styles.container}>
                <Text style = {styles.Text}>CHAT SCREEN COMING SOON</Text>
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
        fontSize: 40
    }
})

export default Chat;