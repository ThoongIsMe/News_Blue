// DrawerNavigatorComponent.tsx
import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import 'react-native-gesture-handler';
import { DetailsScreen, HomeScreen } from '../screems/index';
import Color from "../constants/index";
import CircularImageIcon from '../components/ImgAvt';

const Drawer = createDrawerNavigator();

function DrawerNavigatorComponent() {

    return (
        <Drawer.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: Color.ui_grey_10,
                },
                headerTitle: '',
                headerRight: () => <CircularImageIcon imageSource={require('../assets/images/anhthe.jpg')} navigateToTab="User" />
                , // Pass the toggleHeader function
            }}
        >
            <Drawer.Screen name="ScreemForgotPass" component={DetailsScreen} />
            <Drawer.Screen name="ScreemLogin" component={HomeScreen} />
        </Drawer.Navigator>
    );
}

export default DrawerNavigatorComponent;
