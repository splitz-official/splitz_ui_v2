import React, {useRef} from 'react';
import { Animated, FlatList, View, StyleSheet, SafeAreaView, Button, Image, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import SlideItem from './Components/SlideItem';
import Slides from './Components/Data'
import Pagination from './Components/Pagination';
import Colors from '../../Config/Colors';
import Screen from '../../Components/Screen';
import { RFValue } from 'react-native-responsive-fontsize';
import GradientBackground from './Components/Gradient_background';
import Logo from './Components/Logo';
import axios from 'axios';
import * as SecureStore from "expo-secure-store"

function Landing({ route }) {
    console.log("Login Stack: Landing Screen")
    const { navigate } = useNavigation();
    const { baseURL } = route.params;
    // console.log(baseURL)

    handlePress = async () => {
        console.log("Verify User");
        let token = await SecureStore.getItemAsync("access_token");
        if (!token) {
          console.log("User is not logged in");
          navigate("Phone_Input_Screen");
        }
        axios
          .get(baseURL + "/user/", {
            headers: {
              "Content-Type": "application/json",
              Authorization: token ? `Bearer ${token}` : undefined,
            },
          })
          .then((res) => {
            console.log("User is logged in");
            navigate("Bottom_Tab_Home_Navigator", { baseURL: baseURL });
          })
          .catch((error) => {
            console.log("Error: User is not logged in");
            navigate("Phone_Input_Screen");
          });
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
        borderColor: 'orange',
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
        borderWidth: 2,
        borderColor: Colors.white,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 18,
        borderRadius: 15,
        marginVertical: 10
    }
})

export default Landing;