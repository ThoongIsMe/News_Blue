import * as React from 'react';
import { Alert, Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Container from '../../components/Container';
import Color from '../../constants/Colors';
import Icon from 'react-native-vector-icons/Ionicons';
import PrimaryButton from '../../components/PrimaryButton';
import InputText from '../../components/InputText';
import Url from '../../constants/Url';





// Trong ScreemsUser/User.tsx
function DeleteAccount({ navigation, route }: any) {
    const { u } = route.params;
    if (!u) {
        return <Text>Loading...</Text>;
    }
    console.log(u);
    const handlePress = (userID: string) => {
        let url_api = `http://${Url.IP_WF}:${Url.PORT}/users`;
        console.log(userID);

        // Display confirmation dialog
        Alert.alert(
            'Xác nhận',
            'Bạn có chắc chắn muốn xóa tài khoản này không?',
            [
                {
                    text: 'Hủy',
                    style: 'cancel',
                },
                {
                    text: 'OK',
                    onPress: () => {
                        fetch(url_api)
                            .then((response) => response.json())
                            .then(() => {
                                const existingArticle = u;

                                if (existingArticle) {
                                    let deleteUrl = `${url_api}/${existingArticle.id}`;
                                    fetch(deleteUrl, {
                                        method: 'DELETE',
                                    })
                                        .then(() => {
                                            console.log("Xóa tài khoản thành công");
                                            navigation.goBack();
                                        })
                                        .catch((error) => {
                                            console.error("Lỗi khi xóa tài khoản:", error);
                                        });
                                } else {
                                    console.log("Không tìm thấy tài khoản cần xóa");
                                }
                            })
                            .catch((error) => {
                                console.error("Lỗi khi lấy dữ liệu tài khoản:", error);
                            });
                    },
                },
            ]
        );
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
                    <View style={styles.img}>
                        <Image
                            source={{ uri: u.image }}
                            style={styles.imgOver}
                        />
                    </View>

                    <InputText
                        value={u.firstName}>
                        Tên
                    </InputText>

                    <InputText
                        value={u.lastName}>
                        Họ
                    </InputText>

                    <InputText
                        value={u.email}>
                        Email
                    </InputText>

                    <InputText
                        value={u.role}>
                        Email
                    </InputText>

                    <View style={styles.btnSubmit}>
                        <PrimaryButton onPress={() => handlePress(u.id)} color={Color.ui_red_10} height={50} width={160} borderRadius={20}>
                            Xóa
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
export default DeleteAccount;



