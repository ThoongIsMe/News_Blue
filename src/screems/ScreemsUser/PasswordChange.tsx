import * as React from 'react';
import { Alert, Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Container from '../../components/Container';
import Color from '../../constants/Colors';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import InputText from '../../components/InputText';
import PrimaryButton from '../../components/PrimaryButton';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { store } from '../../redux/store';
import { updatePassUser } from '../../redux/actions/updateAction';
import Url from '../../constants/Url';
// chuyển useDispatch -> useAppDispatch type store
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

// Trong ScreemsUser/User.tsx
function PasswordChange() {
    const navigation = useNavigation();
    const [getPassVisible, setPassVisible] = useState(false);
    const [getNewPassVisible, setNewPassVisible] = useState(false);
    const [getPassVisible1, setPassVisible1] = useState(false);

    const info = useSelector((state: any) => state.personalInfo);
    const dispatch = useAppDispatch();


    const [valuePass, setTextPass] = useState('');
    const handleInputPassChange = (pass: string) => {
        setTextPass(pass);
    };

    const [valueNewPass, setTextNewPass] = useState('');
    const handleInputNewPassChange = (pass: string) => {
        setTextNewPass(pass);
    };

    const [valueComfirmPass, setTextComfirmPass] = useState('');
    const handleInputComfirmPassChange = (pass: string) => {
        setTextComfirmPass(pass);
    };


    const handlePress = async () => {
        if (info.password === valuePass && valueNewPass === valueComfirmPass) {
            const apiUrl = `http://${Url.IP_WF}:${Url.PORT}/users/${info.id}`; // Assuming you have the userId

            try {
                const response = await fetch(apiUrl, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ password: valueNewPass }),
                });

                if (response.ok) {
                    Alert.alert(
                        'Đổi mật khẩu thành công!!',
                        '',
                        [
                            {
                                text: 'OK',
                                onPress: () => {
                                    navigation.goBack();
                                    console.log('Password updated', info);
                                }
                            }
                        ]
                    );
                    dispatch(updatePassUser(valueNewPass));
                } else {
                    console.error('Error updating password');
                }
            } catch (error) {
                console.error('Network error:', error);
            }
        } else {
            Alert.alert('Vui lòng kiểm trả lại thông tin cho hợp lệ!');
        }
    };

    return (
        <Container>
            <View style={styles.ViewText}>
                <TouchableOpacity style={styles.backIcon} onPress={() => navigation.goBack()}>
                    <Icon name="chevron-back" color={Color.ui_blue_10} size={30} />
                </TouchableOpacity>
                <Text style={styles.Text}>Thay đổi mật khẩu</Text>
            </View>

            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : undefined}
                keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}>
                <ScrollView>
                    <View style={styles.img}>
                        <Image
                            source={require('../../assets/images/logoNews.jpg')}
                            style={styles.imgOver}
                        />
                    </View>


                    <InputText
                        handleInputChange={handleInputPassChange}
                        value={valuePass}
                        secureTextEntry={getPassVisible ? false : true}>
                        Mật khẩu
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
                        handleInputChange={handleInputNewPassChange}
                        value={valueNewPass}
                        secureTextEntry={getNewPassVisible ? false : true}>
                        Mật khẩu mới
                    </InputText>
                    <View style={{ alignItems: 'flex-end', marginTop: -40 }}>
                        {getNewPassVisible ?
                            <TouchableOpacity onPress={() => { setNewPassVisible(!getNewPassVisible) }}>
                                <Icon name="eye-off-outline" color={Color.ui_black_10} size={30} />
                            </TouchableOpacity>
                            :
                            <TouchableOpacity onPress={() => { setNewPassVisible(!getNewPassVisible) }}>
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
                            Đổi mật khẩu
                        </PrimaryButton>
                    </View>


                </ScrollView>
            </KeyboardAvoidingView>
        </Container>
    );
}
const styles = StyleSheet.create({
    ViewText: {
        justifyContent: 'center',
        alignItems: 'center',

    },
    Text: {
        color: Color.ui_blue_10,
        fontWeight: "bold",
        fontSize: 20,
        marginTop: -28,
    },
    backIcon: {
        marginRight: 'auto',
        marginLeft: -10,
        marginTop: -5,
    }, container: {
        flex: 1,
    },
    img: {
        marginTop: 40,
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imgOver: {
        width: 160,
        height: 160,
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
})
export default PasswordChange;