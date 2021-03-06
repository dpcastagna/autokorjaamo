//const bcrypt = require('bcrypt')
const categorysRouter = require('express').Router()
//const Car = require('../models/car')
const Category = require('../models/category')

categorysRouter.post('/', async (request, response) => {
  const { name, number, color } = request.body

  const existingCategory = await Category.findOne({ number })
  if (existingCategory) {
    return response.status(400).json({
      error: 'category number must be unique'
    })
  }

  //const saltRounds = 10
  //const passwordHash = await bcrypt.hash(password, saltRounds)

  const category = new Category({
    name,
    number,
    color,
  })

  const savedCategory = await category.save()

  response.status(201).json(savedCategory)
})

categorysRouter.get('/', async (request, response) => {
    const categorys = await Category
      .find({})
      //.populate('cars', { registration: 1, model: 1, jobs: 1, id: 1 })
    response.json(categorys)
})

categorysRouter.put('/:id', async (request, response) => {
  const body = request.body

  const category = {
      name: body.name,
      number: body.number,
      color: body.color,
  }

  const updatedCategory = await Category.findByIdAndUpdate(request.params.id, category, { new: true })

  response.json(updatedCategory)
})

module.exports = categorysRouter