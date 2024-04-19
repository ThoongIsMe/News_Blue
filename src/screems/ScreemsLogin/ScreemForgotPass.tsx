/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { Button, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Color from '../../constants/index';
import InputText from '../../components/InputText';
import PrimaryButton from '../../components/PrimaryButton';
import Container from '../../components/Container';


function ScreemForgotPass(): React.ReactElement {
    const [valueEmail, setTextEmail] = useState('');
    const handleInputEmailChange = (email: string) => {
        setTextEmail(email);
    };
    const handlePress = () => { }
    return (

        <Container>

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
                    Get Password
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
