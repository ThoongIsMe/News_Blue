import * as React from 'react';
import { Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Container from '../../components/Container';
import Color from '../../constants/Colors';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import PrimaryButton from '../../components/PrimaryButton';
import InputText from '../../components/InputText';
import { useState } from 'react';
import { useSelector } from 'react-redux';
// Trong ScreemsUser/User.tsx
function Profile() {
    const navigation = useNavigation();
    const [getPassVisible, setPassVisible] = useState(false);
    const info = useSelector((state: any) => state.personalInfo);
    const [showOptions, setShowOptions] = useState(false);

    // const [valueimg, setTextImg] = useState('');
    // const handleInputimgChange = (img: string) => {
    //     setTextImg(img);
    // };

    const toggleOptions = () => {
        setShowOptions(!showOptions);
    };


    const [valuePass, setTextPass] = useState('');
    const handleInputPassChange = (pass: string) => {
        setTextPass(pass);
    };

    const [valueFirstName, setTextFirstName] = useState('');
    const handleInputFirstNameChange = (name: string) => {
        setTextFirstName(name);
    };

    const [valueLastName, setTextLastName] = useState('');
    const handleInputLastNameChange = (name: string) => {
        setTextLastName(name);
    };


    const handlePress = () => {
        console.log(1);
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
                            source={{ uri: info.image }}
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
                <>
                    <View style={styles.container}>
                        <Text style={{
                            color: Color.ui_white_10,
                            fontWeight: "bold",
                            fontSize: 20,
                        }}>Profile Photo</Text>
                        <View style={styles.photoOptions}>
                            <TouchableOpacity style={styles.optionButton}>
                                <Icon name="camera-outline" color="#0077b6" size={24} />
                                <Text style={styles.optionText}>Camera</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.optionButton}>
                                <Icon name="image-outline" color="#0077b6" size={24} />
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
        backgroundColor: Color.ui_blue_10,
        borderRadius: 16,
        marginTop: -380,
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
        backgroundColor: Color.ui_red_10,
    },
    optionText: {
        marginLeft: 5,
        fontSize: 16,
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