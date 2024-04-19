import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ScreemForgotPass from '../screems/ScreemsLogin/ScreemForgotPass';
import ScreemLogin from '../screems/ScreemsLogin/ScreemLogin';
import Icon from 'react-native-vector-icons/Ionicons';
import Color from '../constants/index';


function DetailsScreen() {
    return <ScreemForgotPass />;
}

function HomeScreen() {
    return <ScreemLogin />;

}


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
                    component={DetailsScreen}
                    options={{
                        tabBarIcon: ({ size, color }) => (
                            <Icon name="home" size={size} color={color} />
                        )
                    }}

                />

                <Tab.Screen
                    name="Search"
                    component={DetailsScreen}
                    options={{
                        tabBarIcon: ({ size, color }) => (
                            <Icon name="search" size={size} color={color} />
                        )
                    }}

                />

                <Tab.Screen
                    name="Save"
                    component={HomeScreen}
                    options={{
                        tabBarIcon: ({ size, color }) => (
                            <Icon name="bookmark" size={size} color={color} />
                        ),
                    }}
                />


                <Tab.Screen
                    name="User"
                    component={HomeScreen}
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