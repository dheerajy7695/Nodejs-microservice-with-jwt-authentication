const express = require('express');
const app = express();

const port = process.env.port || 3001;

app.get('/orders', (req, res) => {
    res.json([
        { id: 1001, quantity: 22, product: "Mobile" },
        { id: 1002, quantity: 11, product: "Tabs" }
    ])
});

app.listen(port, () => {
    console.log('Order server is running on port -', port);
});