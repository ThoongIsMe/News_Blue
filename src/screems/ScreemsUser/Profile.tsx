import * as React from 'react';
import { Alert, Image, KeyboardAvoidingView, PermissionsAndroid, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Container from '../../components/Container';
import Color from '../../constants/Colors';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import PrimaryButton from '../../components/PrimaryButton';
import InputText from '../../components/InputText';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Url from '../../constants/Url';
import { updateImgUser } from '../../redux/actions/updateAction';
import { store } from '../../redux/store';



export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
// Trong ScreemsUser/User.tsx
function Profile() {
    const navigation = useNavigation();
    const [getPassVisible, setPassVisible] = useState(false);
    const info = useSelector((state: any) => state.personalInfo);
    const [showOptions, setShowOptions] = useState(false);
    const [valueimg, setTextImg] = useState(info.image);
    // const handleInputimgChange = (img: string) => {
    //     setTextImg(img);
    // };
    const dispatch = useAppDispatch();

    const toggleOptions = () => {
        setShowOptions(!showOptions);
    };
    const closeOptions = () => {
        setShowOptions(false);
    };

    const [valuePass, setTextPass] = useState('');
    const handleInputPassChange = (pass: string) => {
        setTextPass(pass);
    };

    const [valueFirstName, setTextFirstName] = useState(info.firstName || '');
    const handleInputFirstNameChange = (name: string) => {
        setTextFirstName(name);
    };

    const [valueLastName, setTextLastName] = useState(info.lastName || '');
    const handleInputLastNameChange = (name: string) => {
        setTextLastName(name);
    };


    const handlePress = async () => {
        if (valuePass === info.password && valueFirstName !== '' && valueLastName !== '') {
            const apiUrl = `http://${Url.IP_WF}:${Url.PORT}/users/${info.id}`; // Assuming you have the userId

            try {
                const response = await fetch(apiUrl, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ firstName: valueFirstName, lastName: valueLastName, image: valueimg }),
                });

                if (response.ok) {
                    Alert.alert(
                        'Đổi thông tin thành công!!',
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
                    dispatch(updateImgUser(valueFirstName, valueLastName, valueimg));
                } else {
                    console.error('Error updating password');
                }
            } catch (error) {
                console.error('Network error:', error);
            }
        }
        else if (valueFirstName === '' || valueLastName === '')
            {
                Alert.alert('Họ hoặc tên không được rỗng!');
            }
        else if (valuePass !== info.password)
            {
                Alert.alert('Sai mật khẩu!');
            }
         else {
            Alert.alert('Vui lòng kiểm trả lại thông tin cho hợp lệ!');
        }
    };



    const requestImageCameraPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("Camera permission given");
                const result: any = await launchCamera({ mediaType: 'photo', cameraType: 'front' })
                console.log(result.assets[0].uri);
                setTextImg(result.assets[0].uri);
                setShowOptions(false);
            } else {
                console.log("Camera permission denied");
            }
        } catch (err) {
            console.warn(err);
        }
    };


    const requestImageLibraryPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("Camera permission given");
                // const result: any = await launchCamera({ mediaType: 'photo', cameraType: 'front' })
                const result: any = await launchImageLibrary({ mediaType: 'photo' })
                console.log(result.assets[0].uri);
                setTextImg(result.assets[0].uri);
                setShowOptions(false);
            } else {
                console.log("Camera permission denied");
            }
        } catch (err) {
            console.warn(err);
        }
    };


    return (
        <Container>

            <View style={styles.ViewText}>
                <TouchableOpacity style={styles.backIcon} onPress={() => navigation.goBack()}>
                    <Icon name="chevron-back" color={Color.ui_blue_10} size={30} />
                </TouchableOpacity>
                <Text style={styles.Text}>Thông tin cá nhân</Text>
            </View>
            <KeyboardAvoidingView

                behavior={Platform.OS === "ios" ? "padding" : undefined}
                keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}>
                <ScrollView>
                    <TouchableOpacity style={styles.img} onPress={toggleOptions}>
                        <Image
                            source={{ uri: valueimg }}
                            style={styles.imgOver}
                        />
                        <Icon style={{ marginLeft: 100, marginTop: -40, backgroundColor: Color.ui_grey_10, padding: 7, borderRadius: 30 }} name='camera-outline' color={Color.ui_blue_10} size={30} />
                        <Text style={styles.imgText}>Thay đổi hình</Text>
                    </TouchableOpacity>

                    <InputText
                        handleInputChange={handleInputFirstNameChange}
                        value={valueFirstName}>
                        Tên
                    </InputText>

                    <InputText
                        handleInputChange={handleInputLastNameChange}
                        value={valueLastName}>
                        Họ
                    </InputText>


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



                    <View style={styles.btnSubmit}>
                        <PrimaryButton onPress={handlePress} color={Color.ui_blue_10} height={50} width={200} borderRadius={20}>
                            Đổi thông tin
                        </PrimaryButton>
                    </View>


                </ScrollView>
            </KeyboardAvoidingView>
            {showOptions && (
                <TouchableOpacity style={styles.overlay} onPress={closeOptions} />
            )}
            {showOptions && (
                <>
                    <View style={styles.container}>
                        <Text style={{
                            color: Color.ui_blue_10,
                            fontWeight: "bold",
                            fontSize: 24,
                            padding: 10,
                        }}>Profile Photo</Text>
                        <View style={styles.photoOptions}>
                            <TouchableOpacity style={styles.optionButton} onPress={requestImageCameraPermission}>
                                <Icon name="camera-outline" color={Color.ui_blue_10} size={24} />
                                <Text style={styles.optionText}>Camera</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.optionButton} onPress={requestImageLibraryPermission}>
                                <Icon name="image-outline" color={Color.ui_blue_10} size={24} />
                                <Text style={styles.optionText}>Gallery</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </>
            )}

        </Container>
    );
}
const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Màu nền tối
    },
    container: {
        marginHorizontal: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Color.ui_grey_10,
        borderRadius: 16,
        marginTop: -400,
    },
    photoOptions: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
        alignSelf: 'center', // Thêm dòng này để căn giữa theo chiều ngang
    },
    optionButton: {
        flexDirection: 'column',
        alignItems: 'center',
        paddingHorizontal: 25,
        paddingVertical: 10,
        backgroundColor: '#ebebeb',
        borderRadius: 20,
        borderColor: Color.ui_blue_10,
        borderWidth: 1,
        margin: 10,
    },
    optionText: {
        marginLeft: 5,
        fontSize: 16,
        color: Color.ui_blue_10,
    },
    removeButton: {
        marginLeft: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: 'lightgray',
        borderRadius: 5,
    },


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
    imgText: {
        color: Color.ui_blue_10,
        fontWeight: "bold",
        fontSize: 17,
        padding: 10,
    },
    backIcon: {
        marginRight: 'auto',
        marginLeft: -10,
        marginTop: -5,
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
        borderRadius: 80,
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
export default Profile;



