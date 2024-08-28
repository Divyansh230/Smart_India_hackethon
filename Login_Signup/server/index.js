const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserModel = require('./models/users'); // Updated the path
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/Storage", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Set up nodemailer
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS,
    },
});

// User Registration
app.post('/register', async (req, res) => {
    const { name, number, email, password } = req.body;

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const newUser = new UserModel({ name, number, email, password: hashedPassword });
    
    try {
        await newUser.save();
        res.json(newUser);
    } catch (err) {
        res.status(500).send("Error during registration");
    }
});

// Login route
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    UserModel.findOne({ email })
        .then(user => {
            if (!user) {
                return res.status(404).send("User Not Exists");
            }

            // Compare hashed password
            bcrypt.compare(password, user.password, (err, match) => {
                if (err) {
                    console.error('Error comparing passwords:', err);
                    return res.status(500).send("Error during login");
                }

                if (!match) {
                    return res.status(401).send("Invalid Password");
                }

                // Generate OTP
                const otp = Math.floor(100000 + Math.random() * 900000).toString();
                user.otp = otp;
                user.otpExpires = Date.now() + 10 * 60 * 1000; // OTP expires in 10 minutes

                user.save()
                    .then(() => {
                        // Send OTP via email
                        const mailOptions = {
                            from: process.env.EMAIL_USER,
                            to: email,
                            subject: 'Your OTP Code',
                            text: `Your OTP code is ${otp}. It is valid for 10 minutes.`
                        };
                        console.log(mailOptions);

                        transporter.sendMail(mailOptions, (error) => {
                            if (error) {
                                console.error('Error sending OTP email:', error);
                                return res.status(500).send("Error sending OTP");
                            }
                            res.send("OTP Sent");
                        });
                    })
                    .catch(err => {
                        console.error('Error saving user:', err);
                        res.status(500).send("Error during login");
                    });
            });
        })
        .catch(err => {
            console.error('Error during login:', err);
            res.status(500).send("Error during login");
        });
});

// OTP verification route
app.post('/verify-otp', (req, res) => {
    const { email, otp } = req.body;
    UserModel.findOne({ email })
        .then(user => {
            if (user && user.otp === otp && user.otpExpires > Date.now()) {
                res.send("Success");
            } else {
                res.send("Invalid or Expired OTP");
            }
        })
        .catch(err => res.status(500).send("Error during OTP verification"));
});

// Start the server
app.listen(3001, () => {
    console.log("Server is running on port 3001");
});
