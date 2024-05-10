import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Container from '../../components/Container';
import Color from '../../constants/Colors';
import Icon from 'react-native-vector-icons/Ionicons';
import InputText from '../../components/InputText';
import { useState } from 'react';
import PrimaryButton from '../../components/PrimaryButton';



// Trong ScreemsUser/User.tsx
function AddCategories({ navigation }: any) {
    const [valueTitle, setTextTitle] = useState('');
    const [valueContent, setTextContent] = useState('');

    const handleInputTitle = (Title: string) => {
        setTextTitle(Title);
    };
    const handleInputContent = (Content: string) => {
        setTextContent(Content);
    };

    const handlePress = () => {

    }
    return (
        <Container>
            {/* <TextInput
                style={{ borderWidth: 1, borderColor: Color.ui_blue_10 }}
                multiline={true}
                numberOfLines={2} /> */}
            <View style={styles.ViewText}>
                <TouchableOpacity style={styles.backIcon} onPress={() => navigation.goBack()}>
                    <Icon name="chevron-back" color={Color.ui_blue_10} size={30} />
                </TouchableOpacity>
                <Text style={styles.Text}>Thêm chủ đề mới</Text>
                <View style={styles.ViewText}>
                    <Text style={styles.text}>Thông tin</Text>
                </View>
            </View>

            <InputText
                handleInputChange={handleInputTitle}
                value={valueTitle}
                placeholderText="">
                Chủ đề
            </InputText>

            <InputText
                handleInputChange={handleInputContent}
                value={valueContent}
                placeholderText="">
                Mô tả
            </InputText>
            <View style={styles.btnSubmit}>
                <PrimaryButton onPress={handlePress} color={Color.ui_blue_10} height={50} width={200} borderRadius={20}>
                    Thêm chủ đề
                </PrimaryButton>
            </View>

        </Container>
    );
}

const styles = StyleSheet.create({
    item: {
        flexDirection: 'column',
    },
    btnSubmit: {
        marginTop: 65,
        justifyContent: 'center',
        alignItems: 'center',
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
    text: {
        color: Color.ui_black_10,
        fontWeight: "bold",
        fontSize: 20,
        marginTop: -10,
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

export default AddCategories;


