const nodemailer = require("nodemailer");

export async function sendMail(email, pass) {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com", // SMTP server address (usually mail.your-domain.com)
        port: 465, // Port for SMTP (usually 465)
        secure: true, // Usually true if connecting to port 465
        auth: {
            user: "thongdzpro100@gmail.com", // Your email address
            pass: "xjvl ltdd lrbw kpjg", // Password (for gmail, your app password)
        },
    });

    let info = await transporter.sendMail({
        from: '"Admin" <thongdzpro100@gmail.com>',
        to: email,
        subject: "PassWork",
        html: `
    <h1>passwork :${pass}</h1>
    
    `,
    });

}

// sendMail("thongdzpro100@gmail.com", "mật_khẩu_cần_gửi");


export default sendMail;