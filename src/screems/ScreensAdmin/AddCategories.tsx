import * as React from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Container from '../../components/Container';
import Color from '../../constants/Colors';
import Icon from 'react-native-vector-icons/Ionicons';
import InputText from '../../components/InputText';
import { useEffect, useState } from 'react';
import PrimaryButton from '../../components/PrimaryButton';
import { getCategoriesFromApiAsync } from '../../helper/api';
import uuid from 'react-native-uuid';
import Url from '../../constants/Url';

interface Category {
    id: string;
    name: string;
}
// Trong ScreemsUser/User.tsx
function AddCategories({ navigation }: any) {
    const [valueName, setTextName] = useState('');
    const [valueDescription, setTextDescription] = useState('');
    const [valueTheLoai, setTextTheLoai] = useState<Category[]>([{ id: '0', name: 'All' }]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const categoriesData = await getCategoriesFromApiAsync();
                setTextTheLoai([...categoriesData]);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);
    const handleInputTitle = (Title: string) => {
        setTextName(Title);
    };
    const handleInputContent = (Content: string) => {
        setTextDescription(Content);
    };
    const isCategoryExists = (categoryName: string) => {
        return valueTheLoai.some(category => category.name.toLowerCase() === categoryName.toLowerCase());
      };
    const isStringContainsAlphabet = (str: string):boolean => {
        return /^[a-zA-Z\u00C0-\u1EF9\s]*$/.test(str);
      };
    const handlePress = () => {
        if ( valueName!=='' && valueDescription!=='' && !isCategoryExists(valueName) && isStringContainsAlphabet(valueName) ) {
                    let id = uuid.v4();
                    let published= new Date().getTime();
                    let objCategory = {
                        id: id,
                        name: valueName,
                        description: valueDescription,
                        createdAt:published,
                    };
                    console.log(objCategory);
                    let url_api = `http://${Url.IP_WF}:${Url.PORT}/categories`;
                    fetch(url_api, {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(objCategory),
                    })
                        .then((response) => {
                                if (response.ok) {
                                    Alert.alert(
                                        'Thêm chủ đề mới thành công!!',
                                        '',
                                        [
                                            {
                                                text: 'OK',
                                                onPress: () => {
                                                    navigation.goBack();
                                                }
                                            }
                                        ]
                                    );
                                } else {
                                    console.error('Thêm chủ đề mới thất bại!!');
                                }
                        })
                        .catch((error) => { console.log(error); })
            }
            else if (valueName === '')
                {
                    Alert.alert('Vui nhập tên chủ đề!!');
                }
            else if (valueDescription === '')
                {
                    Alert.alert('Vui nhập mô tả!!');
                }
            else if (isCategoryExists(valueName))
                {
                    Alert.alert('Chủ đề đã tồn tại');
                }
            else if (!isStringContainsAlphabet(valueName))
                {
                    Alert.alert('Tên chủ đề chỉ bao gồm chữ cái!!');
                }

    }
    return (
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

            <InputText
                handleInputChange={handleInputTitle}
                value={valueName}
                placeholderText="">
                Chủ đề
            </InputText>

            <InputText
                handleInputChange={handleInputContent}
                value={valueDescription}
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
        fontWeight: 'bold',
        fontSize: 20,
        marginTop: -28,
        paddingBottom: 20,
    },
    text: {
        color: Color.ui_black_10,
        fontWeight: 'bold',
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


