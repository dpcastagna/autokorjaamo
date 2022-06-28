import PropTypes from 'prop-types'
import { useState } from 'react'
import jobService from '../services/jobs'

const Job = (props) => {
  const [job, setJob] = useState(props.job)
  const [done, setDone] = useState(job.status)
  console.log('jobissa', job)
  const hideWhenDone = { display: done ? 'none' : '' }
  const showWhenDone = { display: done ? '' : 'none' }

  const toggleDone = () => {
    //console.log('jobin togglessa', job)
    const jobObject = {
      name: job.name,
      time: job.time,
      status: !job.status,
      id: job.id
    }
    jobService
      .update(job.id, jobObject)
    setDone(!done)
    setJob(jobObject)
  }

  return (
    <div>
      <div style={hideWhenDone}>
        {job.name} {job.time}h <button onClick={toggleDone}>done</button>
      </div>
      <div style={showWhenDone}>
        <del>{job.name} {job.time}h</del> <button onClick={toggleDone}>cancel</button>
      </div>
    </div>
  )
}

Job.propTypes = {
  job: PropTypes.object.isRequired
}

export default Job