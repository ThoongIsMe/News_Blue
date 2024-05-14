/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Color from '../../constants/Colors'
import LottieView from 'lottie-react-native';
import { useSelector, useDispatch } from 'react-redux';

function load(): React.ReactElement {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const checkLoad = useSelector((state: any) => state.checkInfo);
    console.log(checkLoad);
    return (
        <View style={[styles.lotte, StyleSheet.absoluteFillObject]}>
            <LottieView style={styles.loading} source={require('../../assets/icon/loading1.json')} autoPlay loop />
        </View>

    );
}

const styles = StyleSheet.create({
    lotte: {
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: Color.ui_grey_10,
        zIndex: 1,
        paddingLeft: 103,
    }, loading: {
        width: 200,
        height: 200,
    },
});

export default load;
