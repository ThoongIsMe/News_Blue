import * as React from 'react';
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import SearchText from '../../components/SearchText';
import { useEffect, useState } from 'react';
import Container from '../../components/Container';
import Color from '../../constants/Colors';
import { getNewsFromApiAsync } from '../../helper/api';
import Url from '../../constants/Url';
import CardNews from '../../components/CardNews';
import FormatTimeAgo from '../../constants/time';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';


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
function ManagerNews({ navigation }: any) {
    // const info = useSelector((state: any) => state.personalInfo);


    const [articles, setArticles] = useState<Article[]>([]);
    const [valueSearch, setValueSearch] = useState('');
    const [textSearch, setTextSearch] = useState('Nổi Bật');


    const [refetchArticles, setRefetchArticles] = useState(false);




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



    useEffect(() => {
        const fetchData = async () => {
            try {
                const favoritesData = await getNewsFromApiAsync();
                setArticles(favoritesData);
            } catch (error) {
                console.error("Error fetching articles:", error);
            }

        };
        if (refetchArticles) {
            fetchData();
            setRefetchArticles(false); // Đặt lại state sau khi tải xong
        }
    }, [refetchArticles]);

    useFocusEffect(
        React.useCallback(() => {
            const fetchData1 = async () => {
                try {
                    setValueSearch("");
                    const articlesData = await getNewsFromApiAsync();
                    setArticles(articlesData);
                } catch (error) {
                    console.error("Error fetching articles:", error);
                }
            };
            fetchData1();
        }, [])
    );

    const handleArticleDeletePress = (articleId: string) => {
        let url_api = `http://${Url.IP_WF}:${Url.PORT}/articles`;
        console.log(articleId);

        // Display confirmation dialog
        Alert.alert(
            'Xác nhận',
            'Bạn có chắc chắn muốn xóa bài báo này không?',
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
                            .then((articles) => {
                                const existingArticle = articles.find(
                                    (article: any) => article.id === articleId
                                );

                                if (existingArticle) {
                                    let deleteUrl = `${url_api}/${existingArticle.id}`;
                                    fetch(deleteUrl, {
                                        method: 'DELETE',
                                    })
                                        .then(() => {
                                            console.log("Xóa bài viết thành công");
                                            setRefetchArticles(true);
                                        })
                                        .catch((error) => {
                                            console.error("Lỗi khi xóa bài viết:", error);
                                        });
                                } else {
                                    console.log("Không tìm thấy bài viết cần xóa");
                                }
                            })
                            .catch((error) => {
                                console.error("Lỗi khi lấy dữ liệu bài viết:", error);
                            });
                    },
                },
            ]
        );
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

    const handleArticlePress = (article: Article) => {
        navigation.navigate("AddNews", { article });
    }

    const sortedFilteredArticles = [...articles].sort((a, b) => {
        const dateA = new Date(parseInt(a.publishedAt, 10));
        const dateB = new Date(parseInt(b.publishedAt, 10));
        return dateB.getTime() - dateA.getTime();
    });

    const renderArticle = ({ item }: { item: Article }) => {
        return (
            <CardNews
                onPress={() => handleArticleOnPress(item)}
                onClickTouchable={() => handleArticlePress(item)}
                onClickTouchableDelete={() => handleArticleDeletePress(item.id)} // You might want to remove quotes around item.id
                time={FormatTimeAgo(item.publishedAt)}
                img={item.urlToImage}
                user={4}
                bool={false}
            >
                {item.title}
            </CardNews>
        );
    };




    return (
        <Container>
            <View style={styles.ViewText}>
                <TouchableOpacity style={styles.backIcon} onPress={() => navigation.goBack()}>
                    <Icon name="chevron-back" color={Color.ui_blue_10} size={30} />
                </TouchableOpacity>
                <Text style={styles.Text}>Danh sách bài báo</Text>
            </View>
            <View style={styles.item}>
                <SearchText handleInputChange={handleInputSearch}
                    value={valueSearch}
                    placeholderText="Tìm kiếm">
                </SearchText>
                <Text style={styles.text}>{textSearch}</Text>
            </View>

            <FlatList
                data={sortedFilteredArticles}
                renderItem={({ item }) => renderArticle({ item })}
                keyExtractor={item => item.id}
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
        paddingVertical: 10,
    },
    btn: {
        padding: 5,
        paddingLeft: 10,
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
    backIcon: {
        marginRight: 'auto',
        marginLeft: -10,
        marginTop: -10,
    },

});

export default ManagerNews;
