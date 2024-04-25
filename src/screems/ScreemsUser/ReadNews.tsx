import React from 'react';
import { View, Text } from 'react-native';

const ReadNews = ({ route }: any) => {
    const { article } = route.params;

    if (!article) {
        return <Text>Loading...</Text>;
    }

    return (
        <View>
            <Text>Title: {article.title}</Text>
            <Text>Author: {article.author}</Text>
            {/* Display other article details */}
        </View>
    );
};

export default ReadNews;