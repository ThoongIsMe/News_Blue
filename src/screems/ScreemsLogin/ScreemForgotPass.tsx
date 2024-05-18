/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { Alert, Button, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Color from '../../constants/Colors';
import InputText from '../../components/InputText';
import PrimaryButton from '../../components/PrimaryButton';
import Container from '../../components/Container';
import Icon from 'react-native-vector-icons/Ionicons';
import sendMail from '../../helper/sendEmail';

import Url from '../../constants/Url';
function ScreemForgotPass({ navigation }: any): React.ReactElement {
    const [valueEmail, setTextEmail] = useState('');
    const handleInputEmailChange = (email: string) => {
        setTextEmail(email);
    };

    async function getPassAPI(email: string) {
        const apiUrl = `http://${Url.IP_WF}:${Url.PORT}/users?email=${email}`;

        try {
            const response = await fetch(apiUrl);
            const userData = await response.json();
            const password = userData[0]?.password;
            console.log(password);

            if (!password) {
                Alert.alert('Thất bại, vui lòng kiếm tra thông tin vừa nhập');
                return null;
            } else {
                Alert.alert('Thành công, vui lòng kiểm tra email của bạn');
            }
            return password;
        } catch (error) {
            Alert.alert('Thất bại, vui lòng kiếm tra thông tin vừa nhập');
        }
    }


    const handlePress = () => {
        getPassAPI(valueEmail)
            .then((password: string) => {
                if (password !== null) {
                    sendMail(valueEmail, password);
                }
            })
            .catch(error => {
                console.error('Error handling press:', error);
                // Xử lý lỗi khi không thể lấy mật khẩu từ API
            });
    }

    return (

        <Container>
            <View style={{ marginLeft: -10 }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="chevron-back" color={Color.ui_black_10} size={30} />
                </TouchableOpacity>
            </View>
            <View style={styles.img}>
                <Image
                    source={require('../../assets/images/logoNews.jpg')}
                    style={styles.imgOver}
                />
            </View>

            <InputText
                handleInputChange={handleInputEmailChange}
                value={valueEmail}
                placeholderText="email@email.com">
                Email
            </InputText>

            <View style={styles.btnSubmit}>
                <PrimaryButton onPress={handlePress} color={Color.ui_blue_10} height={50} width={200} borderRadius={20}>
                    Lấy mật khẩu
                </PrimaryButton>
            </View>

        </Container>
    );
}

const styles = StyleSheet.create({
    img: {
        marginTop: 70,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imgOver: {
        width: 180,
        height: 180,
    },
    btnSubmit: {
        marginTop: 65,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imgleftArrow: {
        width: 22,
        height: 22,
    }
});

export default ScreemForgotPass;
