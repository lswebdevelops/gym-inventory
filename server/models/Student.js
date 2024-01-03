const mongoose = require('mongoose')

const Schema = mongoose.Schema
const StudentSchema = new Schema({
    name: { 
        type: String, 
        required: true,   
        unique: true,    

    }, 
    username: { 
        type: String, 
        required: true,
        unique: true, 
    }, 
    details: {
        type: String, 
        required: false,
    },
    age: {
        type: Number,
        required: false,

    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
        required: true,
    },
    inicialWeight: {
        type: Number, 
        required: true,
    },
    currentWeight: {
        type: Number, 
        required: false,
    },
    applyedToSchoolAt: {
        type: Date, 
        required: true,
    },
    height: {
        type: Number, 
        required: false,
    },
    lastPaymentDate: {
        type: Date,
        required: false,
    },
    isPaymentReceived: {
        type: Boolean,
        default: false,
        required: true,
    },
    attendanceDays: {
        type: [String], // An array of strings representing days of the week (e.g., ['Monday', 'Wednesday', 'Friday'])
        required: true,
    },
    points: {
        type: Number,
        default: 0, // Initial points set to 0
        required: true,
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
    
})

module.exports = mongoose.model('Student', StudentSchema);