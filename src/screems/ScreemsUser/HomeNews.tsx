import React, { useEffect, useState } from 'react';
import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Color from '../../constants/Colors';
import Container from '../../components/Container';
import { getNewsFromApiAsync, getCategoriesFromApiAsync } from '../../helper/api';
import CardNews from '../../components/CardNews';
import FormatTimeAgo from '../../constants/time';
import Header from '../../components/Header';

import { useDispatch, useSelector } from 'react-redux';

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

function HomeNews({ navigation }: any): React.JSX.Element {
    const [pressedIndex, setPressedIndex] = useState<number>(0); // Default selected index is 0 (All)
    const [categories, setCategories] = useState<Category[]>([{ id: '0', name: 'All' }]); // Default category "All"
    const [articles, setArticles] = useState<Article[]>([]);

    const info = useSelector((state: any) => state.personalInfo);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const categoriesData = await getCategoriesFromApiAsync();
                setCategories([{ id: '0', name: 'All' }, ...categoriesData]); // Prepend "All" category to fetched categories
            } catch (error) {
                console.error(error);
            }

        };

        console.log("Info", info);
        fetchData();
    }, [info]);


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
    };

    const handleArticleOnPress = (article: Article) => {
        navigation.navigate("ReadNews", { article }); // Pass articleId as part of route params
    };

    const renderArticle = ({ item }: { item: Article }) => {
        return (
            <CardNews
                onPress={() => handleArticleOnPress(item)}
                onClickTouchable={() => handleArticlePress(item.id)}
                onClickTouchableDelete={() => handleArticlePress(item.id)}
                time={FormatTimeAgo(item.publishedAt)}
                img={item.urlToImage}
                user={1}
                bool={false}
            >
                {item.title}
            </CardNews>
        );
    };

    const filteredArticles = pressedIndex === 0 ? articles : articles.filter(article => article.id_category === categories[pressedIndex].id);
    return (

        <Container>
            <Header />
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
                data={filteredArticles}
                renderItem={renderArticle}
                keyExtractor={item => item.id} // Assuming each article has a unique id
                showsVerticalScrollIndicator={false}
            />


        </Container>
    );
}

const styles = StyleSheet.create({
    item: {
        width: 80,
        marginRight: 10,
        backgroundColor: Color.ui_white_10,
        paddingHorizontal: 10,
        marginBottom: 10,
        paddingTop: 10
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




