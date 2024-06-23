// index.js
const PORT = process.env.PORT || 3000;
const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const cors = require('cors'); // Import cors
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());


app.listen(PORT, () => {
    console.log(`Running on port ${PORT}.`);
});

app.get('/', (req, res) => {
    res.send(`Hello From API2`);
});





const jwtSecretKey = 'your_secret_key';

const users = [
    { id: 1, email: 'abiymw17@gmail.com', password: 'Abbpam.12e',username:'abiyaddis'}
];

// POST /api/authenticate endpoint
app.post('/api/authenticate', (req, res) => {
    const { email, password } = req.body;

    // Find user by credentials
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
        return res.json({ success: false, message: 'Invalid username and/or password' });
    }

    // Generate JWT token
    const token = jwt.sign({ sub: user.id, email: user.email,username:user.username}, jwtSecretKey, { expiresIn: '1d' });

    // Return token
    res.status(200).json({ success: true, token });
});
