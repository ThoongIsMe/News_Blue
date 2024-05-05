// StackAppNavigator.tsx

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ScreemLogin from '../screems/ScreemsLogin/ScreemLogin';
import PasswordChange from '../screems/ScreemsUser/PasswordChange';
import Profile from '../screems/ScreemsUser/Profile';
import Security from '../screems/ScreemsUser/Security';

import { User, Contacts } from '../screems/index';

const Stack = createStackNavigator();

const StackAppUser = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name="User"
                component={User}
                options={{ headerShown: false }}

            />
            <Stack.Screen name="ScreemLogin" component={ScreemLogin} />
            <Stack.Screen name='Contact' component={Contacts} />
            <Stack.Screen name="PasswordChange" component={PasswordChange} />
            <Stack.Screen name="Security" component={Security} />
            <Stack.Screen name="Profile" component={Profile} />
        </Stack.Navigator>
    );
}

export default StackAppUser;
