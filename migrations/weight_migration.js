// migrations for errors in the data base 

const mongoose = require('mongoose');
const Student = require('../server/models/Student'); 

async function migrateIncialToInitial() {
    try {
        const students = await Student.find();

        for (const student of students) {
            // Correct the field name from initialWeight to inicialWeight
            student.initialWeight = student.inicialWeight;
            await student.save();
        }

        console.log('Migration successful!');
    } catch (error) {
        console.error('Migration failed:', error);
    } finally {
        mongoose.connection.close();
    }
}

// Use the MONGODB_URI environment variable
const mongodbUri = process.env.MONGODB_URI;

mongoose.connect(mongodbUri, { useNewUrlParser: true, useUnifiedTopology: true });

// migrateIncialToInitial();
