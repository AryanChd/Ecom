import nodemailer from 'nodemailer'

const sendMail = async (email, otp) => {

    const transporter = nodemailer.createTransport({

        service: 'gmail',
        auth: {
            user: "chaudharyaryancr7@gmail.com",
            pass: "vatyytaesflvjvam"
        },
    });



    const info = await transporter.sendMail({
        from: `"Aryan" <chaudharyaryancr7@gmail.com>`,
        to: email,
        subject: "Hello ✔",
        text: `Your otp is : ${otp}`,
        html: `<b>Hello world? your otp is : ${otp}</b>`, // HTML body
    });


}



export {sendMail};