2/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import { DrawerNavigatorScreen } from '../screems/index'

const Stack = createStackNavigator();

function StackAppNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Main" component={DrawerNavigatorScreen} options={{}} />
            {/* Add other screens as needed */}
        </Stack.Navigator>
    );
}


export default StackAppNavigator;
