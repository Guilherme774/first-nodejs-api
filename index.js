const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

const personRoutes = require('./routes/person-routes');

const DB_USER = process.env.DB_USER;
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD);

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.use('/person', personRoutes);

app.get('/', (req, res) => {
    res.json({message: 'Api is Running'});
})


mongoose.connect(`PASTE_YOUR_MONGO_STRING_CONNECTION_HERE`)
.then(() => {
    app.listen(3000, () => {
        console.log('\n[#] Database Connected');
        console.log('[#] Server running at https://localhost:3000');
    });
})
.catch((error) => {
    console.log(error);
})