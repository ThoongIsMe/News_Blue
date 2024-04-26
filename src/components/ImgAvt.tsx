// CircularImageIcon.tsx
import * as React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface CircularImageIconProps {
    imageSource: any;
    navigateToTab: string; // Define the prop type as a string
}

const CircularImageIcon: React.FC<CircularImageIconProps> = ({ imageSource, navigateToTab }: CircularImageIconProps) => {
    const navigation = useNavigation();

    const handlePress = () => {
        // Navigate to the desired tab when the circular image icon is pressed
        navigation.navigate(navigateToTab);
    };

    return (
        <TouchableOpacity onPress={handlePress}>
            <Image
                source={imageSource}
                style={{ width: 34, height: 34, borderRadius: 17, marginRight: 10 }}
            />
        </TouchableOpacity>
    );
};

export default CircularImageIcon;
