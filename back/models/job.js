const mongoose = require('mongoose')

const jobSchema = mongoose.Schema({
  name: String,
  time: String,
  status: Boolean,
  car: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Car'
  },
  
})

jobSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Job = mongoose.model('Job', jobSchema)

module.exports = Job