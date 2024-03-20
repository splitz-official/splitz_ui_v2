import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { 
    Ionicons,
    FontAwesome, 
    FontAwesome6,
    FontAwesome5,
    Foundation,
    MaterialIcons,
    Feather,
} from '@expo/vector-icons';

import Groups_and_Bills from './Bill_Groups_stack/Groups_and_Bills_Screen'
import Chat from './Chat_stack/Chat';
import Profile from './Profile_Stack/Profile';
import Colors from '../../Config/Colors';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import HomeStackNavigation from './Home_Screen_stack/Navigation_home_stack';
import Coming_soon from './Bill_Groups_stack/Coming_soon';


const Tab = createBottomTabNavigator();

function TabGroup() {
    return(
        <Tab.Navigator
        screenOptions={({ route, navigation}) => ({
            tabBarIcon: ({color, focused}) => {
                let iconName;
                let iconsize = RFValue(24);
                let IconComponent;

                if(route.name === 'Home'){
                    return <Ionicons name='home-outline' size={iconsize} color={color}/>
                } else if (route.name === "Groups"){
                    return <Feather name='users' size={iconsize} color={color}/>
                } else if (route.name === "Messages"){
                    return <Ionicons name="chatbubbles-outline" size={iconsize} color={color}/>
                } else if (route.name === "Profile"){
                    return <Feather name="user" size={iconsize} color={color}/>
                }
            },
            tabBarActiveTintColor: Colors.primary,
            tabBarInactiveTintColor: Colors.mediumgray,
            headerShown: false,
            tabBarStyle: {
                maxHeight: '10%',
                flex:1,
                paddingTop: RFPercentage(2),
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
            {/* <Tab.Screen name='Groups' component={Coming_soon}/> */}
            {/* <Tab.Screen name='Messages'component={Chat}/> */}
            <Tab.Screen name='Profile' component={Profile}/>
        </Tab.Navigator>
    )
}

export default function Bottom_Tab_Navigation() {
    return(
        <TabGroup/>
    )
}