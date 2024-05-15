const nodemailer= require('nodemailer')
const secrets=require('C:/Users/sam05/OneDrive/Desktop/CODE/github-repositorys/raymarching/secwets.json')
let transporter2 = nodemailer.createTransport({
    service: 'gmail',
    auth: secrets
});
var fs = require('fs'); //File System
var audioFilePath = 'C:/Users/sam05/OneDrive/Desktop/CODE/github-repositorys/raymarching/ims'; //Location of recorded audio files
    var audioFile = fs.readdirSync(audioFilePath)
        .slice(-1)[0]
console.log(audioFile)
let mop2 = {
    from: '3tau6pi@gmail.com',
    to: 'sam0.5pennys@gmail.com',
    subject: 'Render Finished',
    html: '',
    attachments:[{filename:'Render.jpg',path:'C:/Users/sam05/OneDrive/Desktop/CODE/github-repositorys/raymarching/ims'+audioFile}]
};
transporter2.sendMail(mop2, function(err, data) {
    if (err) {
      console.log("Error " + err);
    } else {
      console.log("Email sent successfully");
    }
});