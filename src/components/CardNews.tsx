import React from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import Color from '../constants/Colors';

interface PrimaryCardProps {
    children: React.ReactNode; // Include children prop
    onPress: () => void;
    onClickTouchable?: () => void;
    onClickTouchableDelete?: () => void;
    time: string;
    bool: boolean;
    img: any;
    user: number;
}

const CardNews: React.FC<PrimaryCardProps> = ({ children, onPress, onClickTouchable, time, img, user, onClickTouchableDelete }) => {
    var iconPath = '../assets/icon/';
    return (
        <View style={styles.Aa}>
            <View style={styles.container}>
                <Pressable style={styles.card} android_ripple={{ color: 'red' }} onPress={onPress} >
                    <View style={styles.cardContent}>
                        <Text numberOfLines={3} style={styles.textContent} >
                            {children}
                        </Text>
                        <View style={styles.cardFooter}>
                            <Text style={styles.textTimestamp}>{time}</Text>
                            {user === 1 && (
                                <TouchableOpacity onPress={onClickTouchable}>
                                    <Image
                                        source={require(iconPath + 'bookmark.png')}
                                        style={styles.icon}
                                    />
                                </TouchableOpacity>
                            )}
                            {user === 2 && (
                                <TouchableOpacity onPress={onClickTouchable}>
                                    <Image
                                        source={require(iconPath + 'bookmar.png')}
                                        style={styles.icon}
                                    />
                                </TouchableOpacity>
                            )}
                            {user === 3 && (
                                <TouchableOpacity onPress={onClickTouchable}>
                                    <Image
                                        source={require(iconPath + 'delete.png')}
                                        style={styles.icon}
                                    />
                                </TouchableOpacity>
                            )}
                            {user === 4 && (
                                <>
                                    <View style={{ flexDirection: 'row' }}>
                                        <TouchableOpacity onPress={onClickTouchable}>
                                            <Image
                                                source={require(iconPath + 'wrench.png')}
                                                style={styles.icon}
                                            />
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={onClickTouchableDelete}>
                                            <Image
                                                source={require(iconPath + 'delete.png')}
                                                style={[styles.icon, { marginLeft: 20 }]}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </>
                            )}
                        </View>
                    </View>
                    {img != '' ? <Image
                        source={{ uri: img }}
                        style={styles.image}
                    /> : ''}
                </Pressable>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    Aa: {
        marginVertical: 15,
    },
    container: {
        marginTop: 10,
    },
    card: {
        flexDirection: 'row-reverse',
        backgroundColor: Color.ui_grey_10,
        height: 105,
        width: "100%",
        borderRadius: 10,
    },
    cardContent: {
        flex: 1,
        padding: 10,
    },
    textContent: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 16,
        color: Color.ui_black_10,
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    textTimestamp: {
        fontSize: 12,
        color: Color.ui_grey_20,
        fontWeight: 'bold',
    },
    image: {
        width: 150,
        height: 100,
        borderRadius: 10,
        marginTop: -10,
    },
    icon: {
        width: 20,
        height: 20,
    }
});

export default CardNews;
