import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import CircularImageIcon from './ImgAvt';
import { useSelector } from 'react-redux';


const Header = () => {
    const info = useSelector((state: any) => state.personalInfo);
    return (
        <View style={{
            justifyContent: 'space-between', flexDirection: 'row',
        }}>
            <TouchableOpacity>
                <Image
                    source={require('../assets/icon/menu.png')}
                    style={{ width: 30, height: 30, borderRadius: 15, marginRight: 10 }}
                />
            </TouchableOpacity>

            <CircularImageIcon imageSource={{ uri: info.image }} navigateToTab="User" />

        </View>
    );
};

export default Header;