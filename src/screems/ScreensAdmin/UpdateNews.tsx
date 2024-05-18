import * as React from 'react';
import { Alert, Image, PermissionsAndroid, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Container from '../../components/Container';
import Color from '../../constants/Colors';
import Icon from 'react-native-vector-icons/Ionicons';
import InputText from '../../components/InputText';
import { useEffect, useState } from 'react';
import PrimaryButton from '../../components/PrimaryButton';
import { ScrollView } from 'react-native-gesture-handler';
import { getCategoriesFromApiAsync } from '../../helper/api';
import { Picker } from '@react-native-picker/picker';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import TextArea from '../../components/TextArea';
import Url from '../../constants/Url';
import { store } from '../../redux/store';
import { useDispatch } from 'react-redux';
interface Category {
    id: string;
    name: string;
}
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
// Trong ScreemsUser/User.tsx
function UpdateNews({ navigation, route }: any) {
    
    
    const [valueTheLoai, setTextTheLoai] = useState<Category[]>([{ id: '0', name: 'All' }]);
    const { article } = route.params;
    const [valueTieuDe, setTextTieuDe] = useState(article.title);
    const [valueTacGia, setTextTacGia] = useState(article.author);

    const [valueImg, setTextImg] = useState(article.urlToImage);
    const [valueUrl, setTextUrl] = useState(article.url);
    const [valueMoTa, setTextMoTa] = useState(article.description);
    const [valueNoiDung, setTextNoiDung] = useState(article.content);
    const [showOptions, setShowOptions] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(article.id_category);
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
    const toggleOptions = () => {
        setShowOptions(!showOptions);
    };

    const closeOptions = () => {
        setShowOptions(false);
    };

    const requestImageCameraPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('Camera permission given');
                const result: any = await launchCamera({ mediaType: 'photo', cameraType: 'front' })
                console.log(result.assets[0].uri);
                setTextImg(result.assets[0].uri);
                setShowOptions(false);
            } else {
                console.log('Camera permission denied');
            }
        } catch (err) {
            console.warn(err);
        }
    };
    if (!article) {
        return <Text>Loading...</Text>;
    }
    const requestImageLibraryPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('Camera permission given');
                // const result: any = await launchCamera({ mediaType: 'photo', cameraType: 'front' })
                const result: any = await launchImageLibrary({ mediaType: 'photo' })
                console.log(result.assets[0].uri);
                setTextImg(result.assets[0].uri);
                setShowOptions(false);
            } else {
                console.log('Camera permission denied');
            }
        } catch (err) {
            console.warn(err);
        }
    };
    const handleCategoryChange = (itemValue: string) => {
        setSelectedCategory(itemValue);
    };
    const handleInputTieuDe = (Content: string) => {
        setTextTieuDe(Content);
    };

    const handleInputTacGia = (Content: string) => {
        setTextTacGia(Content);
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
         
            if ( valueTieuDe !== '' && valueTacGia !== ''
                && valueUrl !== '' && valueImg !== '' && valueMoTa !== '' && valueNoiDung !== '') {
                    let updated= new Date().getTime();
                    let objArticle = {
                        author: valueTacGia,
                        id_category: selectedCategory,
                        title:valueTieuDe,
                        description: valueMoTa,
                        url: valueUrl,
                        urlToImage: valueImg,
                        content: valueNoiDung,
                        updatedAt:updated,
                    };
                    console.log(objArticle);
                    let url_api = `http://${Url.IP_WF}:${Url.PORT}/articles/${article.id}`;
                    fetch(url_api, {
                        method: 'PATCH',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(objArticle),
                    })
                        .then((response) => {
                                if (response.ok) {
                                    Alert.alert(
                                        'Cập nhật báo thành công!!',
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
                                    console.error('Cập nhật báo thất bại!!');
                                }
                        })
                        .catch((error) => { console.log(error); })
            }
            else if (valueTieuDe === '')
                {
                    Alert.alert("Vui nhập tiêu đề!!");
                }
            else if (valueTacGia === '')
                {
                    Alert.alert("Vui nhập tên tác giả!!");
                } 
            else if (valueUrl === '')
                {
                    Alert.alert("Vui nhập url bài báo!!");
                }  
            else if (valueImg === '')
                {
                    Alert.alert("Vui nhập chọn hình ảnh!!");
                }
            else if (valueMoTa === '')
                {
                     Alert.alert("Vui nhập mô tả!!");
                }
            else if (valueNoiDung === '')
                {
                     Alert.alert("Vui nhập nội dung!!");
                }
    };

    
    return (
        <ScrollView style={{backgroundColor:'white', height:'100%'}}>
            <Container>

                <View style={styles.ViewText}>
                    <TouchableOpacity style={styles.backIcon} onPress={() => navigation.goBack()}>
                        <Icon name="chevron-back" color={Color.ui_blue_10} size={30} />
                    </TouchableOpacity>
                    <Text style={styles.Text}>Chỉnh sửa bài báo</Text>
                    <View style={styles.ViewText}>
                        <Text style={styles.text}>Thông tin bài báo</Text>
                    </View>
                </View>

                <View>
                    <Text style={{
                        color: Color.ui_grey_20,
                        fontWeight: 'bold',
                        fontSize: 16,
                        paddingTop: 20,
                    }}>Thể Loại</Text>
                    <View style={{ borderBottomWidth: 1, borderColor: Color.ui_grey_20, borderRadius: 10, marginLeft: -10 }}>
                        <Picker
                            selectedValue={selectedCategory}
                            onValueChange={handleCategoryChange}

                        >
                            {valueTheLoai.map(category => (
                                <Picker.Item key={category.id} label={category.name} value={category.id} />
                            ))}
                        </Picker>
                    </View>


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
                        fontWeight: 'bold',
                        fontSize: 16,
                        paddingVertical: 20,
                        marginTop:15,
                    }}>Hình ảnh</Text>
                    <TouchableOpacity 
                     style={{ 
                        marginVertical: 17, 
                        marginLeft: 10, 
                        marginBottom:20,
                        marginTop:30,
                        backgroundColor: valueImg !== '' ? Color.ui_blue_10 : Color.ui_grey_20, 
                        padding: 3, 
                        borderRadius: 7, 
                        justifyContent:'center'
                    }} 
                    onPress={toggleOptions}>
                    <Text>{valueImg !== '' ? 'Đã chọn' : 'Chọn hình'}</Text>

                    </TouchableOpacity>
                    {valueImg != '' ? <Image
                        source={{ uri: valueImg }}
                        style={styles.imgOver}
                    /> : ''}
                </View>
                <InputText
                    handleInputChange={handleInputMotTa}
                    value={valueMoTa}
                    placeholderText="">
                    Mô tả
                </InputText>
                <TextArea
                    handleInputChange={handleInputNoiDung}
                    value={valueNoiDung}
                    placeholderText="">
                    Nội dung
                </TextArea>
                <View style={styles.btnSubmit}>
                    <PrimaryButton onPress={handlePress} color={Color.ui_blue_10} height={50} width={200} borderRadius={20}>
                        Cập nhật
                    </PrimaryButton>
                    
                </View>
                {showOptions && (
                    <TouchableOpacity style={styles.overlay} onPress={closeOptions} />
                )}
                {showOptions && (
                    <>
                        <View style={styles.container}>
                            <Text style={{
                                color: Color.ui_blue_10,
                                fontWeight: "bold",
                                fontSize: 24,
                                padding: 10,
                            }}>Profile Photo</Text>
                            <View style={styles.photoOptions}>
                                <TouchableOpacity style={styles.optionButton} onPress={requestImageCameraPermission}>
                                    <Icon name="camera-outline" color={Color.ui_blue_10} size={24} />
                                    <Text style={styles.optionText}>Camera</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.optionButton} onPress={requestImageLibraryPermission}>
                                    <Icon name="image-outline" color={Color.ui_blue_10} size={24} />
                                    <Text style={styles.optionText}>Gallery</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </>
                )}
                
            </Container>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    imgOver: {
        width: 50,
        height: 50,
        margin:10,
        marginTop:20,

    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Màu nền tối
    },
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
    container: {
        marginHorizontal: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Color.ui_grey_10,
        borderRadius: 16,
        marginTop: -400,
        marginBottom: 400,
    },
    photoOptions: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
        alignSelf: 'center', // Thêm dòng này để căn giữa theo chiều ngang
    },
    optionButton: {
        flexDirection: 'column',
        alignItems: 'center',
        paddingHorizontal: 25,
        paddingVertical: 10,
        backgroundColor: '#ebebeb',
        borderRadius: 20,
        borderColor: Color.ui_blue_10,
        borderWidth: 1,
        margin: 10,
    },
    optionText: {
        marginLeft: 5,
        fontSize: 16,
        color: Color.ui_blue_10,
    },
});

export default UpdateNews;


