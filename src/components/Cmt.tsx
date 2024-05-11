import * as React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Color from '../constants/Colors'
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';

// Trong ScreemsUser/User.tsx



interface CmtProps {
    img: string;
    textName: string;
    textCmt: string;
    textDay: string;
}

const Cmt: React.FC<CmtProps> = ({ img, textName, textCmt, textDay }) => {
    const info = useSelector((state: any) => state.personalInfo);

    return (
        <View style={styles.item}>
            {img != '' ? <Image
                source={{ uri: img }}
                style={{ width: 40, height: 40, borderRadius: 20, marginRight: 10 }}
            /> : ''}

            <View>
                <Text style={styles.textName}>{textName}</Text>
                <Text style={styles.textCmt} >{textCmt}</Text>
                <Text style={styles.textTime}>{textDay}</Text>
            </View>

            {info.role === 'admin' && <TouchableOpacity>
                <Icon name="trash" color={Color.ui_blue_10} size={20} />
            </TouchableOpacity>}
        </View>
    );
}
const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        backgroundColor: Color.ui_grey_10,
        borderRadius: 12,
        padding: 5,
        marginTop: 10,
    },
    textCmt: {
        paddingTop: 10,
        textAlign: 'justify',
        width: 280,
    },
    textTime: {
        textAlign: 'right',
        color: Color.ui_grey_20,
        fontWeight: 'bold',
        paddingTop: 5,
    },
    textName: {
        color: Color.ui_black_10,
        fontWeight: 'bold',
        fontSize: 17,
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
export default Cmt;