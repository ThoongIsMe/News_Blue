/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Color from '../../constants/Colors';
import Container from '../../components/Container';
import { getNewsFromApiAsync, getCategoriesFromApiAsync, getFavoritesFromApiAsync } from '../../helper/api';
import CardNews from '../../components/CardNews';
import FormatTimeAgo from '../../constants/time';
import Header from '../../components/Header';
import uuid from 'react-native-uuid';
import Url from '../../constants/Url';
import Load from '../HomeScreems/load';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';

import { setCheckLoad } from '../../redux/actions/checkLoadActions'
import { store } from '../../redux/store';

// chuyển useDispatch -> useAppDispatch type store
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
interface Category {
    id: string;
    name: string;
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


interface Favorites {
    id: string;
    publishedAt: string;
    id_favorite: string;
    id_user: string;
}

function HomeNews({ navigation }: any): React.JSX.Element {
    const [pressedIndex, setPressedIndex] = useState<number>(0); // Default selected index is 0 (All)
    const [categories, setCategories] = useState<Category[]>([{ id: '0', name: 'All' }]); // Default category "All"
    const [articles, setArticles] = useState<Article[]>([]);
    const [favorite, setFavorites] = useState<Favorites[]>([]);

    const [refetchFavorites, setRefetchFavorites] = useState(false);
    const [loading, setLoading] = useState(false);


    const info = useSelector((state: any) => state.personalInfo);
    const check = useSelector((state: any) => state.checkInfo);
    console.log(check);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const categoriesData = await getCategoriesFromApiAsync();
                setCategories([{ id: '0', name: 'All' }, ...categoriesData]); // Prepend "All" category to fetched categories
            } catch (error) {
                console.error(error);
            }

        };
        fetchData();
    }, [info]);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (info.image !== '') {
            dispatch(setCheckLoad(true));
        }
    }, [dispatch, info.image]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const articlesData = await getNewsFromApiAsync();
                setArticles(articlesData);
            } catch (error) {
                console.error("Error fetching articles:", error);
            }
        };

        fetchData();
    }, []);


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

            }; const fetchData1 = async () => {
                try {
                    const articlesData = await getNewsFromApiAsync();
                    setArticles(articlesData);
                } catch (error) {
                    console.error("Error fetching articles:", error);
                }
            };
            fetchData1();
            fetchData();
        }, [])

    );



    const handlePress = (index: number) => {
        setPressedIndex(index);
        // Retrieve the ID of the selected category
        const categoryId = categories[index].id;
        console.log('Selected category ID:', categoryId);
    };

    ////////////////////////////////
    // Wherever you're handling article press

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

                navigation.navigate("ReadNews", { article: updatedArticle });
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

    const filteredArticles = pressedIndex === 0 ? articles : articles.filter(article => article.id_category === categories[pressedIndex].id);

    const sortedFilteredArticles = [...filteredArticles].sort((a, b) => {
        const dateA = new Date(parseInt(a.publishedAt, 10));
        const dateB = new Date(parseInt(b.publishedAt, 10));
        return dateB.getTime() - dateA.getTime();
    });


    return (

        <Container>
            <Header />
            {check.checkLoad === false && <Load />}
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                {categories.map((category, index) => (
                    <TouchableOpacity key={index} onPress={() => handlePress(index)}>
                        <View style={[styles.item, pressedIndex === index ? styles.itemPressed : null]}>
                            <View>
                                <Text style={[styles.text, pressedIndex === index ? styles.textPressed : null]}>
                                    {category.name}
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            <FlatList
                data={sortedFilteredArticles}
                renderItem={renderArticle}
                keyExtractor={item => item.id} // Assuming each article has a unique id
                showsVerticalScrollIndicator={false}
            />
        </Container>
    );
}

const styles = StyleSheet.create({

    item: {
        width: 90,
        marginRight: 10,
        backgroundColor: Color.ui_white_10,
        paddingHorizontal: 10,
        marginBottom: 10,
        paddingTop: 10,
    },
    text: {
        color: Color.ui_black_10,
        fontWeight: 'bold',
        fontSize: 17,
        textAlign: 'center',
    },
    textPressed: {
        color: Color.ui_blue_10,
    },
    itemPressed: {
        backgroundColor: Color.ui_white_10, // Keep background color unchanged when pressed
    },

});

export default HomeNews;




