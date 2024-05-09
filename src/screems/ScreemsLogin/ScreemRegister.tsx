/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Alert, Button, Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Color from '../../constants/Colors'
import InputText from '../../components/InputText';
import PrimaryButton from '../../components/PrimaryButton';
import Container from '../../components/Container';
import Icon from 'react-native-vector-icons/Ionicons';
import Url from '../../constants/Url';
import uuid from 'react-native-uuid';
import { getUserFromApiAsync } from '../../helper/api';




function ScreemRegister({ navigation }: any): React.ReactElement {
    const [getPassVisible, setPassVisible] = useState(false);
    const [getPassVisible1, setPassVisible1] = useState(false);
    const [user, setUser] = useState<Users[]>([]);



    interface Users {
        id: string;
        lastName: string;
        firstName: string;
        image: string;
        email: string;
        password: string;
        role: string;

    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userData = await getUserFromApiAsync();
                setUser(userData);
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };
        fetchData();
    }, []);


    const isEmailExists = (searchTerm: string): boolean => {
        return user.some(user => user.email.toLowerCase() === searchTerm.toLowerCase());
    };



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


    const handlePress = () => {
        if (valueFirstName !== '' && valueLastName !== '' && valueEmail !== ''
            && valueComfirmPass !== '' && valueComfirmPass === valuePass) {
            if (!isEmailExists(valueEmail)) {
                let id = uuid.v4();
                let imageUrl = 'https://source.unsplash.com/random';
                let objUser = {
                    id: id,
                    firstName: valueFirstName,
                    lastName: valueLastName,
                    image: imageUrl,
                    email: valueEmail,
                    password: valueComfirmPass,
                };
                console.log(objUser);
                let url_api = `http://${Url.IP_WF}:${Url.PORT}/users`;
                fetch(url_api, {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(objUser),
                })
                    .then((response) => {
                        if (response.status == 201) {
                            if (response.ok) {
                                Alert.alert(
                                    'Đăng ký tài khoản thành công!!',
                                    '',
                                    [
                                        {
                                            text: 'OK',
                                            onPress: () => {
                                                navigation.goBack();
                                            }
                                        }
                                    ]
                                );
                            } else {
                                console.error('Error updating password');
                            }
                        }
                    })
                    .catch((error) => { console.log(error); })
            }
            else {
                Alert.alert("Email đã tồn tại, vui lòng nhập email khác");
            }
        }
        else {
            Alert.alert("Đăng ký tài khoản thất bại, vui lòng nhập đầy đủ thông tin");
        }


    };
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}>
            <ScrollView>
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
                        secureTextEntry={getPassVisible ? false : true}>
                        Password
                    </InputText>
                    <View style={{ alignItems: 'flex-end', marginTop: -40 }}>
                        {getPassVisible ?
                            <TouchableOpacity onPress={() => { setPassVisible(!getPassVisible) }}>
                                <Icon name="eye-off-outline" color={Color.ui_black_10} size={30} />
                            </TouchableOpacity>
                            :
                            <TouchableOpacity onPress={() => { setPassVisible(!getPassVisible) }}>
                                <Icon name="eye-outline" color={Color.ui_black_10} size={30} />
                            </TouchableOpacity>
                        }
                    </View>




                    <InputText
                        handleInputChange={handleInputComfirmPassChange}
                        value={valueComfirmPass}
                        secureTextEntry={getPassVisible1 ? false : true}>
                        Comfirm Password
                    </InputText>
                    <View style={{ alignItems: 'flex-end', marginTop: -40 }}>
                        {getPassVisible1 ?
                            <TouchableOpacity onPress={() => { setPassVisible1(!getPassVisible1) }}>
                                <Icon name="eye-off-outline" color={Color.ui_black_10} size={30} />
                            </TouchableOpacity>
                            :
                            <TouchableOpacity onPress={() => { setPassVisible1(!getPassVisible1) }}>
                                <Icon name="eye-outline" color={Color.ui_black_10} size={30} />
                            </TouchableOpacity>
                        }
                    </View>

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
