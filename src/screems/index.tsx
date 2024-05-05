// HomeScreens.tsx

import React from 'react';
import ScreemForgotPass from '../screems/ScreemsLogin/ScreemForgotPass';
import ScreemLogin from '../screems/ScreemsLogin/ScreemLogin';
import ScreemRegister from '../screems/ScreemsLogin/ScreemRegister';
import DrawerNavigatorComponent from '../navigator/DrawerNavigator.tsx';
import UserScreen from './ScreemsUser/User.tsx';
import AppNaivigator from '../navigator/AppNavigator.tsx'
import HomeNews from './ScreemsUser/HomeNews.tsx';
import ReadNewss from './ScreemsUser/ReadNews.tsx';
import StackAppNavigator from '../navigator/StackAppNavigator.tsx'
import SaveNews from './ScreemsUser/SaveNews.tsx';
import SearchNews from './ScreemsUser/SearchNews.tsx';
import StackAppUser from '../navigator/StackAppUser.tsx';

import Contact from './ScreemsUser/Contact.tsx';

export function Contacts() {
    return <Contact />;
}

export function StackAppUserr() {
    return <StackAppUser />;
}


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


export function HomeNewss() {
    return <HomeNews />;
}

export function ReadNews() {
    return <ReadNewss />;
}


export function StackAppNavigatorr() {
    return <StackAppNavigator />;
}

export function SaveNewss() {
    return <SaveNews />;
}

export function SearchNewss() {
    return <SearchNews />;
}




