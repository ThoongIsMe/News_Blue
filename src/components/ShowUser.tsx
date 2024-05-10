import * as React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Color from '../constants/Colors'


interface BtnSettingProps {
    onPress: () => void;
    imageSource: any;
    namebtn: string;
}

const ShowUser: React.FC<BtnSettingProps> = ({ onPress, imageSource, namebtn }) => {

    return (
        <TouchableOpacity onPress={onPress} style={{
            flexDirection: 'row', justifyContent: 'space-between', backgroundColor: Color.ui_grey_10,
            borderRadius: 7, padding: 5
        }}>
            <View style={{ flexDirection: 'row' }}>
                <Image
                    source={{ uri: imageSource }}
                    style={{ width: 60, height: 60, borderRadius: 28, marginRight: 10 }}
                />
                <Text style={{ padding: 5, color: Color.ui_black_10, fontSize: 18, fontWeight: "500", textAlign: 'center', textAlignVertical: 'center' }}>{namebtn}</Text>
            </View>
            <Icon name="chevron-forward" color={Color.ui_black_10} size={26} style={{ alignSelf: 'center', justifyContent: 'flex-end' }} />
        </TouchableOpacity>
    );
}
export default ShowUser;