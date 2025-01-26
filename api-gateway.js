const express = require('express');
const httpProxy = require('http-proxy');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const proxy = httpProxy.createProxyServer();
const JWT_SECRETE = process.env.JWT_SECRETE;

const port = 3000;

app.get("/", (req, res) => {
    console.log("Api gateway server is running");
    return res.status(200).send('Api gateway server is on now');
});

function authValidation(req, res, next) {
    const token = req.headers['authentication'];
    // const token = header && header.split(' ')[1];

    if (token == null) return res.status(401).json("Token is missing in header");
    jwt.verify(token, JWT_SECRETE, (err, user) => {
        if (err) res.status(403).json('Invalid creadetials!');
        req.user = user;
        next();
    })
};

function authRole(role) {
    return (req, res, next) => {
        if (req.user.role !== role) {
            return res.status(403).json('Unauthorized')
        }
        next();
    }
};

app.use('/orders', authValidation, authRole('user'), (req, res) => {
    proxy.web(req, res, { target: 'http://localhost:3001/orders' });
});

app.use('/products', authValidation, authRole('admin'), (req, res) => {
    proxy.web(req, res, { target: 'http://localhost:3002/products' });
});

app.use('/login', (req, res) => {
    proxy.web(req, res, { target: 'http://localhost:3003/login' });
});

app.listen(port, () => {
    console.log("Api gateway server is running on port :", port);
});