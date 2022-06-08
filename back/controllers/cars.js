const carsRouter = require('express').Router()
const Car = require('../models/car')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

carsRouter.get('/', async (request, response) => {
  const cars = await Car
    .find({}).populate('user', { username: 1, name: 1, id: 1 })
  response.json(cars)
})

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

carsRouter.post('/', async (request, response, next) => {
  const body = request.body
  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)

  const car = new Car({
    registration: body.registration,
    model: body.model,
    user: user._id,
  })
  
  const savedCar = await car.save()
  console.log(savedCar)
  user.cars = user.cars.concat(savedCar._id)
  await user.save()

  response.json(savedCar)
})

carsRouter.delete('/:id', async (request, response) => {
  await Car.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

carsRouter.put('/:id', async (request, response, next) => {
  const body = request.body
  
  const car = {
    registration: body.registration,
    model: body.model,
    user: body.user,
  }

  const updatedCar = await Car.findByIdAndUpdate(request.params.id, car, { new: true })
  
  response.json(updatedCar)
})

module.exports = carsRouter
