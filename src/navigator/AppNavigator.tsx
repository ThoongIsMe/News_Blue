import * as React from 'react';
import { NavigationContainer, getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import Color from '../constants/Colors';
import { DrawerScreemRegister, User, StackAppNavigatorr } from '../screems/index';
import { createStackNavigator } from '@react-navigation/stack';
import ScreemLogin from '../screems/ScreemsLogin/ScreemLogin';
import ScreemRegister from '../screems/ScreemsLogin/ScreemRegister';
import ScreemForgotPass from '../screems/ScreemsLogin/ScreemForgotPass';
import { Provider } from 'react-redux';
import { store } from '../redux/store';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function App() {
    const TabBarIcon = ({ size, color }: any) => (
        <Icon name="home" size={size} color={color} />
    );
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: Color.ui_black_10,
                tabBarInactiveTintColor: Color.ui_grey_20,

            }}

        >
            <Tab.Screen
                name="TrangChu"
                component={StackAppNavigatorr}
                options={({ route }) => {
                    const focusedRouteName = getFocusedRouteNameFromRoute(route);
                    if (focusedRouteName !== 'ReadNews') {
                        return {
                            tabBarStyle: { display: 'flex' },
                            tabBarIcon: TabBarIcon, // Pass the Icon component as props
                        };
                    }
                    return {
                        tabBarStyle: { display: 'none' },
                        tabBarIcon: TabBarIcon, // Pass the Icon component as props
                    };
                }}
            />

            <Tab.Screen
                name="Search"
                component={DrawerScreemRegister}
                options={{
                    tabBarIcon: ({ size, color }) => (
                        <Icon name="search" size={size} color={color} />
                    )
                }}

            />

            <Tab.Screen
                name="Save"
                component={DrawerScreemRegister}
                options={{
                    tabBarIcon: ({ size, color }) => (
                        <Icon name="bookmark" size={size} color={color} />
                    ),
                }}
            />


            <Tab.Screen
                name="User"
                component={User}
                options={{
                    tabBarIcon: ({ size, color }) => (
                        <Icon name="person" size={size} color={color} />
                    ),
                }}
            />

        </Tab.Navigator>
    );
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Navigation() {
    return (

        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator initialRouteName='Login' screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="Login" component={ScreemLogin} />
                    <Stack.Screen name="Register" component={ScreemRegister} />
                    <Stack.Screen name="ForgotPass" component={ScreemForgotPass} />
                    <Stack.Screen name="Main" component={App} />
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>

    )
}




