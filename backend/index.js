const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRouter = require('./Routes/AuthRouter');
const ProductRouter = require('./Routes/ProductRouter');
const route = require('./Routes/mainroute');
const app = express();

// app.use(cors(
//     {
//         origin: 'https://auth-mern-1-ui.vercel.app', // Your frontend URL
//         methods: ['GET', 'POST'],   // Allowed methods
//         credentials: true,
//     },
//     {
//         origin: 'http://localhost:3000', // Your frontend URL
//         methods: ['GET', 'POST'],   // Allowed methods
//         credentials: true,
//     }
// ));

app.use(cors());

app.use(express.json())


require('dotenv').config();
require('./Models/db');
const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
    res.json("Hello");
});

app.use(bodyParser.json());
app.use('/auth', AuthRouter);
app.use('/products', ProductRouter);
app.use('/', route)


app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})

