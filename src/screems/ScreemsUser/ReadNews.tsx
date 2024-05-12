import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Color from '../../constants/Colors';
import FormatTimeAgo from '../../constants/time';
import getAudio from '../../helper/getAudio';
//audio
import Sound from 'react-native-sound';
import { useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { getFavoritesFromApiAsync, getHeartsFromApiAsync } from '../../helper/api';
import uuid from 'react-native-uuid';
import Url from '../../constants/Url';
Sound.setCategory('Playback');
interface Favorites {
    id: string;
    publishedAt: string;
    id_favorite: string;
    id_user: string;
}

interface Article {
    id: string;
    author: string;
    id_category: string;
    viewCount: number;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string; // Change the type to string
    content: string;
}
interface Hearts {
    id: string;
    publishedAt: string;
    articleID: string;
    userID: string;
}

const ReadNews = ({ navigation, route }: any) => {
    const { article } = route.params;
    //audio
    const [isPlaying, setIsPlaying] = useState(false);
    const [audio, setAudio] = useState<Sound | null>(null);
    const [audioUrl, setAudioUrl] = useState<string | null>(null);

    const [favorite, setFavorites] = useState<Favorites[]>([]);
    const [refetchFavorites, setRefetchFavorites] = useState(false);


    const [heart, setHeart] = useState<Hearts[]>([]);
    const [refetchHeart, setRefetchHeart] = useState(false);
    const [countHeart, setCountHeart] = useState(0);

    const info = useSelector((state: any) => state.personalInfo);

    useEffect(() => {
        const count = heart.reduce((acc, item) => {
            return item.articleID === article.id ? acc + 1 : acc;
        }, 0);
        setCountHeart(count);
    }, [heart, article.id]);

    const fetchDataHeart = async () => {
        try {
            const heartData = await getHeartsFromApiAsync();
            setHeart(heartData);
        } catch (error) {
            console.error("Error fetching heart:", error);
        }
    };

    useEffect(() => {
        if (refetchHeart) {
            fetchDataHeart();
            setRefetchHeart(false);
        }
    }, [refetchHeart]);

    useFocusEffect(
        React.useCallback(() => {
            fetchDataHeart();
        }, [])
    );


    const fetchData = async () => {
        try {
            const favoritesData = await getFavoritesFromApiAsync();
            setFavorites(favoritesData);
        } catch (error) {
            console.error("Error fetching favoritesData:", error);
        }

    };

    useEffect(() => {
        if (refetchFavorites) {
            fetchData();
            setRefetchFavorites(false);
        }
    }, [refetchFavorites]);

    useFocusEffect(
        React.useCallback(() => {
            fetchData();
        }, [])
    );

    const handleHeartPress = (articleId: string) => {
        console.log(articleId);
        let id = uuid.v4();
        let heartData = {
            id: id,
            userID: info.id,
            articleID: articleId,
        };
        let url_api = `http://${Url.IP_WF}:${Url.PORT}/heart`;

        // Check if the favorite entry already exists
        fetch(url_api)
            .then((response) => response.json())
            .then((hearts) => {
                const existingFavorite = hearts.find(
                    (heart: any) => heart.userID === info.id && heart.articleID === articleId
                );

                if (existingFavorite) {
                    // If the favorite already exists, delete it
                    let deleteUrl = `${url_api}/${existingFavorite.id}`;

                    fetch(deleteUrl, {
                        method: 'DELETE',
                    })
                        .then(() => {

                            console.log("Favorite deleted successfully");
                            setRefetchHeart(true); // Cập nhật state chia sẻ để yêu cầu tải lại dữ liệu yêu thích

                        })
                        .catch((error) => {
                            console.error("Error deleting favorite:", error);
                        });
                } else {
                    // If the favorite does not exist, add it
                    fetch(url_api, {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(heartData),
                    })
                        .then((response) => {
                            if (response.status === 201) {
                                console.log("heart added successfully");
                                setRefetchHeart(true); // Cập nhật state chia sẻ để yêu cầu tải lại dữ liệu yêu thích

                            } else {
                                console.log("Failed to add heart");
                            }
                        })
                        .catch((error) => {
                            console.error("Error adding heart:", error);
                        });
                }
            })
            .catch((error) => {
                console.error("Error fetching heart:", error);
            });

    };

    const handleArticlePress = (articleId: string) => {
        console.log(articleId);
        let id = uuid.v4();
        let favoriteData = {
            id: id,
            userID: info.id,
            articleID: articleId,
        };
        let url_api = `http://${Url.IP_WF}:${Url.PORT}/favorites`;

        // Check if the favorite entry already exists
        fetch(url_api)
            .then((response) => response.json())
            .then((favorites) => {
                const existingFavorite = favorites.find(
                    (favorite: any) => favorite.userID === info.id && favorite.articleID === articleId
                );

                if (existingFavorite) {
                    // If the favorite already exists, delete it
                    let deleteUrl = `${url_api}/${existingFavorite.id}`;

                    fetch(deleteUrl, {
                        method: 'DELETE',
                    })
                        .then(() => {

                            console.log("Favorite deleted successfully");
                            setRefetchFavorites(true); // Cập nhật state chia sẻ để yêu cầu tải lại dữ liệu yêu thích

                        })
                        .catch((error) => {
                            console.error("Error deleting favorite:", error);
                        });
                } else {
                    // If the favorite does not exist, add it
                    fetch(url_api, {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(favoriteData),
                    })
                        .then((response) => {
                            if (response.status === 201) {
                                console.log("Favorite added successfully");
                                setRefetchFavorites(true); // Cập nhật state chia sẻ để yêu cầu tải lại dữ liệu yêu thích

                            } else {
                                console.log("Failed to add favorite");
                            }
                        })
                        .catch((error) => {
                            console.error("Error adding favorite:", error);
                        });
                }
            })
            .catch((error) => {
                console.error("Error fetching favorites:", error);
            });

    };

    useEffect(() => {
        var data = article.title + article.description + article.content + article.author;
        getAudio(data).then((url: any) => {
            setAudioUrl(url);
        });
    }, [article.author, article.content, article.description, article.title]);

    useEffect(() => {
        if (audioUrl) {
            const audioFile = new Sound(audioUrl);
            setAudio(audioFile);

            return () => {
                audioFile.release();
            };
        }
    }, [audioUrl]);

    const playPause = () => {
        if (!audio) return;
        if (isPlaying) {
            audio.pause();
        } else {
            audio.play((success: boolean) => {
                if (success) {
                    console.log('successfully finished playing');
                } else {
                    console.log('playback failed due to audio decoding errors');
                }
            });
        }
        setIsPlaying(!isPlaying);
    };
    ///
    if (!article) {
        return <Text>Loading...</Text>;
    }


    const handleUrlPress = () => {
        if (article.url) {
            Linking.openURL(article.url);
        }
    };

    const handleDanhGia = (article: Article) => {
        navigation.navigate('Comments', { article });
    };

    return (
        <View style={{ flex: 1 }}>
            <View>
                <View>
                    <View style={styles.imageContainer}>
                        {article.urlToImage != '' ? <Image source={{ uri: article.urlToImage }} style={styles.image} /> : <Image source={{ uri: 'https://cdn.pixabay.com/photo/2021/07/21/12/49/error-6482984_1280.png' }} style={styles.image} />}
                    </View>
                </View>
                <View style={styles.iconContainer}>
                    <TouchableOpacity style={styles.backIcon} onPress={() => navigation.goBack()}>
                        <Icon name="chevron-back" color={Color.ui_white_10} size={30} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.bookmarkIcon} onPress={() => handleArticlePress(article.id)}>
                        {favorite.find((fav: any) => fav.articleID === article.id && fav.userID === info.id)
                            ? <Icon name="bookmark" color={Color.ui_yellow_10} size={30} />

                            : <Icon name="bookmark" color={Color.ui_white_10} size={30} />
                        }
                    </TouchableOpacity>
                </View>

                <View style={styles.bottomContainer}>
                    <View style={styles.timer}>
                        <Text style={{ color: Color.ui_white_10 }}>{FormatTimeAgo(article.publishedAt)}</Text>
                    </View>
                    <View style={styles.stats}>
                        <TouchableOpacity onPress={() => handleHeartPress(article.id)}>
                            {heart.find((fav: any) => fav.articleID === article.id && fav.userID === info.id)
                                ? <Icon name="heart" color={Color.ui_red_10} size={30} />

                                : <Icon name="heart" color={Color.ui_white_10} size={30} />
                            }
                        </TouchableOpacity>
                        <Text style={{ color: Color.ui_white_10, padding: 10 }}>{countHeart}</Text>


                        <Icon name="eye" color={Color.ui_white_10} size={30} />
                        <Text style={{ color: Color.ui_white_10, paddingLeft: 10 }}>{article.viewCount}</Text>
                    </View>
                </View>
            </View>

            <ScrollView >
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => handleDanhGia(article)}>
                        <Text style={{
                            color: Color.ui_blue_10, fontSize: 23,
                            fontWeight: 'bold',
                            paddingVertical: 6,
                            paddingLeft: 19,
                        }}>Đánh giá</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.bookmarkIcon, { flexDirection: 'row' }]} onPress={playPause}>
                        <View style={{
                            padding: 5,
                        }}>
                            <Text style={{
                                color: Color.ui_blue_10, fontSize: 23,
                                fontWeight: 'bold',
                            }}>Đọc</Text>
                        </View>
                        {isPlaying ? <Icon name="pause-circle-outline" color={Color.ui_black_10} size={40} />
                            : <Icon name="play-circle-outline" color={Color.ui_black_10} size={40} />}

                    </TouchableOpacity>
                </View>
                <Text style={[styles.title, styles.textSpacing, styles.centerText]}>{article.title}</Text>
                <Text style={[styles.description, styles.textSpacing, styles.centerText]}>{article.description}</Text>
                <Text style={[styles.content, styles.textSpacing, styles.centerText]}>{article.content}</Text>
                <View style={{ paddingBottom: 30 }}>
                    <Text style={[styles.title, styles.textSpacing, styles.centerText]}>Author: {article.author}</Text>
                    <Text numberOfLines={1} style={[styles.centerText, styles.url]} onPress={handleUrlPress}>
                        {article.url}
                    </Text>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    authorContainer: {
        marginTop: 'auto',
        padding: 10,
    },
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: 230,
    },
    iconContainer: {
        flexDirection: 'row',
        padding: 10,
        top: 0,
        position: 'absolute',
        left: 0,
        right: 0,
    },
    backIcon: {
        marginRight: 'auto',
    },
    bookmarkIcon: {
        marginLeft: 'auto',
        paddingRight: 10,
    },
    bottomContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
    },
    timer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    stats: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        color: Color.ui_black_10,
        fontSize: 23,
        fontWeight: 'bold',
    },
    description: {
        color: Color.ui_black_10,
        fontSize: 19,
        fontWeight: '500',
    },
    content: {
        fontSize: 16,
        color: Color.ui_black_10,
        fontWeight: '400',
    },
    textSpacing: {
        marginTop: 10,
        marginBottom: 10,
    },
    centerText: {
        textAlign: 'justify',
        marginHorizontal: 20,
    },
    url: {
        borderRadius: 20,
        borderWidth: 2,
        borderColor: Color.ui_grey_20,
        padding: 5,
    },
    lotte: {
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: Color.ui_grey_10,
        zIndex: 1,
    }, loading: {
        width: 200,
        height: 200,
    },
});

export default ReadNews;