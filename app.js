const express = require('express');
const bodyParser = require('body-parser')
const exphbs = require('express-handlebars');
const path = require('path');
const nodemailer = require('nodemailer');


const app = express();

//view engine
app.engine('handlebars',exphbs());
app.set('view engine','handlebars');


//static folder
app.use('/public', express.static(path.join(__dirname, 'public')));
//body parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.get('/',(req,res ) => {
    res.render('contact')
});


app.post('/send',(req,res) =>{
    const ouput =`
    <p>you gotta new request</p>
    <h3>Contact details</h3>
    <ul>
       <li>Name:${req.body.name}</li>
       <li>Company:${req.body.company}</li>
       <li>Email:${req.body.email}</li>
       <li>Phone:${req.body.phone}</li>
       <h3>Message</h3>
       <p>${req.body.message}</p>
    </ul>
    `;

     // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            //user: account.user, //generated ethereal user  vcxcxgjwyvq4rgbb@ethereal.email
            user: 'vcxcxgjwyvq4rgbb@ethereal.email',
            //pass: account.pass // generated ethereal password  1fVatNCnqqwr2FCVHK
            pass: '1fVatNCnqqwr2FCVHK'
        },
        tls:{
            rejectUnauthorized:false
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"Nodemail👻" <vcxcxgjwyvq4rgbb@ethereal.email>', // sender address
        to: 'test@gmail.com', // list of receivers
        subject: 'Message test', // Subject line
        text: 'hello dude', // plain text body
        html: ouput // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

        res.render('contact',{msg:'Email has been sent'});
    });
});


app.listen(4000, ()=>{
 console.log("port started at 4000");
 
});

