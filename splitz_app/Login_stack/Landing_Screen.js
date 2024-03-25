import React, {useEffect, useRef} from 'react';
import { Animated, FlatList, View, StyleSheet, SafeAreaView, Button, Image, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';

import axiosInstance from '../../Axios/axiosInstance';
import { useAxios } from '../../Axios/axiosContext';


import SlideItem from './Components/SlideItem';
import Slides from './Components/Data'
import Pagination from './Components/Pagination';
import Colors from '../../Config/Colors';
import GradientBackground from './Components/Gradient_background';
import * as SecureStore from "expo-secure-store"

function Landing({ route }) {
    console.log("Login Stack: Landing Screen")
    const { navigate } = useNavigation();

    // const { token } = useAxios();

    // useEffect(() => {
    //     if (token) {
    //         console.log("navigaate from landing screen")
    //         navigate("Bottom_Tab_Home_Navigator");
    //     }
    // }, [token, navigate]);

    handlePress = async () => {
        console.log("From Landing_Screen: Verify User");
        const token = await SecureStore.getItemAsync("access_token");
        if (!token) {
          console.log("User is not logged in");
          navigate("Phone_Input_Screen");
        }
        else if(token) {
            console.log("get user from landing_screen is running")
            axiosInstance.get("/user/")
            .then((res) => {
                console.log("User is logged in");
                navigate("Bottom_Tab_Home_Navigator");
            })
            .catch((error) => {
                console.error("Error: User is not logged in", error);
                navigate("Phone_Input_Screen");
            });
        }
    };

    const scrollX = useRef(new Animated.Value(0)).current;
    const handleOnScroll = event => {
        Animated.event([
            {
                nativeEvent: {
                    contentOffset: {
                        x: scrollX,
                    },
                },
            },
        ], {
            useNativeDriver: false
        }
        )(event);
    }

    return (
        <GradientBackground>
                <FlatList style={styles.list} data={Slides} renderItem=
                {({item}) => <SlideItem item={item}/>}
                horizontal
                pagingEnabled
                snapToAlignment='center'
                showsHorizontalScrollIndicator={false}
                onScroll={handleOnScroll}
                />
                <Pagination data={Slides} scrollX={scrollX}/>
                <TouchableOpacity 
                onPress={handlePress}
                activeOpacity={.7} 
                style={styles.login}>
                    <Text style={{fontSize: RFValue(16), color: Colors.primary, fontFamily: 'DMSans_700Bold'}}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                onPress={handlePress}
                activeOpacity={.7} 
                style={styles.signup}>
                    <Text style={{fontSize: RFValue(16), color: Colors.white, fontFamily: 'DMSans_700Bold'}}>Sign Up</Text>
                </TouchableOpacity>
        </GradientBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        // flex: 1
        height: '100%',
        horizontal: '100%'
    },
    list: {
        // borderWidth: 5,
        // borderColor: 'orange',
    },
    login: {
        marginHorizontal: 15,
        backgroundColor: Colors.white,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 18,
        borderRadius: 15,
        marginVertical: 5,
    },
    signup: {
        marginHorizontal: 15,
        borderColor: Colors.white,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 18,
        borderRadius: 15,
        marginVertical: 10,
        borderWidth: 2,
    }
})

export default Landing;