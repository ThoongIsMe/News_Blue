/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { Button, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Color from '../../constants/index'
import InputText from '../../components/InputText';
import PrimaryButton from '../../components/PrimaryButton';
import Container from '../../components/Container';


function ScreemLogin(): React.ReactElement {
    const [valueEmail, setTextEmail] = useState('');
    const [valuePass, setTextPass] = useState('');

    const handleInputEmailChange = (email: string) => {
        setTextEmail(email);
    };

    const handleInputPassChange = (pass: string) => {
        setTextPass(pass);
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

            <InputText handleInputChange={handleInputEmailChange}
                value={valueEmail}
                placeholderText="email@email.com">
                Email
            </InputText>

            <InputText handleInputChange={handleInputPassChange}
                value={valuePass}
                secureTextEntry={true}>
                Password
            </InputText>


            <TouchableOpacity style={styles.btnForgot}>
                <Text style={styles.textForgot}>Forgot password</Text>
            </TouchableOpacity>

            <View style={styles.btnSubmit}>
                <PrimaryButton onPress={handlePress} color={Color.ui_blue_10} height={50} width={200} borderRadius={20}>
                    Submit
                </PrimaryButton>
            </View>

            <View style={styles.btnRegister}>
                <Text>Don't have an account? </Text>
                <TouchableOpacity>
                    <Text style={styles.textForgot}>Forgot password</Text>
                </TouchableOpacity>
            </View>

        </Container>


    );
}

const styles = StyleSheet.create({
    img: {
        marginTop: 70,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
    },
    imgOver: {
        width: 180,
        height: 180,
    },
    btnForgot: {
        paddingTop: 10,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    textForgot: {
        color: Color.ui_black_10,
        fontWeight: "bold",
        fontSize: 16,
    },
    btnSubmit: {
        marginTop: 65,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnRegister: {
        paddingTop: 60,
        flexDirection: 'row',
        justifyContent: "center",
    },
});

export default ScreemLogin;
