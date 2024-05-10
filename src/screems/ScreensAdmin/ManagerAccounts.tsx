import * as React from 'react';
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import SearchText from '../../components/SearchText';
import { useEffect, useState } from 'react';
import Container from '../../components/Container';
import Color from '../../constants/Colors';
import { getNewsFromApiAsync } from '../../helper/api';
import Url from '../../constants/Url';
import CardNews from '../../components/CardNews';
import FormatTimeAgo from '../../constants/time';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import ShowUser from '../../components/ShowUser';
import { useSelector } from 'react-redux';




// Trong ScreemsUser/User.tsx
function ManagerAccounts({ navigation }: any) {
    const info = useSelector((state: any) => state.personalInfo);


    const [valueSearch, setValueSearch] = useState('');

    const handleInputSearch = (valueSearch: string) => {
        setValueSearch(valueSearch);
    };

    const handleManagerAccount = () => { console.log(1) }



    return (
        <Container>
            <View style={styles.ViewText}>
                <TouchableOpacity style={styles.backIcon} onPress={() => navigation.goBack()}>
                    <Icon name="chevron-back" color={Color.ui_blue_10} size={30} />
                </TouchableOpacity>
                <Text style={styles.Text}>Tài khoản</Text>
            </View>
            <View style={styles.item}>
                <SearchText handleInputChange={handleInputSearch}
                    value={valueSearch}
                    placeholderText="Tìm kiếm">
                </SearchText>
            </View>
            <View style={{ paddingVertical: 20 }}>
                <Text style={styles.title}>Quản lý chung</Text>
                <ShowUser onPress={handleManagerAccount} namebtn={info.firstName + ' ' + info.lastName} imageSource={info.image} />
            </View>
        </Container>
    );
}

const styles = StyleSheet.create({
    item: {
        flexDirection: 'column',
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
        paddingBottom: 20,
    },
    backIcon: {
        marginRight: 'auto',
        marginLeft: -10,
        marginTop: -10,
    }, title: {
        color: Color.ui_black_10,
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 7,
    },

});

export default ManagerAccounts;
