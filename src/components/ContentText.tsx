/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/jsx-no-undef */
import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import Color from '../constants/Colors'
import Container from './Container';

interface InputTextProps {
    children: React.ReactNode;
    handleInputChange?: (text: string) => void;
    value: string; // Add value prop here
    placeholderText?: string;
    secureTextEntry?: boolean;
}

function InputText({ children, handleInputChange, value, placeholderText, secureTextEntry = false }: InputTextProps): React.ReactElement {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{children}</Text>
            <TextInput
                multiline
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
        marginTop: 20,
    },
    title: {
        color: Color.ui_grey_20,
        fontWeight: "bold",
        fontSize: 16,
    },
    textInput: {
        height: 45,
        borderColor: Color.ui_grey_20,
        borderBottomWidth: 1,
        fontSize: 16,
    }

});

export default InputText;
