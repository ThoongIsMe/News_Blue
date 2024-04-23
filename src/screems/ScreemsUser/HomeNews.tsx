import React, { useEffect, useState } from 'react';
import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Color from '../../constants/index';
import Container from '../../components/Container';
import { getNewsFromApiAsync, getCategoriesFromApiAsync } from '../../helper/api';
import CardNews from '../../components/CardNews';

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

function HomeNews(): React.JSX.Element {
    const [pressedIndex, setPressedIndex] = useState<number | null>(0); // Default selected index is 0 (All)
    const [categories, setCategories] = useState<Category[]>([{ id: '0', name: 'All' }]); // Default category "All"
    const [articles, setArticles] = useState<Article[]>([]);

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
    }, []);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const articlesData = await getNewsFromApiAsync();
                console.log("Fetched articles:", articlesData);
                setArticles(articlesData);
            } catch (error) {
                console.error("Error fetching articles:", error);
            }
        };

        fetchData();
    }, []);

    console.log("Articles state:", articles);


    const handlePress = (index: number) => {
        setPressedIndex(index);
        // Retrieve the ID of the selected category
        const categoryId = categories[index].id;
        console.log('Selected category ID:', categoryId);
    };

    ////////////////////////////////
    const handleArticlePress = (articleId: string) => {
        // Xử lý khi một bài viết được nhấn
    };

    // Hàm xử lý khi một action được thực hiện trên bài viết (ví dụ: bookmark, delete)


    const renderArticle = ({ item }: { item: Article }) => {
        console.log("Rendering article:", item);
        return (
            <CardNews
                onPress={() => handleArticlePress(item.id)}
                onClickTouchable={() => handleArticlePress(item.id)}
                onClickTouchableDelete={() => handleArticlePress(item.id)}
                time={item.publishedAt}
                img={item.urlToImage}
                user={1}
                bool={false}
            >
                {item.title}
            </CardNews>
        );
    };

    console.log("Articles state:", articles);
    return (
        <Container>
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
                data={articles}
                renderItem={renderArticle}
                keyExtractor={item => item.id} // Assuming each article has a unique id
            />







        </Container>
    );
}

const styles = StyleSheet.create({
    item: {
        width: 80,
        marginRight: 10,
        backgroundColor: Color.ui_white_10,
        padding: 10,
    },
    text: {
        color: Color.ui_black_10,
        fontWeight: 'bold',
        fontSize: 17,
    },
    textPressed: {
        color: Color.ui_blue_10,
    },
    itemPressed: {
        backgroundColor: Color.ui_white_10, // Keep background color unchanged when pressed
    },
});

export default HomeNews;




