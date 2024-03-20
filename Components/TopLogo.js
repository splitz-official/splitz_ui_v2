import React, { useState } from 'react';
import { View, Image, StyleSheet, TouchableWithoutFeedback, Text, Dimensions, TextInput, Animated, TouchableOpacity } from 'react-native';
import { RFPercentage, RFValue} from "react-native-responsive-fontsize"

import { Octicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import Colors from '../Config/Colors';
import { RegularText } from '../Config/AppText';


const handleLogoPress = () => {
    console.log('Home Logo Image Pressed');
};

const SearchExpandable = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [animation, setAnimation] = useState(new Animated.Value(0));
  
    const toggleSearchBar = () => {
      setIsExpanded(!isExpanded);
      Animated.timing(animation, {
        toValue: isExpanded ? 0 : 1,
        duration: 300,
        useNativeDriver: false, 
      }).start();
    };
  
    const width = animation.interpolate({
      inputRange: [0, 1],
      outputRange: ['10%', '80%'], 
    });

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
                <Animated.View style={{ width }}>
                    {isExpanded && (
                    <TextInput
                        placeholder="Search..."
                        style={styles.animatedsearchbar}
                    />
                    )}
                </Animated.View>
                <TouchableOpacity onPress={toggleSearchBar}>
                    <FontAwesome name="search" size={22} color={Colors.primary} />
                </TouchableOpacity>
        </View>
    );
};


function TopLogo() {
    return (
    <View style={styles.container}>
        <View>
            <RegularText style={styles.topLogoText}>splitz</RegularText>
        </View>
        {/* <View style={styles.topicons}>
            <SearchExpandable />
        </View> */}
    </View>
    
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
        paddingLeft: '5%',
        paddingRight: '7%',
        // borderWidth: 2
    },
    topLogoText: {
        fontSize: RFValue(18),
        color: Colors.primary,
    },
    topicons: {
        flexDirection: 'row',
        justifyContent:'flex-end',
        alignItems: 'center',
        // borderWidth: 2
    },
    animatedsearchbar: {
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 25,
        padding: 8,
        paddingLeft: 14,
        height: 30,
        marginHorizontal: 40,
        alignItems: 'center',
        shadowOpacity: .4,
        shadowOffset: {
        height:2,
        width:2
        },
        shadowRadius: 3
    }
})

export default TopLogo;