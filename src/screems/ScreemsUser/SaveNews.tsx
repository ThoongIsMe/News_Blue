import * as React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import Color from '../../constants/Colors';
import { getFavoritesFromApiAsync, getNewsFromApiAsync } from '../../helper/api';
import { useEffect, useState } from 'react';
import Container from '../../components/Container';
import CardNews from '../../components/CardNews';
import { useSelector } from 'react-redux';
import Url from '../../constants/Url';
import FormatTimeAgo from '../../constants/time';
import { useFocusEffect } from '@react-navigation/native';

interface Favorites {
    id: string;
    userID: string;
    articleID: string;
    dateAdded: string;

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

function SaveNews({ navigation }: any) {
    const [favorites, setFavorites] = useState<Favorites[]>([]);
    const [articles, setArticles] = useState<Article[]>([]);
    const info = useSelector((state: any) => state.personalInfo);
    const [refetchFavorites, setRefetchFavorites] = useState(false);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const articlesData = await getNewsFromApiAsync();
    //             setArticles(articlesData);
    //         } catch (error) {
    //             console.error("Error fetching articles:", error);
    //         }
    //     };
    //     console.log("Inf", info.id);
    //     fetchData();
    // }, [info.id]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const favoritesData = await getFavoritesFromApiAsync();
                setFavorites(favoritesData);
            } catch (error) {
                console.error("Error fetching articles:", error);
            }
        };

        if (refetchFavorites) {
            fetchData();
            setRefetchFavorites(false); // Đặt lại state sau khi tải xong
        }
    }, [refetchFavorites]);

    useFocusEffect(
        React.useCallback(() => {
            const fetchData = async () => {
                try {
                    const favoritesData = await getFavoritesFromApiAsync();
                    setFavorites(favoritesData);
                } catch (error) {
                    console.error("Error fetching articles:", error);
                }

            };
            const fetchData1 = async () => {
                try {
                    const articlesData = await getNewsFromApiAsync();
                    setArticles(articlesData);
                } catch (error) {
                    console.error("Error fetching articles:", error);
                }
            };
            fetchData();
            fetchData1();
        }, [])
    );


    ////////////////////////////////
    // Wherever you're handling article press

    const handleArticlePress = (articleId: string) => {
        let url_api = `http://${Url.IP_WF}:${Url.PORT}/favorites`;
        console.log(articleId);
        fetch(url_api)
            .then((response) => response.json())
            .then((favorites) => {
                const existingFavorite = favorites.find(
                    (favorite: any) => favorite.userID === info.id && favorite.articleID === articleId
                );

                if (existingFavorite) {
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
                }
            })
    };


    const handleArticleOnPress = async (article: Article) => {
        console.log(article.title);
        try {
            const updatedArticle = {
                ...article,
                viewCount: article.viewCount + 1
            };

            const response = await fetch(`http://${Url.IP_WF}:${Url.PORT}/articles/${article.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedArticle)
            });

            if (response.ok) {
                const updatedArticles = articles.map(a => a.id === article.id ? updatedArticle : a);
                setArticles(updatedArticles);

                navigation.push("ReadNews", { article: updatedArticle });
            } else {
                console.error('Failed to update article viewCount');
            }
        } catch (error) {
            console.error('Error updating article viewCount:', error);
        }
    };

    const renderArticle = ({ item }: { item: Article }) => {
        return (
            <CardNews
                onPress={() => handleArticleOnPress(item)}
                onClickTouchable={() => handleArticlePress(item.id)}
                time={FormatTimeAgo(item.publishedAt)}
                img={item.urlToImage}
                user={3}
                bool={false}
            >
                {item.title}
            </CardNews>
        );

    };



    const favoriteArticles = articles.filter(article => {
        return favorites.some(favorite => favorite.userID === info.id && favorite.articleID === article.id);
    });


    return (
        <Container>
            <View >
                <View style={styles.ViewText}>
                    <Text style={styles.Text}>Đã Lưu</Text>
                </View>
            </View>
            <FlatList
                data={favoriteArticles}
                renderItem={renderArticle}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
            />
        </Container>
    );
}
const styles = StyleSheet.create({
    bookmarkIcon: {
        marginLeft: 'auto',
        padding: 20,
        marginTop: -50,

    },
    ViewText: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    Text: {
        color: Color.ui_blue_10,
        fontWeight: "bold",
        fontSize: 20,
    }
})
export default SaveNews;



