// StackAppNavigator.tsx

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ReadNews from '../screems/ScreemsUser/ReadNews';
import HomeNews from '../screems/ScreemsUser/HomeNews';

const Stack = createStackNavigator();

const StackAppNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={HomeNews}
                options={{ headerShown: false }} // Ẩn thanh điều hướng cho màn hình "Home"
            />
            <Stack.Screen name="ReadNews" component={ReadNews} />
            {/* Add other screens as needed */}
        </Stack.Navigator>
    );
}

export default StackAppNavigator;
