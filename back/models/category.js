const mongoose = require('mongoose')

const categorySchema = mongoose.Schema({
  name: String,
  number: Number,
  color: String,
})

categorySchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Category = mongoose.model('Category', categorySchema)

module.exports = Category