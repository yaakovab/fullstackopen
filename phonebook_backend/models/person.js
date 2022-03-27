const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

console.log('connectint to', url)

mongoose.connect(url)
    .then(result => {
        console.log('connected to', url)
    })
    .catch(error => {
        console.log('error connectint to MongoDB:', error.massage)
    })


const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        unique: true,
    },
    number: {
        type: String,
        minlength: 8,
        validate: {
            validator: function (n) {
                return /\d{2}-\d{4}/.test(n)
            },
            message: "Phone number will be only in the format 00-0000* or 000-0000*"
        }
    }
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)
