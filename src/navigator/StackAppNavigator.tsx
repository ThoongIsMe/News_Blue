// StackAppNavigator.tsx

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ReadNews from '../screems/ScreemsUser/ReadNews';
import HomeNews from '../screems/ScreemsUser/HomeNews';
// import ScreemLogin from '../screems/ScreemsLogin/ScreemLogin';
import Comments from '../screems/ScreemsUser/Comments';


import HomeScreemUser from '../screems/ScreemsUser/HomeScreemUser';
const Stack = createStackNavigator();

const StackAppNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>

            {/* <Stack.Screen name="Login" component={ScreemLogin} /> */}

            <Stack.Screen
                name="Home"
                component={HomeNews}
                options={{ headerShown: false }} // Ẩn thanh điều hướng cho màn hình "Home"
            />
            <Stack.Screen name="ReadNews" component={ReadNews} />
            <Stack.Screen name="HomeUser" component={HomeScreemUser} />
            <Stack.Screen name="Comments" component={Comments} />




        </Stack.Navigator>
    );
}

export default StackAppNavigator;
