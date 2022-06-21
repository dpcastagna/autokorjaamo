const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const Car = require('../models/car')
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  const existingUser = await User.findOne({ username })
  if (existingUser) {
    return response.status(400).json({
      error: 'username must be unique'
    })
  }
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

usersRouter.get('/', async (request, response) => {
    const users = await User
      .find({}).populate('cars', { registration: 1, model: 1, jobs: 1, id: 1 })
    response.json(users)
})

module.exports = usersRouter