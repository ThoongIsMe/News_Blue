import nodemailer from 'nodemailer';

/**
 * A utility class for sending random code via email
 */
export async function sendRandomCode(email: string, pass: string) {
    const subject = "Your pass";
    const message = `Your pass is: ${pass}`;

    try {
        await sendEmail(email, subject, message);
    } catch (error) {
        console.error("Failed to send email:", error);
        throw error;
    }
}

export async function sendEmail(to: string, subject: string, message: string) {
    // Replace these with your email provider's details
    const from = "thongdzpro100@gmail.com";
    const password = "xjvl ltdd lrbw kpjg";
    const host = "smtp.gmail.com";

    try {
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: host,
            port: 587, // Update this if your email provider uses a different port
            secure: false, // true for 465, false for other ports
            auth: {
                user: from,
                pass: password,
            },
            tls: {
                ciphers: 'TLSv1.2',
            },
        });

        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: `"${from}" <${from}>`, // sender address
            to: to, // list of receivers
            subject: subject, // Subject line
            text: message, // plain text body
        });

        console.log("Message sent: %s", info.messageId);
    } catch (error) {
        console.error("Failed to send email:", error);
        throw error;
    }
}
