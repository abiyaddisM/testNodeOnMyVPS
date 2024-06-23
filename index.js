const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors'); // Import cors

const app = express();
const port = 3000;

// Middleware to enable CORS
app.use(cors());

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Secret key for JWT
const jwtSecretKey = 'your_secret_key';

// Mock user credentials (replace with your actual authentication logic)
const users = [
    { id: 1, email: 'user1@example.com', password: 'password1' },
    { id: 2, email: 'user2@example.com', password: 'password2' },
    { id: 2, email: 'a', password: 'a' }
];

// POST /api/authenticate endpoint
app.post('/api/authenticate', (req, res) => {
    console.log("Just got a request Hooooooooooo22")

    const { email, password } = req.body;

    // Find user by credentials
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
        return res.json({ success: false, message: 'Invalid username and/or password' });
    }

    // Generate JWT token
    const token = jwt.sign({ sub: user.id, email: user.email }, jwtSecretKey, { expiresIn: '1d' });

    // Return token
    res.status(200).json({ success: true, token });
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
