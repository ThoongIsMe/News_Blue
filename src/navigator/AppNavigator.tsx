import * as React from 'react';
import { NavigationContainer, getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import Color from '../constants/index';
import { DrawerScreemRegister, User, StackAppNavigatorr } from '../screems/index';





const Tab = createBottomTabNavigator();

export default function App() {
    const TabBarIcon = ({ size, color }: any) => (
        <Icon name="home" size={size} color={color} />
    );
    return (
        <NavigationContainer>
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
        </NavigationContainer>
    );
}



