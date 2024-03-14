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

import Home_screen from './Home_Screen_stack/Home_screen'
import Groups_and_Bills from './Bill_Groups_stack/Groups_and_Bills_Screen'
import Chat from './Chat_stack/Chat';
import Profile from './Profile_Stack/Profile';
import Colors from '../../Config/Colors';
import { RFValue } from 'react-native-responsive-fontsize';


const Tab = createBottomTabNavigator();

function TabGroup() {
    return(
        <Tab.Navigator
        screenOptions={({ route, navigation}) => ({
            tabBarIcon: ({color, focused}) => {
                let iconName;
                let iconsize = RFValue(22);
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
            tabBarActiveTintColor: Colors.black,
            tabBarInactiveTintColor: Colors.primary,
            headerShown: false,
            tabBarStyle: {
                maxHeight: '10%',
                flex:1,
                paddingTop: 10,
                borderTopWidth: 0,
                borderColor: 'transparent'
            },
            tabBarAllowFontScaling: true,
            tabBarLabelStyle:{
                fontFamily: 'DMSans_500Medium',
                fontSize: RFValue(9)
            }
        })}
        >
            <Tab.Screen name='Home' component={Home_screen}/>
            <Tab.Screen name='Groups' component={Groups_and_Bills}/>
            <Tab.Screen name='Messages'component={Chat}/>
            <Tab.Screen name='Profile' component={Profile}/>
        </Tab.Navigator>
    )
}

export default function Bottom_Tab_Navigation() {
    return(
        <TabGroup/>
    )
}