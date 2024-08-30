const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserModel = require('./models/users'); // Updated the path
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

// User Registration
app.post('/register', async (req, res) => {
    const { name, number, email, password, address } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new UserModel({ name, number, email, password: hashedPassword, address });

        // Check for existing user by email
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).send("User with this email already exists.");
        }

        await newUser.save();
        res.status(201).json(newUser);
    } catch (err) {
        console.error('Error during registration:', err);
        res.status(500).send("Error during registration");
    }
});

// Login route
app.post('/login', (req, res) => {
    const { email, password, address } = req.body;

    UserModel.findOne({ email })
        .then(user => {
            if (!user) {
                return res.status(404).send("User Not Exists");
            }

            bcrypt.compare(password, user.password, (err, match) => {
                if (err) {
                    console.error('Error comparing passwords:', err);
                    return res.status(500).send("Error during login");
                }

                if (!match) {
                    return res.status(401).send("Invalid Password");
                }

                if (user.address !== address) {
                    return res.status(401).send("Invalid Address");
                }

                // If login is successful, return a success message
                res.status(200).json({ message: "Login Successful" });
            });
        })
        .catch(err => {
            console.error('Error during login:', err);
            res.status(500).send("Error during login");
        });
});

// Start the server
app.listen(3001, () => {
    console.log("Server is running on port 3001");
});
