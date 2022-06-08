import { useState } from 'react'
import carService from '../services/cars'
import PropTypes from 'prop-types'

const Car = ({ car, user }) => {
  const carStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  console.log(car.user.name, user.name)
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

  /*const likeSend = (event) => {
    event.preventDefault()

    const carObject = {
      registration: car.registration,
      model: car.model,
      user: user._id,
    }

    carService
      .update(car.id, carObject)
      .then(
        //setLikes(blog.likes += 1)
      )
  }*/

  const removeCar = (event) => {
    event.preventDefault()
    if(window.confirm(`Remove car ${car.registration} model ${car.model}`)) {
      //console.log("jee", blog.id)
      carService
        .remove(car.id)
        .then(
          window.location.reload()
        )
    }
  }

  return(
    <div style={carStyle}>

      <div style={hideWhenVisible}>
        {car.registration} {car.model}<button onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible}>
        {car.registration} {car.model}
        <button onClick={toggleVisibility}>hide</button><br />
        {car.user.name}
        <div style={showRemove}>
          <button onClick={removeCar}>remove</button>
        </div>
      </div>
    </div>
  )}

Car.propTypes = {
  car: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
}

export default Car