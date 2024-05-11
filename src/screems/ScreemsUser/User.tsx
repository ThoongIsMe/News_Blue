import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SettingAvt from '../../components/SettingAvt';
import Container from '../../components/Container';
import { useSelector } from 'react-redux';

import Color from '../../constants/Colors';
import BtnSetting from '../../components/BtnSetting';
import { useNavigation } from '@react-navigation/native';
// Trong ScreemsUser/User.tsx

function UserScreen(): React.JSX.Element {

    const navi = useNavigation();
    const info = useSelector((state: any) => state.personalInfo);

    const handleDangXuat = () => {
        navi.navigate('Login');
    };
    const handleProfile = () => {
        navi.navigate('Profile');
    };
    const handleSecurity = () => {
        navi.navigate('Security');
    };
    const handlePasswordChange = () => {
        navi.navigate('PasswordChange');
    };

    const handleContact = () => {
        navi.navigate('Contact');
    };


    const handleManagerNews = () => {
        navi.navigate('ManagerNews');
    };

    const handleAddCategories = () => {
        navi.navigate('AddCategories');
    };


    const handleManagerAccounts = () => {
        navi.navigate('ManagerAccounts');
    };

    const handleAddNews = () => {
        navi.navigate('AddNews');
    };

    return (
        <Container>
            <View>
                <View style={styles.ViewText}>
                    <Text style={styles.Text}>Cài đặt</Text>
                </View>
                <SettingAvt onPress={handleDangXuat} img={info.image} textName={info.firstName + ' ' + info.lastName} textEmail={info.email} />
            </View>

            <View style={{ paddingVertical: 20 }}>
                <Text style={styles.title}>Tài khoản</Text>
                <BtnSetting onPress={handleProfile} icon={'person-circle-outline'} namebtn={'Thông tin cá nhân'} />
                <BtnSetting onPress={handlePasswordChange} icon={'shield-checkmark-outline'} namebtn={'Thay đổi mật khẩu'} />
            </View>

            {info.role === "user" && <View style={{ paddingVertical: 20 }}>
                <Text style={styles.title}>Chính sách pháp lý</Text>
                <BtnSetting onPress={handleSecurity} icon={'server-outline'} namebtn={'Chính sách bảo mật'} />
                <BtnSetting onPress={handleContact} icon={'call-outline'} namebtn={'Liên hệ'} />
            </View>}


            {info.role === "admin" && (
                <>
                    <View style={{ paddingVertical: 20 }}>
                        <Text style={styles.title}>Quản lý chung</Text>
                        <BtnSetting onPress={handleManagerNews} icon={'newspaper-outline'} namebtn={'Bài báo'} />
                        <BtnSetting onPress={handleManagerAccounts} icon={'shield-outline'} namebtn={'Tài khoản'} />
                    </View>

                    <View style={{ paddingVertical: 20 }}>
                        <Text style={styles.title}>Thêm báo mới</Text>
                        <BtnSetting onPress={handleAddNews} icon={'add-circle-outline'} namebtn={'Thêm chủ đề mới'} />
                        <BtnSetting onPress={handleAddCategories} icon={'add-circle-outline'} namebtn={'Thêm bài báo mới'} />
                    </View>
                </>
            )}


        </Container>
    );
}
const styles = StyleSheet.create({
    ViewText: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
    },
    Text: {
        color: Color.ui_blue_10,
        fontWeight: 'bold',
        fontSize: 20,
    },
    title: {
        color: Color.ui_black_10,
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 7,
    },


});
export default UserScreen;
