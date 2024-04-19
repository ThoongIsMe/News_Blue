/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { Button, Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Color from '../../constants/index'
import InputText from '../../components/InputText';
import PrimaryButton from '../../components/PrimaryButton';
import Container from '../../components/Container';


function ScreemRegister(): React.ReactElement {
    const [valueFirstName, setTextFirstName] = useState('');
    const handleInputFirstNameChange = (name: string) => {
        setTextFirstName(name);
    };

    const [valueLastName, setTextLastName] = useState('');
    const handleInputLastNameChange = (name: string) => {
        setTextLastName(name);
    };

    const [valueEmail, setTextEmail] = useState('');
    const handleInputEmailChange = (email: string) => {
        setTextEmail(email);
    };

    const [valuePass, setTextPass] = useState('');
    const handleInputPassChange = (pass: string) => {
        setTextPass(pass);
    };


    const [valueComfirmPass, setTextComfirmPass] = useState('');
    const handleInputComfirmPassChange = (pass: string) => {
        setTextComfirmPass(pass);
    };

    const handlePress = () => { }
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}>
            <ScrollView>
                <Container>
                    <View style={styles.img}>
                        <Image
                            source={require('../../assets/images/logoNews.jpg')}
                            style={styles.imgOver}
                        />
                    </View>

                    <InputText
                        handleInputChange={handleInputFirstNameChange}
                        value={valueFirstName}>
                        First name
                    </InputText>

                    <InputText
                        handleInputChange={handleInputLastNameChange}
                        value={valueLastName}>
                        Last name
                    </InputText>

                    <InputText
                        handleInputChange={handleInputEmailChange}
                        value={valueEmail}
                        placeholderText="email@email.com">
                        Email
                    </InputText>

                    <InputText
                        handleInputChange={handleInputPassChange}
                        value={valuePass}
                        secureTextEntry={true}>
                        Password
                    </InputText>

                    <InputText
                        handleInputChange={handleInputComfirmPassChange}
                        value={valueComfirmPass}
                        secureTextEntry={true}>
                        Comfirm Password
                    </InputText>


                    <View style={styles.btnSubmit}>
                        <PrimaryButton onPress={handlePress} color={Color.ui_blue_10} height={50} width={200} borderRadius={20}>
                            Get Password
                        </PrimaryButton>
                    </View>

                </Container>
            </ScrollView>
        </KeyboardAvoidingView>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    img: {
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imgOver: {
        width: 130,
        height: 130,
    },
    btnSubmit: {
        marginTop: 35,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imgleftArrow: {
        width: 22,
        height: 22,
    }
});

export default ScreemRegister;
