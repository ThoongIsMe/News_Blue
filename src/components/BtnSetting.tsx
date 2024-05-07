import * as React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Color from '../constants/Colors'


interface BtnSettingProps {
    onPress: () => void;
    icon: string;
    namebtn: string;
}

const BtnSetting: React.FC<BtnSettingProps> = ({ onPress, icon, namebtn }) => {

    return (
        <TouchableOpacity onPress={onPress} style={{
            flexDirection: 'row', justifyContent: 'space-between', backgroundColor: Color.ui_grey_10,
            borderRadius: 7, padding: 5
        }}>
            <View style={{ flexDirection: 'row' }}>
                <Icon name={icon} color={Color.ui_black_10} size={30} />
                <Text style={{ padding: 5, color: Color.ui_black_10, fontSize: 16, fontWeight: "500", }}>{namebtn}</Text>
            </View>
            <Icon name="chevron-forward" color={Color.ui_black_10} size={26} />
        </TouchableOpacity>
    );
}
export default BtnSetting;