const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        console.log('MONGO_URI:', 'mongodb+srv://raslen:warghui110@crud.ymojaah.mongodb.net/?retryWrites=true&w=majority'); // Add this line for debugging
        const conn = await mongoose.connect('mongodb+srv://raslen:warghui110@crud.ymojaah.mongodb.net/?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log(`MONGODB Connected ${conn.connection.host}`);
    } catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit();
    }
};

module.exports = connectDB;
