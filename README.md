download the above example
And run npm install, which will install all your dependency
and then run node app.js




Nodemailer
Nodemailer

Nodemailer is a module for Node.js applications to allow easy as cake email sending. The project got started back in 2010 when there was no sane option to send email messages, today it is the solution most Node.js users turn to by default.

Nodemailer is licensed under MIT license. See license details in the License page. If you are upgrading from Nodemailer v2 or older, then see the light migration guide here.

npm install nodemailer --save

Support Nodemailer

You can support Nodemailer by becoming either an OpenCollective sponsor, a patreon or by making a donation via PayPal, see License page for details.
Nodemailer features

    A single module with zero dependencies – code is easily auditable, as there are no dark corners
    Heavy focus on security, no-one likes RCE vulnerabilities
    Unicode support to use any characters, including emoji 💪
    Windows support – you can install it with npm on Windows just like any other module, there are no compiled dependencies. Use it hassle free from Azure or from your Windows box
    Use HTML content, as well as plain text alternative
    Add Attachments to messages
    Embedded image attachments for HTML content – your design does not get blocked
    Secure email delivery using TLS/STARTTLS
    Different transport methods in addition to the built-in SMTP support
    Sign messages with DKIM
    Custom Plugin support for manipulating messages
    Sane OAuth2 authentication
    Proxies for SMTP connections
    ES6 code – no more unintentional memory leaks, due to hoisted var’s
    Autogenerated email test accounts from Ethereal.email

Requirements

    Node.js v6+. That’s it.

If you are able to run Node.js version 6 or newer, then you can use Nodemailer. There are no platform or resource specific requirements.
TL;DR

In short, what you need to do to send messages, would be the following:

    Create a Nodemailer transporter using either SMTP or some other transport mechanism
    Set up message options (who sends what to whom)
    Deliver the message object using the sendMail() method of your previously created transporter

Not Able to send Mail using transport ?

If createTransport function is not taking up the path which is ‘/usr/bin/sendMail’, make sure you have sendmail configured in your system. Take a look at Source (for linux/unix).
Example

This is a complete example to send an email with plain text and HTML body

'use strict';
const nodemailer = require('nodemailer');

// Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing
nodemailer.createTestAccount((err, account) => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: account.user, // generated ethereal user
            pass: account.pass // generated ethereal password
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"Fred Foo 👻" <foo@example.com>', // sender address
        to: 'bar@example.com, baz@example.com', // list of receivers
        subject: 'Hello ✔', // Subject line
        text: 'Hello world?', // plain text body
        html: '<b>Hello world?</b>' // html body
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
    });
});

Examples

    Nodemailer AMQP example is an example of using RabbitMQ to manage Nodemailer email messages. Source.

Output of the the example script as shown by the Ethereal mail catching service:

Nodemailer is created by Andris Reinman. The Nodemailer logo was designed by Sven Kristjansen