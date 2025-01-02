const express = require('express');
const mongoose = require('mongoose');
const queryParser = require('express-query-parser');
const cors = require('cors');
const userRoutes = require('./userRoutes'); // Adjust the path as necessary

const app = express();
const port = process.env.PORT || 3000;
const mongoUri = 'mongodb+srv://work-hive-mahesh:hQdgc252Tlklbg1z@cluster0.axb8jg2.mongodb.net/work-hive?retryWrites=true&w=majority';

// Middleware
app.use(express.json());
app.use(cors());
app.use(queryParser({
  parseNull: true,
  parseBoolean: true
}));

// Connect to MongoDB
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('MongoDB connected'))
.catch((err: any) => console.error('MongoDB connection error:', err));

// Use user routes
app.use('/api', userRoutes);

// Define a simple route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});