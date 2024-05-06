/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/jsx-no-undef */
import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import Color from '../constants/Colors'
import Container from './Container';

interface SearchTextProps {
    handleInputChange?: (text: string) => void;
    value: string; // Add value prop here
    placeholderText?: string;
    secureTextEntry?: boolean;

}

function SearchText({ handleInputChange, value, placeholderText, secureTextEntry = false }: SearchTextProps): React.ReactElement {
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.textInput}
                onChangeText={handleInputChange}
                value={value}
                placeholder={placeholderText}
                secureTextEntry={secureTextEntry}

            />
        </View>
    );
}



const styles = StyleSheet.create({
    container: {
        width: 360,
    },
    textInput: {
        height: 45,
        borderColor: Color.ui_blue_10,
        borderWidth: 1,
        borderRadius: 20,
        fontSize: 16,
        padding: 10,

    }

});

export default SearchText;
