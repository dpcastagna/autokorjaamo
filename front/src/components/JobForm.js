import { useState } from 'react'
import PropTypes from 'prop-types'

const JobForm = ({ createJob, carId }) => {
  const [newName, setNewName] = useState('')
  const [newTime, setNewTime] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleTimeChange = (event) => {
    setNewTime(event.target.value)
  }

  const addJob = (event) => {
    event.preventDefault()
    const jobObject = {
      name: newName,
      time: Number(newTime),
      status: false,
      id: carId
    }
    createJob(jobObject)

    setNewName('')
    setNewTime('')
  }

  return (
    <form onSubmit={addJob}>
      <h2>add new job</h2>
      job:
      <input
        value={newName}
        onChange={handleNameChange}
      /> <br />
      time:
      <input
        value={newTime}
        onChange={handleTimeChange}
      /> <br />
      <button type="submit">create job</button>
    </form>
  )
}

JobForm.propTypes = {
  createJob: PropTypes.func.isRequired
}

export default JobForm