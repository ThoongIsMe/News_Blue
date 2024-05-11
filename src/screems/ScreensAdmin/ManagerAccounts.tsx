import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import SearchText from '../../components/SearchText';
import { useEffect, useState } from 'react';
import Container from '../../components/Container';
import Color from '../../constants/Colors';
import { getUserFromApiAsync } from '../../helper/api';

import Icon from 'react-native-vector-icons/Ionicons';
import ShowUser from '../../components/ShowUser';
import { useFocusEffect } from '@react-navigation/native';


interface Users {
    id: string;
    lastName: string;
    firstName: string;
    image: string;
    email: string;
    password: string;
    role: string;

}
function ManagerAccounts({ navigation }: any) {

    const [user, setUser] = useState<Users[]>([]);
    const [valueSearch, setValueSearch] = useState('');

    const handleInputSearch = (valueSearch: string) => {
        setValueSearch(valueSearch);
    };

    const fetchData = async () => {
        try {
            const userData = await getUserFromApiAsync();
            setUser(userData);
        } catch (error) {
            console.error("Error fetching user:", error);
        }
    };
    // useEffect(() => {
    //     fetchData();
    // }, []);

    useFocusEffect(
        React.useCallback(() => {
            fetchData();
        }, [])
    );



    useEffect(() => {
        const fetchData1 = async () => {
            try {
                let filteredArticles = [];
                const userData = await getUserFromApiAsync();
                filteredArticles = userData.filter((user: { firstName: string; lastName: string }) => user.firstName.toLowerCase().includes(valueSearch.toLowerCase())
                    || user.lastName.toLowerCase().includes(valueSearch.toLowerCase()));
                setUser(filteredArticles);
            } catch (error) {
                console.error("Error fetching articles:", error);
            }
        };

        fetchData1();
    }, [valueSearch]);

    const handleManagerAccount = (u: Users) => {
        console.log("a" + u.id);
        navigation.navigate("DeleteAccount", { u });
    }

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

                {user.map((u, index) => (
                    <ShowUser
                        key={index}
                        onPress={() => handleManagerAccount(u)}
                        namebtn={`${u.firstName} ${u.lastName}`}
                        imageSource={u.image}
                        user={u} />
                ))}

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
