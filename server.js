require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); 
const app = express();


const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};



const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

app.use(cors({
  
  origin: ['http://127.0.0.1:5500', 'https://your-live-website-url.com'], 
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'] 
}));
app.use(express.json());



const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI)
    .then(() => console.log('✅ Connected to i30 MongoDB Cluster'))
    .catch(err => console.error('❌ Connection error:', err));


const serviceSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    serviceDate: String,
    currentMiles: String,
    oilMiles: String,
    airMiles: String,
    brakeMiles: String,
    coolingMiles: String,
    sparkMiles: String,
    fuelMiles: String,
    suspMiles: String,
    note1: String,
    note2: String,
    fireDate: String,
    createdAt: { type: Date, default: Date.now }
});

const ServiceRecord = mongoose.model('ServiceRecord', serviceSchema);

app.post('/api/register', async (req, res) => {
    const { email, password } = req.body;
    try {
        // Hash the password so it's not readable in the database
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            email: email,
            password: hashedPassword
        });

        await newUser.save();
        res.status(201).json({ message: "User created successfully!" });
    } catch (err) {
        res.status(500).json({ error: "Could not create user. Email might already exist." });
    }
});

app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: "Invalid password" });

        // Generate the token (the badge)
        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1d' });
        res.json({ token, message: "Login successful!" });
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

//salva a rota
app.post('/api/save-service', authenticateToken, async (req, res) => {
    try {
        const result = await ServiceRecord.findOneAndUpdate(
            { userId: req.user.userId }, 
            { $set: req.body }, 
            { new: true, upsert: true }
        );
        
        res.status(200).send({ message: 'Dashboard updated successfully!' });
    } catch (err) {
        console.error("Save error:", err);
        res.status(500).send({ error: 'Failed to update record' });
    }
});

//pegar ultimo servicerec
app.get('/api/get-latest', authenticateToken, async (req, res) => {
    try {
        const latestRecord = await ServiceRecord.findOne({ userId: req.user.userId }).sort({ createdAt: -1 });
        res.status(200).json(latestRecord || {});
    } catch (err) {
        res.status(500).json({ error: "Error" });
    }
});


//starta o servidor!
const PORT = process.env.PORT || 3000; 
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});