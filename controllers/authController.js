// controllers/authController.js
const jwt = require('jsonwebtoken');

exports.generateToken = (req, res) => {
    try {
        const user = req.body; // Expecting frontend to send { email: 'user@example.com' }
        
        // Basic validation
        if (!user || !user.email) {
            return res.status(400).json({ message: "User email is required to generate token." });
        }

        // Generate JWT token valid for 7 days
        const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '7d' });
        
        // Send token back to the client
        res.status(200).send({ token });
    } catch (error) {
        res.status(500).json({ message: "Error generating token", error: error.message });
    }
};