import { useState } from 'react'
import PropTypes from 'prop-types'

const CarForm = ({ createCar }) => {
  const [newRegistration, setNewRegistration] = useState('')
  const [newModel, setNewModel] = useState('')

  const handleTitleChange = (event) => {
    setNewRegistration(event.target.value)
  }
  const handleAuthorChange = (event) => {
    setNewModel(event.target.value)
  }

  const addCar = (event) => {
    event.preventDefault()
    const carObject = {
      registration: newRegistration,
      model: newModel,
      status: 0,
    }
    createCar(carObject)

    setNewRegistration('')
    setNewModel('')
  }

  return (
    <form onSubmit={addCar}>
      <h2>add new car</h2>
      registration:
      <input
        value={newRegistration}
        onChange={handleTitleChange}
      /> <br />
      model:
      <input
        value={newModel}
        onChange={handleAuthorChange}
      /> <br />
      <button type="submit">create</button>
    </form>
  )
}

CarForm.propTypes = {
  createCar: PropTypes.func.isRequired
}

export default CarForm