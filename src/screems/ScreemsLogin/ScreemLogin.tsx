/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Alert, Button, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Color from '../../constants/Colors'
import InputText from '../../components/InputText';
import PrimaryButton from '../../components/PrimaryButton';
import Container from '../../components/Container';
import Icon from 'react-native-vector-icons/Ionicons';
import { getUserFromApiAsync } from '../../helper/api';
import { useDispatch, useSelector } from 'react-redux';
import { updateTTUser } from '../../redux/actions/updateAction';
import { store } from '../../redux/store';

// chuyển useDispatch -> useAppDispatch type store
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();



function ScreemLogin({ navigation }: any): React.ReactElement {
    const [getPassVisible, setPassVisible] = useState(false);
    const [valueEmail, setTextEmail] = useState('');
    const [valuePass, setTextPass] = useState('');
    const [user, setUser] = useState<Users[]>([]);

    const info = useSelector((state: any) => state.personalInfo);
    const dispatch = useAppDispatch();
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
        console.log("Info", info);
        fetchData();

    }, [info]);



    const handleInputEmailChange = (email: string) => {
        setTextEmail(email);
    };

    const handleInputPassChange = (pass: string) => {
        setTextPass(pass);
    };

    const handlePressLogin = () => {
        // navigation.navigate('Main');
        const foundUser = user.find(u => u.email === valueEmail && u.password === valuePass);
        if (foundUser) {
            console.log(foundUser.firstName, foundUser.lastName);
            dispatch(updateTTUser(foundUser.id, foundUser.firstName, foundUser.lastName, foundUser.image, foundUser.email, foundUser.password, foundUser.role));
            navigation.navigate('Main');
            setTextPass("");
            setTextEmail("");
        } else {
            Alert.alert('Invalid email or password');
        }
    }

    const handlePressForgot = () => {
        navigation.navigate('ForgotPass');
    }

    const handlePressRegister = () => {
        navigation.navigate('Register');
    }




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
                secureTextEntry={getPassVisible ? false : true}
                placeholderText="password">
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

            <TouchableOpacity style={styles.btnForgot} onPress={handlePressForgot}>
                <Text style={styles.textForgot}>Forgot password</Text>
            </TouchableOpacity>

            <View style={styles.btnSubmit}>
                <PrimaryButton onPress={handlePressLogin} color={Color.ui_blue_10} height={50} width={200} borderRadius={20}>
                    Submit
                </PrimaryButton>
            </View>

            <View style={styles.btnRegister}>
                <Text>Don't have an account? </Text>
                <TouchableOpacity onPress={handlePressRegister}>
                    <Text style={styles.textForgot}>Register</Text>
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
