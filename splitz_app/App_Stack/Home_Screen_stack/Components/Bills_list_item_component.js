import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Animated, I18nManager } from 'react-native';
import { Bold700Text, Medium500Text, RegularText } from '../../../../Config/AppText';
import { RFValue } from 'react-native-responsive-fontsize';
import { scale, verticalScale } from 'react-native-size-matters';
import { RectButton, Swipeable } from 'react-native-gesture-handler';

import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';

import Colors from '../../../../Config/Colors';

const Bills_list_item_component = ({ title, subtitle, onPress, deletePress}) => {

    const renderRightAction = (color, x, progress) => {
        const trans = progress.interpolate({
            inputRange: [0, 1],
            outputRange: [x, 0],
        });
        return (
            <Animated.View style={{ flex: 1, transform: [{ translateX: trans }] }}>
                <RectButton
                    style={[styles.rightAction, { backgroundColor: color }]}
                    onPress={deletePress}>
                    {/* <Text style={styles.actionText}>{text}</Text> */}
                    {/* <AntDesign name="delete" size={scale(24)} color="white" /> */}
                    <FontAwesome6 name="trash-can" size={scale(24)} color="white" />
                </RectButton>
            </Animated.View>
        );
    };

    const renderRightActions = (progress) => (
        <View style={{ width: scale(60)}}>
            {renderRightAction(Colors.delete_red, scale(60), progress)}
        </View>
    );

    return (
        <Swipeable
            renderRightActions={renderRightActions}
            overshootRight={false}
            rightThreshold={scale(60)}
            renderLeftActions={()=> null}
            >
            <View style={styles.container}>
                <View>
                    <Bold700Text style={styles.title}>{title}</Bold700Text>
                    <RegularText style={styles.subtitle}>Created by: {subtitle}</RegularText>
                </View>
                <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={styles.circle}>
                    <Medium500Text style={styles.circle_text}>View</Medium500Text>
                </TouchableOpacity>
            </View>
        </Swipeable>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: verticalScale(10),
        paddingHorizontal: '5%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    title: {
        fontSize: RFValue(12),
        marginBottom: verticalScale(5),
    },
    subtitle: {
        fontSize: RFValue(10),
    },
    circle: {
        height: scale(40),
        width: scale(40),
        borderRadius: 999,
        backgroundColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    circle_text: {
        color: Colors.white,
        fontSize: RFValue(10),
    },
    actionText: {
        color: 'white',
        fontSize: RFValue(16),
        backgroundColor: 'transparent',
        padding: 10,
    },
    rightAction: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        width: scale(60),
    },
});

export default Bills_list_item_component;
