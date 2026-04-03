const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());

const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/unievents'; 

mongoose.connect(mongoURI)
    .then(() => console.log('Connected to Database'))
    .catch(err => console.log(err));

app.use('/api/events', require('./routes/eventRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));

app.use(express.static(path.join(__dirname, '../frontend')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;