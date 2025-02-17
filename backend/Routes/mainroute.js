const express = require('express');
const route = express.Router()
const User=require('../model/user')
const nodemailer = require("nodemailer");
require('dotenv').config();


const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com", // hostname
    auth: {
      user: `${process.env.EMAIL}`,
      pass: `${process.env.PASS}`,
    },
  });

  route.post('/', (req, res) => {
    console.log('Request Body:', req.body); // Log the request body
    let register = new User(req.body);
    register.save()
        .then(docs => {
            console.log('User saved:', docs); // Log successful save
            const mailOptions = {
                from: process.env.EMAIL,
                to: req.body.email,
                subject: `New booking from ${req.body.source} to ${req.body.destination}`,
                html: `
                    <div style="padding:10px; border-style: ridge">
                    <p>New booking from ${req.body.source} to ${req.body.destination} has been booked succesfully.</p> 
                    <p>The minimum time required to reach from ${req.body.source} to ${req.body.destination} is - ${req.body.time} minuites.</p>
                    <p>The Price you have to pay is - Rs.${req.body.price}.</p>
                    <p>Thank you for choosing our services</p>
                    <p>Email: ${req.body.email}</p>
                    </div>
                    `,
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error('Email Error:', error); // Log email error
                    res.status(500).send({ error: 'Failed to send email' });
                } else {
                    console.log('Email Sent:', info.response); // Log email success
                    res.status(200).send({ message: `Successfully Booked your Ride: ${docs}` });
                }
            });
        })
        .catch(err => {
            console.error('Database Error:', err); // Log database error
            res.status(500).send({ error: err.message });
        });
});

module.exports=route