const express = require('express');
const app = express();

const port = process.env.port || 3002;

app.get('/products', (req, res) => {
    res.json([
        { id: 1001, quantity: 2, product: "Shooes", size: [5, 6, 7] },
        { id: 1002, quantity: 20, product: "Shorts", size: [S, M, L, XL] }
    ])
});

app.listen(port, () => {
    console.log('Product server is running on port -', port);
});