// StackAppNavigator.tsx

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ReadNews from '../screems/ScreemsUser/ReadNews';
import SaveNews from '../screems/ScreemsUser/SaveNews';
const Stack = createStackNavigator();

const StackAppSave = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>

            {/* <Stack.Screen name="Login" component={ScreemLogin} /> */}

            <Stack.Screen
                name="SaveNews"
                component={SaveNews}
                options={{ headerShown: false }} // Ẩn thanh điều hướng cho màn hình "Home"
            />
            <Stack.Screen name="ReadNews" component={ReadNews} />

        </Stack.Navigator>
    );
}

export default StackAppSave;
