import PropTypes from 'prop-types'

const Job = (props) => {
  const job = props.job
  console.log('jobissa', job)

  return (
    <div>
      {job.name} {job.time}
    </div>
  )
}

Job.propTypes = {
  job: PropTypes.object.isRequired
}

export default Job