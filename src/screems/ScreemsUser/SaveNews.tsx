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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const articlesData = await getNewsFromApiAsync();
                setArticles(articlesData);
            } catch (error) {
                console.error("Error fetching articles:", error);
            }
        };
        console.log("Inf", info.id);
        fetchData();
    }, [info.id]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const favoritesData = await getFavoritesFromApiAsync();
                setFavorites(favoritesData);
            } catch (error) {
                console.error("Error fetching articles:", error);
            }
        };

        fetchData();
    }, [favorites]);




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
                    // If the favorite already exists, delete it
                    let deleteUrl = `${url_api}/${existingFavorite.id}`;

                    fetch(deleteUrl, {
                        method: 'DELETE',
                    })
                        .then(() => {
                            console.log("Favorite deleted successfully");
                        })
                        .catch((error) => {
                            console.error("Error deleting favorite:", error);
                        });
                }
            })
    };


    const handleArticleOnPress = (article: Article) => {
        console.log(article.title);
        navigation.navigate("ReadNews", { article });
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



