const express = require('express');
const app = express();

app.get('/hello-world', (req, res) => {
    res.send('hello world');
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
