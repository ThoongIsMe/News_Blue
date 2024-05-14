import * as React from 'react';
import { NavigationContainer, getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import Color from '../constants/Colors';
import { StackAppUserr, StackAppNavigatorr } from '../screems/index';
import { createStackNavigator } from '@react-navigation/stack';
import ScreemLogin from '../screems/ScreemsLogin/ScreemLogin';
import ScreemRegister from '../screems/ScreemsLogin/ScreemRegister';
import ScreemForgotPass from '../screems/ScreemsLogin/ScreemForgotPass';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import StackAppSave from './StackAppSave';
import StackAppSearch from './StackAppSearch';
// import Load from '../screems/HomeScreems/load';
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
// import { useDispatch, useSelector } from 'react-redux';
// import { useEffect, useState } from 'react';


function App() {
    const TabBarIcon = ({ size, color }: any) => (
        <Icon name="home" size={size} color={color} />
    );

    const TabBarIconSave = ({ size, color }: any) => (
        <Icon name="bookmark" size={size} color={color} />
    );

    const TabBarIconSearch = ({ size, color }: any) => (
        <Icon name="search" size={size} color={color} />
    );



    const TabBarIconUser = ({ size, color }: any) => (
        <Icon name="person" size={size} color={color} />
    );


    // const check = useSelector((state: any) => state.checkInfo);
    // const [key, setKey] = useState(0); // Key state
    // useEffect(() => {
    //     setKey(prevKey => prevKey + 1); // Increment key whenever checkLoad changes
    //     console.log(check);
    // }, [check, key]);

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: Color.ui_black_10,
                tabBarInactiveTintColor: Color.ui_grey_20,

            }}

        >
            <Tab.Screen
                name="Trang chủ"
                component={StackAppNavigatorr}
                options={({ route }) => {
                    const focusedRouteName = getFocusedRouteNameFromRoute(route) || '';

                    if (!['ReadNews', 'Comments'].includes(focusedRouteName)) {
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
                name="Tìm kiếm"
                component={StackAppSearch}
                options={({ route }) => {
                    const focusedRouteName = getFocusedRouteNameFromRoute(route) || '';
                    if (focusedRouteName !== 'ReadNews') {
                        return {
                            tabBarStyle: { display: 'flex' },
                            tabBarIcon: TabBarIconSearch, // Pass the Icon component as props
                        };
                    }
                    return {
                        tabBarStyle: { display: 'none' },
                        tabBarIcon: TabBarIconSearch, // Pass the Icon component as props
                    };
                }}

            />

            <Tab.Screen
                name="Đã lưu"
                component={StackAppSave}
                options={({ route }) => {
                    const focusedRouteName = getFocusedRouteNameFromRoute(route);
                    if (focusedRouteName !== 'ReadNews') {
                        return {
                            tabBarStyle: { display: 'flex' },
                            tabBarIcon: TabBarIconSave, // Pass the Icon component as props
                        };
                    }
                    return {
                        tabBarStyle: { display: 'none' },
                        tabBarIcon: TabBarIconSave, // Pass the Icon component as props
                    };
                }}
            />


            <Tab.Screen
                name="Tài khoản"
                component={StackAppUserr}
                options={({ route }) => {
                    const focusedRouteName = getFocusedRouteNameFromRoute(route) || '';
                    if (!['Contact', 'PasswordChange', 'Security', 'Profile', 'ManagerNews', 'AddCategories', 'AddNews', 'DeleteAccount', 'UpdateNews', 'ManagerAccounts'].includes(focusedRouteName)) {
                        return {
                            tabBarStyle: { display: 'flex' },
                            tabBarIcon: TabBarIconUser, // Pass the Icon component as props
                        };
                    }
                    return {
                        tabBarStyle: { display: 'none' },
                        tabBarIcon: TabBarIconUser, // Pass the Icon component as props
                    };
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




