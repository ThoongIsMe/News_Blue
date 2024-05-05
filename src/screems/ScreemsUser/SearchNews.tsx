import * as React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import SearchText from '../../components/SearchText';
import { useEffect, useState } from 'react';
import Container from '../../components/Container';
import Color from '../../constants/Colors';
import { getFavoritesFromApiAsync, getNewsFromApiAsync } from '../../helper/api';
import { useSelector } from 'react-redux';
import uuid from 'react-native-uuid';
import Url from '../../constants/Url';
import CardNews from '../../components/CardNews';
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


// Trong ScreemsUser/User.tsx
function SearchNews({ navigation }: any) {
    const info = useSelector((state: any) => state.personalInfo);


    const [favorite, setFavorites] = useState<Favorites[]>([]);
    const [articles, setArticles] = useState<Article[]>([]);
    const [refetchFavorites, setRefetchFavorites] = useState(false);
    const [valueSearch, setValueSearch] = useState('');
    const [textSearch, setTextSearch] = useState('Nổi Bật');

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


    // useEffect(() => {

    // }, []);


    useEffect(() => {
        const fetchData1 = async () => {
            try {
                let filteredArticles = [];
                const articlesData = await getNewsFromApiAsync();

                if (valueSearch.length === 0) {
                    setTextSearch('Nổi Bật');
                } else {
                    setTextSearch(valueSearch);
                    filteredArticles = articlesData.filter((article: { title: string; }) => article.title.toLowerCase().includes(valueSearch.toLowerCase()));
                    setArticles(filteredArticles);
                }
            } catch (error) {
                console.error("Error fetching articles:", error);
            }
        };

        fetchData1();
    }, [valueSearch]);


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
                    setValueSearch("");
                    const articlesData = await getNewsFromApiAsync();
                    articlesData.sort((a: { viewCount: number; }, b: { viewCount: number; }) => b.viewCount - a.viewCount);
                    const topFourArticles = articlesData.slice(0, 4);
                    setArticles(topFourArticles);
                } catch (error) {
                    console.error("Error fetching articles:", error);
                }
            };
            fetchData1();
            fetchData();
        }, [])
    );

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






    const handleInputSearch = (valueSearch: string) => {
        setValueSearch(valueSearch);
    };



    const renderArticle = ({ item }: { item: Article }) => {
        return (
            <CardNews
                onPress={() => handleArticleOnPress(item)}
                onClickTouchable={() => handleArticlePress(item.id)}
                onClickTouchableDelete={() => handleArticlePress(item.id)} // You might want to remove quotes around item.id
                time={FormatTimeAgo(item.publishedAt)}
                img={item.urlToImage}
                user={favorite.find((fav: any) => fav.articleID === item.id && fav.userID === info.id) ? 2 : 1}
                bool={false}
            >
                {item.title}
            </CardNews>
        );

    };



    return (
        <Container>
            <View style={styles.item}>
                <SearchText handleInputChange={handleInputSearch}
                    value={valueSearch}
                    placeholderText="Tìm kiếm">
                </SearchText>
                <Text style={styles.text}>{textSearch}</Text>
                {/* <TouchableOpacity style={styles.btn}>
                    <Text style={styles.text}>Tìm</Text>
                </TouchableOpacity> */}
            </View>

            <FlatList
                data={articles}
                renderItem={renderArticle}
                keyExtractor={item => item.id} // Assuming each article has a unique id
                showsVerticalScrollIndicator={false}
            />
        </Container>
    );
}

const styles = StyleSheet.create({
    item: {
        flexDirection: 'column',
    },
    text: {
        color: Color.ui_blue_10,
        fontWeight: 'bold',
        fontSize: 22,
        paddingHorizontal: 10,
        marginTop: 10
    },
    btn: {
        padding: 5,
        paddingLeft: 10,
    }

});

export default SearchNews;
