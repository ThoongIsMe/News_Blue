import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import Color from '../constants/index';
import { DrawerScreemRegister, DrawerNavigatorScreen, User } from '../screems/index';




const Tab = createBottomTabNavigator();

export default function App() {
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
                    name="Home"
                    component={DrawerNavigatorScreen}
                    options={{
                        tabBarIcon: ({ size, color }) => (
                            <Icon name="home" size={size} color={color} />
                        )
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