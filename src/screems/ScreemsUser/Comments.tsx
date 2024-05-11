import * as React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Container from '../../components/Container';
import Color from '../../constants/Colors';
import Icon from 'react-native-vector-icons/Ionicons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Cmt from '../../components/Cmt';
import { useSelector } from 'react-redux';
import { getCommentsFromApiAsync } from '../../helper/api';



// Trong ScreemsUser/User.tsx
function PasswordChange() {
    const navigation = useNavigation();
    const info = useSelector((state: any) => state.personalInfo);

    const [comments, setComments] = React.useState('');

    const [valueCmts, setTextCmts] = React.useState('');
    const handleInputCmt = (pass: string) => {
        setTextCmts(pass);
    };

    useFocusEffect(
        React.useCallback(() => {
            const fetchData1 = async () => {
                try {
                    const cmt = await getCommentsFromApiAsync();
                    setComments(cmt);
                } catch (error) {
                    console.error("Error fetching articles:", error);
                }
            };
            fetchData1();
        }, [])
    );

    return (
        <Container>
            <View style={styles.ViewText}>
                <TouchableOpacity style={styles.backIcon} onPress={() => navigation.goBack()}>
                    <Icon name="chevron-back" color={Color.ui_blue_10} size={30} />
                </TouchableOpacity>
                <Text style={styles.Text}>Đánh giá</Text>
            </View>

            <Cmt img={info.image} textName={info.firstName + ' ' + info.lastName} textCmt={'111'} textDay={'111'} />

            <View style={{
                justifyContent: 'flex-end', flex: 1
            }}>
                <View style={{ flexDirection: 'row', }}>
                    <TouchableOpacity style={{ paddingTop: 5, paddingRight: 10 }}>
                        <Icon name="camera-outline" color={Color.ui_blue_10} size={30} />
                    </TouchableOpacity>
                    <TextInput
                        style={[styles.textInput, valueCmts != '' ? styles.inputWmin : styles.inputWmax]}
                        onChangeText={handleInputCmt}
                        value={valueCmts}
                        placeholder="Viết đánh giá mới ..."
                    />

                    {valueCmts != '' && <TouchableOpacity style={{ paddingTop: 6, paddingLeft: 10 }}>
                        <Icon name="send" color={Color.ui_blue_10} size={27} />
                    </TouchableOpacity>}
                </View>

            </View>
        </Container>
    );
}
const styles = StyleSheet.create({
    ViewText: {
        justifyContent: 'center',
        alignItems: 'center',

    },
    inputWmin: {
        width: 280,
    },
    inputWmax: {
        width: 310,
    },
    textInput: {
        height: 45,
        borderColor: Color.ui_grey_20,
        borderWidth: 1,
        borderRadius: 20,
        fontSize: 16,


    },
    Text: {
        color: Color.ui_blue_10,
        fontWeight: "bold",
        fontSize: 20,
        marginTop: -28,
    },
    backIcon: {
        marginRight: 'auto',
        marginLeft: -10,
        marginTop: -5,
    },
})
export default PasswordChange;