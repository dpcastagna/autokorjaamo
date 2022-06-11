const mongoose = require('mongoose')

const carSchema = mongoose.Schema({
  registration: String,
  model: String,
  status: String,
  jobs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job'
    }
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
})

carSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Car = mongoose.model('Car', carSchema)

module.exports = Car