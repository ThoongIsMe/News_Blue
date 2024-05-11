import * as React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Color from '../constants/Colors'
// Trong ScreemsUser/User.tsx



interface SettingAvtProps {
    onPress: () => void;
    img: string;
    textName: string;
    textEmail: string;
}

const SettingAvt: React.FC<SettingAvtProps> = ({ onPress, img, textName, textEmail }) => {

    return (
        <View style={styles.item}>
            {img != '' ? <Image
                source={{ uri: img }}
                style={{ width: 100, height: 100, borderRadius: 50, marginRight: 10 }}
            /> : ''}

            <View>
                <Text style={styles.textName}>{textName}</Text>
                <Text style={styles.textEmail}>{textEmail}</Text>

                <TouchableOpacity onPress={onPress}>
                    <Text style={styles.btn}>Đăng xuất</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
}
const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        backgroundColor: Color.ui_grey_10,
        borderRadius: 12,
        padding: 5,
    },
    textName: {
        color: Color.ui_black_10,
        fontWeight: 'bold',
        fontSize: 22,
        paddingHorizontal: 10,
        marginTop: 10
    },
    textEmail: {
        color: Color.ui_black_10,
        fontSize: 15,
        paddingHorizontal: 10,
    },
    btn: {
        padding: 5,
        paddingLeft: 10,
        fontWeight: 'bold',
        color: Color.ui_blue_10,
    }

});
export default SettingAvt;