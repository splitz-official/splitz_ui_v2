import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { StyleSheet } from 'react-native';

import { 
    Ionicons,
    FontAwesome, 
    FontAwesome6,
    FontAwesome5,
    Foundation,
    MaterialIcons,
    Feather,
} from '@expo/vector-icons';

import Colors from '../../Config/Colors';
import HomeStackNavigation from './Home_Screen_stack/Navigation_home_stack';
import ProfileStackNavigation from './Profile_Stack/Navigation_profile_stack';
import Profile_picture from '../../Components/Profile_picture';
import { scale } from 'react-native-size-matters';
import { useAxios } from '../../Axios/axiosContext';


//change icon and icon size when navigating

const Tab = createBottomTabNavigator();

function TabGroup() {
    const { userData } = useAxios();
    return(
        <Tab.Navigator
        initialRouteName='Home'
        screenOptions={({ route, navigation}) => ({
            tabBarIcon: ({color, focused}) => {
                let iconName;
                let iconsize = scale(30);
                let IconComponent;

                if(route.name === 'Home'){
                    iconName = focused ? 'home-sharp' : 'home-outline'
                    return <Ionicons name={iconName} size={iconsize} color={color}/>
                } else if (route.name === "Profile"){
                    iconName = focused ? 'user-alt' : 'user'
                    // return <FontAwesome5 name={iconName} size={iconsize} color={color}/>
                    return <Profile_picture 
                            name={userData.name} 
                            image={userData.profile_picture_url} 
                            sizing_style={[{height: scale(32), width: scale(32)}, focused ? styles.focused : styles.unfocused]} 
                            text_sizing={styles.icon_text}/>
                }
            },
            tabBarActiveTintColor: Colors.primary,
            tabBarInactiveTintColor: Colors.mediumgray,
            headerShown: false,
            tabBarStyle: {
                maxHeight: '8%',
                flex:1,
                justifyContent: 'center',
                alignItems: 'center',
                paddingTop: '2%',
                // borderTopWidth: 0,
                // borderWidth: 2,
                // borderColor: 'blue'
            },
            tabBarShowLabel: false,
            tabBarAllowFontScaling: true,
            tabBarLabelStyle:{
                fontFamily: 'DMSans_500Medium',
                fontSize: RFValue(9)
            }
        })}
        >
            <Tab.Screen name='Home' component={HomeStackNavigation}/>
            <Tab.Screen name='Profile' component={ProfileStackNavigation}/>
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    focused:{
        borderWidth: 2,
        borderColor: Colors.primary
    },
    unfocused: {
        backgroundColor: 'white'
    },
    icon_text: {
        fontSize: RFValue(16),
    }
})

export default function Bottom_Tab_Navigation() {
    return(
        <TabGroup/>
    )
}