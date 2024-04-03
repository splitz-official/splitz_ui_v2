import React, { useEffect, useRef } from 'react';
import { StyleSheet, TouchableOpacity, Animated } from 'react-native';
import Colors from '../Config/Colors';

const ToggleSwitch = ({ isEnabled, onToggle }) => {
    const animatedValue = useRef(new Animated.Value(isEnabled ? 1 : 0)).current;

    useEffect(() => {
        Animated.timing(animatedValue, {
            toValue: isEnabled ? 1 : 0,
            duration: 250,
            useNativeDriver: true,
        }).start();
    }, [isEnabled]);

    const circleTransform = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 17], // Adjusted to keep the circle within the switch
    });

    return (
        <TouchableOpacity
            onPress={onToggle}
            activeOpacity={1}
            style={[styles.switch, { backgroundColor: isEnabled ? Colors.primary : Colors.textInputGray }]}
        >
            <Animated.View style={[styles.circle, { transform: [{ translateX: circleTransform }] }]} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    switch: {
        width: 40, // Adjust width as needed
        height: 25, // Adjust height as needed
        borderRadius: 15, // To make it rounded
        justifyContent: 'center',
        padding: 2,
    },
    circle: {
        width: 19, // Should be less than switch height
        height: 20, // Should be less than switch height
        borderRadius: 9, // To make it circular
        backgroundColor: 'white',
        position: 'absolute',
        margin: 2, // Margin around the circle
    },
});

export default ToggleSwitch;