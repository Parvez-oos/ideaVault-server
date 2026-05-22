const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Route Imports
const authRoutes = require('./routes/authRoutes');
const ideaRoutes = require('./routes/ideaRoutes');
const commentRoutes = require('./routes/commentRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// 🛡️ BULLETPROOF CORS CONFIGURATION 🛡️
app.use(cors({
    origin: [
        'http://localhost:3000', 
        'https://idea-vault-client-kappa.vercel.app'
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Database Connection
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/ideas', ideaRoutes);
app.use('/api/comments', commentRoutes);

app.get('/', (req, res) => {
    res.send('IdeaVault Server is Running 🚀');
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});