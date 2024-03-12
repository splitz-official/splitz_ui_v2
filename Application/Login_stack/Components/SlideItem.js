import React from 'react';
import { View, StyleSheet, Text, Image, Dimensions } from 'react-native';
import Colors from '../../../Config/Colors';
import { RFValue } from 'react-native-responsive-fontsize';

const {width, height} = Dimensions.get('screen')

function SlideItem({item}) {
    return (
        <View style={styles.container}>
            <Image source={item.img}
            resizeMode='contain'
            style={styles.Image}
            />
            <View style={styles.content}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        // height: '90%',
        width,
        alignItems: 'center',
        // borderWidth: 5,
        // borderColor: 'orange',
    },
    content: {
        alignItems: 'flex-start',
        marginVertical: 5,
        // borderWidth: 2,
        borderColor: 'red',
        marginRight: RFValue(30),
        marginLeft: RFValue(10),
        flex: .3,
        marginTop: RFValue(20)
    },
    Image: {
        // borderWidth: 2,
        // borderColor: 'blue',
        width: '100%',
        flex: .7
    },
    title: {
        fontSize: RFValue(25),
        fontFamily: 'DMSans_700Bold',
        color: Colors.white,
        // borderWidth: 2
    },
    description: {
        fontSize: RFValue(14),
        marginVertical: 12,
        color: Colors.white,
        fontFamily: 'DMSans_400Regular',
        // borderWidth: 2
    }
})

export default SlideItem;