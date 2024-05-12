import * as React from 'react';
import { Alert, Image, KeyboardAvoidingView, PermissionsAndroid, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Container from '../../components/Container';
import Color from '../../constants/Colors';
import Icon from 'react-native-vector-icons/Ionicons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Cmt from '../../components/Cmt';
import { useSelector } from 'react-redux';
import { getCommentsFromApiAsync, getUserFromApiAsync } from '../../helper/api';
import { useEffect, useState } from 'react';
import FormatTimeAgo from '../../constants/time';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Url from '../../constants/Url';
import uuid from 'react-native-uuid';
import { Keyboard } from 'react-native'


interface Comments {
    id: string;
    userID: string;
    articleID: string;
    content: string;
    image: string;
    description: string;
    createdAt: string;
}
interface Users {
    id: string;
    lastName: string;
    firstName: string;
    image: string;
    email: string;
    password: string;
    role: string;

}
// Trong ScreemsUser/User.tsx
function Comments({ route }: any) {
    const { article } = route.params;
    const navigation = useNavigation();
    const info = useSelector((state: any) => state.personalInfo);
    const [users, setUser] = useState<Users[]>([]);

    const [comments, setComments] = useState<Comments[]>([]);
    const [img, setTextimg] = useState('');
    const [showOptions, setShowOptions] = useState(false);
    const [valueCmts, setTextCmts] = useState('');

    const [refetchFavorites, setRefetchFavorites] = useState(false);


    const handleInputCmt = (pass: string) => {
        setTextCmts(pass);
    };


    const toggleOptions = () => {
        setShowOptions(!showOptions);
    };
    const closeOptions = () => {
        setShowOptions(false);
    };

    const fetchData1 = async () => {
        try {
            const cmt = await getCommentsFromApiAsync();
            setComments(cmt);
        } catch (error) {
            console.error("Error fetching articles:", error);
        }
    };

    const fetchUser = async () => {
        try {
            const cmt = await getUserFromApiAsync();
            setUser(cmt);
        } catch (error) {
            console.error("Error fetching articles:", error);
        }
    };

    useEffect(() => {
        if (refetchFavorites) {
            fetchData1();
            setRefetchFavorites(false); // Đặt lại state sau khi tải xong
        }
    }, [refetchFavorites]);
    useEffect(() => {
        fetchData1();
    }, []);
    useFocusEffect(
        React.useCallback(() => {
            fetchData1();
            fetchUser();
        }, [])
    );
    function getUserFromCommentId(commentId: string) {
        const user = users.find(u => u.id === commentId);
        return user;
    }


    const requestImageCameraPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("Camera permission given");
                const result: any = await launchCamera({ mediaType: 'photo', cameraType: 'front' })
                console.log(result.assets[0].uri);
                setTextimg(result.assets[0].uri);
                setShowOptions(false);
            } else {
                console.log("Camera permission denied");
            }
        } catch (err) {
            console.warn(err);
        }
    };


    const requestImageLibraryPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("Camera permission given");
                // const result: any = await launchCamera({ mediaType: 'photo', cameraType: 'front' })
                const result: any = await launchImageLibrary({ mediaType: 'photo' })
                console.log(result.assets[0].uri);
                setTextimg(result.assets[0].uri);
                setShowOptions(false);
            } else {
                console.log("Camera permission denied");
            }
        } catch (err) {
            console.warn(err);
        }
    };

    const handleSend = () => {
        let id = uuid.v4();
        let objUser = {
            id: id,
            userID: info.id,
            articleID: article.id,
            content: valueCmts,
            image: img,
        };
        console.log(objUser);
        let url_api = `http://${Url.IP_WF}:${Url.PORT}/comments`;
        fetch(url_api, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(objUser),
        })
            .then((response) => {
                if (response.status == 201) {
                    if (response.ok) {
                        console.log("OK")
                        Keyboard.dismiss();
                        setRefetchFavorites(true);
                        setTextCmts('');
                        setTextimg('');
                    } else {
                        console.error('Error updating password');
                    }
                }
            })
            .catch((error) => { console.log(error); })
    }

    const handlePressDelete = (commentID: string) => {
        let url_api = `http://${Url.IP_WF}:${Url.PORT}/comments`;
        Alert.alert(
            'Xác nhận',
            'Bạn có chắc chắn muốn xóa bình luận này không?',
            [
                {
                    text: 'Hủy',
                    style: 'cancel',
                },
                {
                    text: 'OK',
                    onPress: () => {
                        fetch(url_api)
                            .then((response) => response.json())
                            .then(() => {
                                const existingArticle = comments.find(
                                    (cmt: any) => cmt.id === commentID
                                );

                                if (existingArticle) {
                                    let deleteUrl = `${url_api}/${existingArticle.id}`;
                                    fetch(deleteUrl, {
                                        method: 'DELETE',
                                    })
                                        .then(() => {
                                            console.log("Xóa bình luận thành công");
                                            setRefetchFavorites(true);
                                        })
                                        .catch((error) => {
                                            console.error("Lỗi khi xóa bình luận:", error);
                                        });
                                } else {
                                    console.log("Không tìm thấy bình luận cần xóa");
                                }
                            })
                            .catch((error) => {
                                console.error("Lỗi khi lấy dữ liệu bình luận:", error);
                            });
                    },
                },
            ]
        );
    };

    return (
        <Container>
            <View style={styles.ViewText}>
                <TouchableOpacity style={styles.backIcon} onPress={() => navigation.goBack()}>
                    <Icon name="chevron-back" color={Color.ui_blue_10} size={30} />
                </TouchableOpacity>
                <Text style={styles.Text}>Đánh giá</Text>
            </View>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : undefined}
                keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
                style={{ flex: 1 }}>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
                    {comments.map(comment => {
                        const infos = getUserFromCommentId(comment.userID);
                        return (
                            article.id === comment.articleID &&
                            <Cmt
                                key={comment.id}
                                onPress={() => handlePressDelete(comment.id)}
                                img={infos ? infos.image : ''}
                                textName={infos ? `${infos.firstName} ${infos.lastName}` : ''}
                                textCmt={comment.content}
                                textDay={FormatTimeAgo(comment.createdAt)}
                                imgCmt={comment.image} />
                        );
                    })}
                </ScrollView>
                <View style={styles.ViewCMT}>
                    <View style={{ padding: 5 }}>
                        {img !== '' ? (
                            <View style={{ flexDirection: 'row' }}>
                                <Image
                                    source={{ uri: img }}
                                    style={{ height: 100, width: 70, borderRadius: 20 }}
                                />
                                <TouchableOpacity onPress={() => setTextimg('')}>
                                    <Icon name="close-circle-outline" color={Color.ui_blue_10} size={25} />
                                </TouchableOpacity>
                            </View>
                        ) : null}
                    </View>


                    <View style={{ flexDirection: 'row' }} >
                        <TouchableOpacity style={{ paddingTop: 5, paddingRight: 10 }} onPress={toggleOptions}>
                            <Icon name="camera-outline" color={Color.ui_blue_10} size={30} />
                        </TouchableOpacity>
                        <TextInput
                            // eslint-disable-next-line eqeqeq
                            style={[styles.textInput, (valueCmts !== '' || img !== '') ? styles.inputWmin : styles.inputWmax]}
                            onChangeText={handleInputCmt}
                            value={valueCmts}
                            placeholder="Viết đánh giá mới ..."
                        />

                        {(valueCmts !== '' || img !== '') && (
                            <TouchableOpacity style={{ paddingTop: 6, paddingLeft: 10 }} onPress={handleSend}>
                                <Icon name="send" color={Color.ui_blue_10} size={27} />
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </KeyboardAvoidingView>
            {showOptions && (
                <TouchableOpacity style={styles.overlay} onPress={closeOptions} />
            )}
            {showOptions && (
                <>
                    <View style={styles.container1}>
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
    );
}
const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Màu nền tối
    },
    container1: {
        marginHorizontal: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Color.ui_grey_10,
        borderRadius: 16,
        marginTop: -400,
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

    ViewCMT: {
        marginTop: 10,
        backgroundColor: Color.ui_white_10,
        position: 'relative',
        bottom: 0,
        left: 0,
        right: 0,
    },
    ViewText: {
        justifyContent: 'center',
        alignItems: 'center',

    },
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: Color.ui_black_10,
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
export default Comments;