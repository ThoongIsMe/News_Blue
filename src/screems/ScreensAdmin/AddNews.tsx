import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Container from '../../components/Container';
import Color from '../../constants/Colors';
import Icon from 'react-native-vector-icons/Ionicons';
import InputText from '../../components/InputText';
import { useState } from 'react';
import PrimaryButton from '../../components/PrimaryButton';
import { Dropdown } from "react-native-element-dropdown";
import { ScrollView } from 'react-native-gesture-handler';



// Trong ScreemsUser/User.tsx
function AddNews({ navigation }: any) {
    const [valueTheLoai, setTextTheLoai] = useState('');
    const [valueTieuDe, setTextTieuDe] = useState('');
    const [valueTacGia, setTextTacGia] = useState('');

    const [valueImg, setTextImg] = useState('');
    const [valueUrl, setTextUrl] = useState('');
    const [valueMoTa, setTextMoTa] = useState('');
    const [valueNoiDung, setTextNoiDung] = useState('');


    const handleInputTheLoai = (Title: string) => {
        setTextTheLoai(Title);
    };
    const handleInputTieuDe = (Content: string) => {
        setTextTieuDe(Content);
    };

    const handleInputTacGia = (Content: string) => {
        setTextTacGia(Content);
    };
    const handleInputImg = (Content: string) => {
        setTextImg(Content);
    };
    const handleInputUrl = (Content: string) => {
        setTextUrl(Content);
    };
    const handleInputMotTa = (Content: string) => {
        setTextMoTa(Content);
    };
    const handleInputNoiDung = (Content: string) => {
        setTextNoiDung(Content);
    };

    const handlePress = () => {

    }
    return (
        <ScrollView>
            <Container>

                <View style={styles.ViewText}>
                    <TouchableOpacity style={styles.backIcon} onPress={() => navigation.goBack()}>
                        <Icon name="chevron-back" color={Color.ui_blue_10} size={30} />
                    </TouchableOpacity>
                    <Text style={styles.Text}>Thêm chủ đề mới</Text>
                    <View style={styles.ViewText}>
                        <Text style={styles.text}>Thông tin</Text>
                    </View>
                </View>

                <View>
                    <Text style={{
                        color: Color.ui_grey_20,
                        fontWeight: "bold",
                        fontSize: 16,
                        paddingVertical: 20,
                    }}>Thể Loại</Text>
                    {/* <Dropdown

        data={data}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? "Example: Kg - Lb" : "..."}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
            setValue(item.value);
            setIsFocus(false);
        }}
    /> */}
                </View>

                <InputText
                    handleInputChange={handleInputTieuDe}
                    value={valueTieuDe}
                    placeholderText="">
                    Tiêu đề
                </InputText>

                <InputText
                    handleInputChange={handleInputTacGia}
                    value={valueTacGia}
                    placeholderText="">
                    Tác giả
                </InputText>

                <InputText
                    handleInputChange={handleInputUrl}
                    value={valueUrl}
                    placeholderText="">
                    Url bài báo
                </InputText>

                <View style={{ flexDirection: 'row' }}>
                    <Text style={{
                        color: Color.ui_grey_20,
                        fontWeight: "bold",
                        fontSize: 16,
                        paddingVertical: 20,
                    }}>Hình ảnh</Text>
                    <TouchableOpacity style={{ marginVertical: 17, marginLeft: 10, backgroundColor: Color.ui_grey_20, padding: 3, borderRadius: 7, }}>
                        <Text>Chọn hình</Text>
                    </TouchableOpacity>
                </View>
                <InputText
                    handleInputChange={handleInputMotTa}
                    value={valueMoTa}
                    placeholderText="">
                    Mô tả
                </InputText>


                <InputText
                    handleInputChange={handleInputNoiDung}
                    value={valueNoiDung}
                    placeholderText="">
                    Nội dung
                </InputText>


                <View style={styles.btnSubmit}>
                    <PrimaryButton onPress={handlePress} color={Color.ui_blue_10} height={50} width={200} borderRadius={20}>
                        Đăng bài
                    </PrimaryButton>
                </View>

            </Container>
        </ScrollView>
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

export default AddNews;


