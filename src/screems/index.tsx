// HomeScreens.tsx

import React from 'react';
import ScreemForgotPass from '../screems/ScreemsLogin/ScreemForgotPass';
import ScreemLogin from '../screems/ScreemsLogin/ScreemLogin';
import ScreemRegister from '../screems/ScreemsLogin/ScreemRegister';
import DrawerNavigatorComponent from '../navigator/DrawerNavigator.tsx';
import UserScreen from './ScreemsUser/User.tsx';
import AppNaivigator from '../navigator/AppNavigator.tsx'


export function DetailsScreen() {
    return <ScreemForgotPass />;
}

export function HomeScreen() {
    return <ScreemLogin />;
}

export function DrawerNavigatorScreen() {
    return <DrawerNavigatorComponent />;
}

export function DrawerScreemRegister() {
    return <ScreemRegister />;
}

export function User() {
    return <UserScreen />;
}


export function AppNaivigatorr() {
    return <AppNaivigator />;
}

