const nodeMailer = require('nodemailer');
const cloudinary = require('cloudinary').v2

cloudinary.config({ 
    cloud_name: 'dlqjbnrqk', 
    api_key: '792375176357873', 
    api_secret: '7MhD3CtCTt2h_dSPdHmbZglqEOQ' 
  });

module.exports = {
    otp: ()=>{
            let randomNumber =Math.random();
            let sixDigit= Math.floor(randomNumber*100000)+100000;
            return sixDigit;
    },
    sendMail: async (email, subject, text) => {
        try {
            let transporter = nodeMailer.createTransport({
                service: "gmail",
                port: 587,
                secure: false,
                auth: {
                    user: "ranjeet.2023mca1107@kiet.edu",
                    pass: "Ranjeet@0123",
                },
            });
            let options = {
                from: "ranjeet.2023mca1107@kiet.edu",
                to: email,
                subject: subject,
                text: text,
            }
            return await transporter.sendMail(options)
        } catch (error) {
            return res.send({ responseCode: 501, responseMessage: "Something went wrong !", responseResult: error.message })
        }
    },
    uploadImage: async (image) => {
        try {
            let upload = await cloudinary.uploader.upload(image);
            return upload.secure_url;
        } catch (error) {
            return res.send({ responseCode: 501, responseMessage: "Something went wrong !", responseResult: error });
        }
    },
    generatedSNo(count){
        var str =""+count
        var pad ="00001" 
        var ans= pad.substring(0,pad.length-str.length)+str
        return ans;
    }   
}
