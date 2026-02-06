const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors()); // Critical so Frontend Port 5173 can talk to Backend Port 8000
app.use(express.json());

// 1. Import your Routes from the folders shown in your sidebar
const authRoutes = require('./src/routes/authRoutes');
const jobRoutes = require('./src/routes/jobRoutes');
const appRoutes = require('./src/routes/appRoutes');
const profileRoutes = require('./src/routes/profileRoutes');

// 2. Link the routes
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/applications', appRoutes);
app.use('/api/profile', profileRoutes);

app.get('/', (req, res) => {
  res.send('HireStream Server is Running!');
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});