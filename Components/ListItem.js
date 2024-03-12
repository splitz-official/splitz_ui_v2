import React from 'react';
import { View, StyleSheet, Image, TouchableHighlight, Text} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { RFPercentage, RFValue} from "react-native-responsive-fontsize"

import Colors from '../Config/Colors';
import { RegularText, Bold700Text, Medium500Text } from '../Config/AppText';


function Listitem({image, title, subTitle, onPress, renderRightAction, style, IconComponent, backgroundColor, date}) {
    return (
        <GestureHandlerRootView>
            <Swipeable renderRightActions={renderRightAction}>
                <TouchableHighlight 
                    style={styles.container}
                    underlayColor={Colors.lightgray}
                    onPress={onPress}>
                    <View style={[styles.list_item, style]}>
                        {IconComponent}
                        {image ? (
                            <Image style={styles.image} source={image} />
                        ) : (
                            <View style={[styles.image, { backgroundColor: backgroundColor || 'transparent' }]} />
                        )}
                        {/* {image && <Image style={styles.image} source={image} ></Image>} */}
                        <View style={styles.details}>
                            <Medium500Text style={styles.titleText}>{title}</Medium500Text>
                            {subTitle && <RegularText style={styles.subtitletext} >{subTitle}</RegularText>}
                            <Text style={styles.datetext}>{date}</Text>
                        </View>
                    </View>
                </TouchableHighlight>
            </Swipeable>
        </GestureHandlerRootView>
    );
}


const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 12,
        marginVertical:2,
        justifyContent: 'center',
        // borderWidth: 2
    },
    list_item: {
        flexDirection: 'row',
        paddingVertical: 5
    },
    image: {
        width: RFValue(55),
        height: RFValue(55),
        borderRadius: RFValue(27.5),
    },
    details:{
        marginLeft: 20,
        justifyContent:'center',
    },
    titleText: {
        fontSize: RFValue(14)
    },
    subtitletext: {
        fontSize: RFValue(10)
    },
    datetext: {
        color: Colors.mediumgray,
        fontSize: RFValue(10)
    }
})

export default Listitem;