const jobsRouter = require('express').Router()
const Car = require('../models/car')
const Job = require('../models/job')
const User = require('../models/user')
//const jwt = require('jsonwebtoken')

jobsRouter.get('/', async (request, response) => {
    const jobs = await Job
      .find({}).populate('car', { registration: 1, model: 1, status: 1, id: 1 })
    response.json(jobs)
})

/*const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      return authorization.substring(7)
    }
    return null
}*/
  
jobsRouter.post('/', async (request, response, next) => {
    const body = request.body
    /*const token = getTokenFrom(request)
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }*/
    const car = await Car.findById(body.id)
    console.log('bodyssa', body)
    const job = new Job({
        name: body.name,
        time: body.time,
        status: body.status,
        car: body.id,
    })

    const savedJob = await job.save()
    console.log('saveJob', savedJob)
    car.jobs = car.jobs.concat(savedJob._id)
    await car.save()

    response.json(savedJob)
})
  
jobsRouter.delete('/:id', async (request, response) => {
    await Job.findByIdAndRemove(request.params.id)
    response.status(204).end()
})

jobsRouter.put('/:id', async (request, response, next) => {
    const body = request.body

    const job = {
        name: body.name,
        time: body.time,
        status: body.status,
        car: body.id,
    }

    const updatedJob = await Job.findByIdAndUpdate(request.params.id, job, { new: true })

    response.json(updatedJob)
})

module.exports = jobsRouter