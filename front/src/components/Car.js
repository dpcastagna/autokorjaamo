import { useState, useEffect, useRef } from 'react'
import carService from '../services/cars'
import Job from './Job'
import jobService from '../services/jobs'
import Togglable from './Togglable'
import JobForm from './JobForm'
import PropTypes from 'prop-types'

const Car = ({ car, user }) => {
  const carStyle = {
    paddingTop: 1,
    paddingLeft: 5,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 1,
  }
  console.log('car', car)
  const [status, setStatus] = useState(car.status)
  const [newStatus, setNewStatus] = useState('')
  const [jobs, setJobs] = useState([])
  const [visible, setVisible] = useState(false)
  //const [likes, setLikes] = useState(blog.likes)
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }
  const sameUser = car.user.name === user.name
  const showRemove = { display: sameUser ? '' : 'none' }
  //console.log("nimi sama", sameUser, visible)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useEffect(() => {
    setJobs(car.jobs)
  }, [])
  console.log('jobit carista', jobs)

  const removeCar = (event) => {
    event.preventDefault()
    if(window.confirm(`Remove car ${car.registration} model ${car.model}`)) {
      carService
        .remove(car.id)
        .then(
          window.location.reload()
        )
    }
  }

  const moveCar = (event) => {
    event.preventDefault()
    setStatus(status + 1)
    console.log(status)
    const carObject = {
      id: car.id,
      jobs: car.jobs,
      model: car.model,
      registration: car.registration,
      user: car.user,
      status: Number(newStatus)
    }
    console.log(carObject)
    carService
      .update(car.id, carObject)
      .then(
        setNewStatus('')
      )
    setStatus(newStatus)
  }

  const handleStatusChange = (event) => {
    setNewStatus(event.target.value)
  }

  const addJob = (jobObject) => {
    jobFormRef.current.toggleVisibility()
    jobService
      .create(jobObject)
      .then(returnedJob => {
        setJobs(jobs.concat(returnedJob))
        /*setErrorMessage(`a new car ${carObject.registration} ${carObject.model} added`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)*/
      })
  }

  const jobFormRef = useRef()

  return (
    <div style={carStyle}>
      <div style={hideWhenVisible}>
        {car.registration} {car.model}<button onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible}>
        {car.registration} {car.model}
        <button onClick={toggleVisibility}>hide</button><br />
        <form onSubmit={moveCar}>
          new status:
          <input
            value={newStatus}
            onChange={handleStatusChange}
          /> <br />
          <button type="submit">move car</button>
        </form>
        mechanic: {car.user.name}<br />
        status: {status}<br />
        jobs: {jobs.map(job =>
          <div key={job.id}>
            <Job job={job} />
          </div>
        )}
        <Togglable buttonLabel="new job" ref={jobFormRef}>
          <JobForm createJob={addJob} carId={car.id} />
        </Togglable>
        <div style={showRemove}>
          <button onClick={removeCar}>remove car</button>
        </div>
      </div>
    </div>
  )}

Car.propTypes = {
  car: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
}

export default Car