import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Container from '../../components/Container';
import Color from '../../constants/Colors';
import Icon from 'react-native-vector-icons/Ionicons';
import { ScrollView } from 'react-native-gesture-handler';

// Trong ScreemsUser/User.tsx
function Security({ navigation }: any) {

    return (
        <Container>
            <View >
                <TouchableOpacity style={styles.backIcon} onPress={() => navigation.goBack()}>
                    <Icon name="chevron-back" color={Color.ui_blue_10} size={30} />
                </TouchableOpacity>
                <View style={styles.ViewText}>
                    <Text style={styles.Text}>CHÍNH SÁCH BẢO MẬT</Text>
                </View>
                <ScrollView>
                    <Text style={styles.content}>Chào mừng bạn đến với NewsDT! Chúng tôi cam kết bảo vệ thông tin cá nhân của bạn và đảm bảo tính bảo mật của nó. Vui lòng đọc kỹ chính sách bảo mật sau đây để hiểu rõ cách chúng tôi thu thập, sử dụng và bảo vệ thông tin cá nhân của bạn.</Text>
                    <Text style={styles.content}>1. Thông tin thu thập: Chúng tôi có thể thu thập thông tin cá nhân của bạn khi bạn sử dụng ứng dụng NewsDT, bao gồm tên, địa chỉ email, thông tin thiết bị, và thông tin về việc sử dụng ứng dụng.
                    </Text>
                    <Text style={styles.content}>2. Sử dụng thông tin: Thông tin cá nhân của bạn sẽ được sử dụng để cung cấp các dịch vụ và tính năng của ứng dụng NewsDT, cũng như để cải thiện trải nghiệm người dùng và tùy chỉnh nội dung.</Text>
                    <Text style={styles.content}>3. Chia sẻ thông tin: Chúng tôi có thể chia sẻ thông tin cá nhân của bạn với các đối tác tin tức và quảng cáo để cung cấp nội dung và quảng cáo phù hợp.</Text>
                    <Text style={styles.content}>4. Bảo mật: Chúng tôi áp dụng các biện pháp bảo mật thích hợp để bảo vệ thông tin cá nhân của bạn khỏi mất mát, lạc hướng, truy cập trái phép hoặc tiêu cực.
                    </Text>
                    <Text style={styles.content}>
                        5. Quyền lợi của bạn: Bạn có quyền truy cập, chỉnh sửa hoặc xóa thông tin cá nhân của mình bất kỳ lúc nào bằng cách liên hệ với chúng tôi.</Text>
                    <Text style={styles.content}>6. Hay đổi chính sách: Chúng tôi có thể cập nhật chính sách bảo mật này theo thời gian và sẽ thông báo cho bạn về bất kỳ thay đổi nào.
                    </Text>
                    <Text style={styles.content}>Khi sử dụng ứng dụng NewsDT, bạn đồng ý với chính sách bảo mật này. Nếu bạn có bất kỳ câu hỏi hoặc đề xuất nào, vui lòng liên hệ với chúng tôi qua email: DTsupport@newsdt.com.</Text>
                    <Text style={styles.content}>Cảm ơn bạn đã sử dụng NewsDT!</Text>


                </ScrollView>
            </View>
        </Container>
    );
}
const styles = StyleSheet.create({

    content: {
        color: Color.ui_black_10,
        textAlign: 'justify',
        marginHorizontal: 4,
        fontSize: 14,
        paddingVertical: 5,
    },
    ViewText: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    Text: {
        color: Color.ui_blue_10,
        fontWeight: "bold",
        fontSize: 20,
        padding: 10,
    },
    backIcon: {
        marginRight: 'auto',
        marginLeft: -10,
        marginTop: -10,
    },
})
export default Security;