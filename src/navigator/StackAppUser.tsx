// StackAppNavigator.tsx

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ScreemLogin from '../screems/ScreemsLogin/ScreemLogin';
import PasswordChange from '../screems/ScreemsUser/PasswordChange';
import Profile from '../screems/ScreemsUser/Profile';
import Security from '../screems/ScreemsUser/Security';
import { User, Contacts } from '../screems/index';
import ReadNews from '../screems/ScreemsUser/ReadNews';
// admin
import ManagerNews from '../screems/ScreensAdmin/ManagerNews';
import ManagerAccounts from '../screems/ScreensAdmin/ManagerAccounts';
import AddCategories from '../screems/ScreensAdmin/AddCategories';
import AddNews from '../screems/ScreensAdmin/AddNews';
import DeleteAccount from '../screems/ScreensAdmin/DeleteAccount';


const Stack = createStackNavigator();

const StackAppUser = () => {
    return (
        <Stack.Navigator initialRouteName="User" screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name="User"
                component={User}
                options={{ headerShown: false }}

            />
            <Stack.Screen name="ScreemLogin" component={ScreemLogin} />
            <Stack.Screen name='Contact' component={Contacts} />
            <Stack.Screen name='PasswordChange' component={PasswordChange} />
            <Stack.Screen name="Security" component={Security} />
            <Stack.Screen name="Profile" component={Profile} />

            <Stack.Screen name="ManagerNews" component={ManagerNews} />
            <Stack.Screen name="ReadNews" component={ReadNews} />

            <Stack.Screen name="ManagerAccounts" component={ManagerAccounts} />
            <Stack.Screen name="AddCategories" component={AddCategories} />
            <Stack.Screen name="AddNews" component={AddNews} />
            <Stack.Screen name="DeleteAccount" component={DeleteAccount} />

        </Stack.Navigator>
    );
}

export default StackAppUser;
