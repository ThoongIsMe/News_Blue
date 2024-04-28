import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Color from '../../constants/Colors';
import FormatTimeAgo from '../../constants/time';
import getAudio from '../../helper/getAudio';
//audio
import Sound from 'react-native-sound';


Sound.setCategory('Playback');

const ReadNews = ({ navigation, route }: any) => {
    const { article } = route.params;
    //audio
    const [isPlaying, setIsPlaying] = useState(false);
    const [audio, setAudio] = useState<Sound | null>(null);
    const [audioUrl, setAudioUrl] = useState<string | null>(null);


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

    return (
        <View style={{ flex: 1 }}>
            <View>
                <View>
                    <View style={styles.imageContainer}>
                        <Image source={{ uri: article.urlToImage }} style={styles.image} />
                    </View>
                </View>
                <View style={styles.iconContainer}>
                    <TouchableOpacity style={styles.backIcon} onPress={() => navigation.goBack()}>
                        <Icon name="chevron-back" color={Color.ui_white_10} size={30} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.bookmarkIcon}>
                        <Icon name="bookmark" color={Color.ui_white_10} size={30} />
                    </TouchableOpacity>
                </View>

                <View style={styles.bottomContainer}>
                    <View style={styles.timer}>
                        <Text style={{ color: Color.ui_white_10 }}>{FormatTimeAgo(article.publishedAt)}</Text>
                    </View>
                    <View style={styles.stats}>
                        <Icon name="eye" color={Color.ui_white_10} size={30} />
                        <Text style={{ color: Color.ui_white_10, paddingLeft: 10 }}>{article.viewCount}</Text>
                    </View>
                </View>
            </View>

            <ScrollView >
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
});

export default ReadNews;