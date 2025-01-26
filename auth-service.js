const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();

const port = process.env.port || 3003;
app.use(express.json());

const JWT_SECRETE = process.env.JWT_SECRETE;

var users = [
    { username: "Alic", password: "123", role: "admin" },
    { username: "Lara", password: "123", role: "user" }
];

app.post("/login", (req, res) => {
    const { username, password } = req.body;

    const user = users.find(data => data.username === username && data.password === password);

    if (user) {
        const token = jwt.sign({ username: user.username, role: user.role }, JWT_SECRETE, { expiresIn: '24h' });
        return res.json({ username: username, token: token });
    }
    return res.status(400).send('Invaild creadentials!');
});

app.listen(port, () => {
    console.log('Auth server is running on port -', port);
});