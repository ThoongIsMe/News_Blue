import React from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import Color from '../constants/index'

interface PrimaryButtonProps {
    children: React.ReactNode;
    onPress: () => void;
    color: string;
    height: number;
    width: number;
    borderRadius: number;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ children, onPress, color, height, width, borderRadius }) => {
    return (
        <View style={styles.btnInputOuters}>
            <TouchableOpacity
                style={[
                    styles.btnInputIners,
                    { backgroundColor: color, height: height, width: width, borderRadius: borderRadius }
                ]}
                onPress={onPress}
                activeOpacity={0.5} >
                <Text style={styles.textInput}>{children}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    btnInputOuters: {
        overflow: 'hidden',
        //borderRadius: 20,
        margin: 5,
    },
    btnInputIners: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    textInput: {
        fontWeight: "bold",
        fontSize: 20,
        color: Color.ui_white_10,
    }
});

export default PrimaryButton;
