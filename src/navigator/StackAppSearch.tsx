// StackAppNavigator.tsx

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ReadNews from '../screems/ScreemsUser/ReadNews';
import SearchNews from '../screems/ScreemsUser/SearchNews';
const Stack = createStackNavigator();

const StackAppSearch = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>

            {/* <Stack.Screen name="Login" component={ScreemLogin} /> */}

            <Stack.Screen
                name="SearchNews"
                component={SearchNews}
                options={{ headerShown: false }} // Ẩn thanh điều hướng cho màn hình "Home"
            />
            <Stack.Screen name="ReadNews" component={ReadNews} />

        </Stack.Navigator>
    );
}

export default StackAppSearch;
