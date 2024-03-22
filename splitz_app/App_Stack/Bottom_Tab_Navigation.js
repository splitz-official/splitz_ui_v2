import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

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


//change icon and icon size when navigating

const Tab = createBottomTabNavigator();

function TabGroup() {
    return(
        <Tab.Navigator
        initialRouteName='Home'
        screenOptions={({ route, navigation}) => ({
            tabBarIcon: ({color, focused}) => {
                let iconName;
                let iconsize = RFValue(24);
                let IconComponent;

                if(route.name === 'Home'){
                    iconName = focused ? 'home-sharp' : 'home-outline'
                    return <Ionicons name={iconName} size={iconsize} color={color}/>
                } else if (route.name === "Profile"){
                    iconName = focused ? 'user-alt' : 'user'
                    return <FontAwesome5 name={iconName} size={iconsize} color={color}/>
                }
            },
            tabBarActiveTintColor: Colors.primary,
            tabBarInactiveTintColor: Colors.mediumgray,
            headerShown: false,
            tabBarStyle: {
                maxHeight: '8%',
                flex:1,
                paddingTop: '2%'
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

export default function Bottom_Tab_Navigation() {
    return(
        <TabGroup/>
    )
}