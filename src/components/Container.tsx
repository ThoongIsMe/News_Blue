import React from 'react';
import { View, StyleSheet } from 'react-native';

interface Container {
    children: React.ReactNode;
}
const Container = ({ children }: Container) => {
    return (
        <View style={styles.container}>
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 18,
        flex: 1,
        backgroundColor: '#fff',
    },
});

export default Container;
