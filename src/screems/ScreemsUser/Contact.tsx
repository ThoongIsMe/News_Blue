import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Container from '../../components/Container';
import Color from '../../constants/Colors';
import Icon from 'react-native-vector-icons/Ionicons';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

// Trong ScreemsUser/User.tsx
function Contact() {
    const navigation = useNavigation();
    return (
        <Container>
            <View >
                <TouchableOpacity style={styles.backIcon} onPress={() => navigation.goBack()}>
                    <Icon name="chevron-back" color={Color.ui_blue_10} size={30} />
                </TouchableOpacity>
                <View style={styles.ViewText}>
                    <Text style={styles.Text}>LIÊN HỆ</Text>
                </View>
                <ScrollView>
                    <Text style={styles.content}>Công ty Cổ phần Công nghệ EPI Chịu trách nhiệm: NEWSDT</Text>
                    <Text style={styles.content}>Giấy phép số: 1818/GP-TTĐT do Sở Thông tin và Truyền thông Hà Nội cấp ngày 05/05/2017
                    </Text>
                    <Text style={styles.content}>Địa chỉ: Tầng 5, Tòa nhà Báo Sinh Viên VN, D29 Phạm Văn Bạch, Yên Hòa, Cầu Giấy, Hà Nội</Text>
                    <Text style={styles.content}>Số điện thoại: (024) 3-212-3232 (số máy lẻ: 6666)</Text>
                    <Text style={styles.content}>Email: DTsupport@newsdt.com.
                    </Text>



                </ScrollView>
            </View>
        </Container>
    );
}
const styles = StyleSheet.create({
    content: {
        color: Color.ui_black_10,
        textAlign: 'justify',
        marginHorizontal: 4,
        fontSize: 14,
        paddingVertical: 5,
    },
    ViewText: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    Text: {
        color: Color.ui_blue_10,
        fontWeight: "bold",
        fontSize: 20,
        padding: 10,
    },
    backIcon: {
        marginRight: 'auto',
        marginLeft: -10,
        marginTop: -10,
    },
})
export default Contact;