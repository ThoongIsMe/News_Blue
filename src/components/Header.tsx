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
                    source={require('../assets/images/logoNews.jpg')}
                    style={{ width: 35, height: 35, borderRadius: 15, marginRight: 10 }}
                />
            </TouchableOpacity>

            {info.image != '' ? <CircularImageIcon imageSource={{ uri: info.image }} navigateToTab="Tài khoản" /> : ''}

        </View>
    );
};

export default Header;