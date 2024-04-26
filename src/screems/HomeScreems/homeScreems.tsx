/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Color from '../../constants/Colors'


function homeScreems(): React.ReactElement {
    return (
        <View style={styles.container}>
            <Image
                source={require('../../assets/images/logoNews.jpg')}
                style={styles.imgOver}
            />
            <Text style={styles.title}>All type of news from all trusted sources for all
                type of people
            </Text>
        </View>

    );
}

const styles = StyleSheet.create({

    container: {
        marginTop: 200,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        marginVertical: 20,
        width: 310,
        color: Color.ui_black_10,
        textAlign: 'center',
        fontSize: 16,
    },
    imgOver: {
        width: 220,
        height: 220,
    },
});

export default homeScreems;
