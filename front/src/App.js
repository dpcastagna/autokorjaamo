import { useState, useEffect, useRef } from 'react'
import Car from './components/Car'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import CarForm from './components/CarForm'
import CategoryForm from './components/CategoryForm'
import carService from './services/cars'
import categoryService from './services/categorys'
import loginService from './services/login'
import userService from './services/users'

const App = () => {
  const [cars, setCars] = useState([])
  const [categorys, setCategorys] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [newName, setNewName] = useState('')
  const [newUsername, setNewUsername] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    carService.getAll().then(cars =>
      setCars(cars)
    )
  }, [])

  useEffect(() => {
    categoryService.getAll().then(categorys =>
      setCategorys(categorys)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedCarappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      carService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      //console.log(user)

      window.localStorage.setItem(
        'loggedCarappUser', JSON.stringify(user)
      )
      carService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedCarappUser')
    setUser(null)
    //window.location.reload() //reloads page after logout button press
  }

  const handlecreateUser = async (event) => {
    event.preventDefault()
    userFormRef.current.toggleVisibility()
    const newUser = {
      username: newUsername,
      name: newName,
      password: newPassword
    }
    console.log(newUsername, newName, newPassword, newUser)
    try {
      const user = await userService.create(newUser)
      console.log('app', user)

      /*window.localStorage.setItem(
        'loggedCarappUser', JSON.stringify(user)
      )*/
      //carService.setToken(user.token)
      //setUser(user)
      setNewName('')
      setNewUsername('')
      setNewPassword('')
    } catch (exception) {
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const addCar = (carObject) => {
    carFormRef.current.toggleVisibility()
    carService
      .create(carObject)
      .then(returnedCar => {
        setCars(cars.concat(returnedCar))
        setErrorMessage(`a new car ${carObject.registration} ${carObject.model} added`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  const addCategory = (categoryObject) => {
    categoryFormRef.current.toggleVisibility()
    categoryService
      .create(categoryObject)
      .then(returnedCategory => {
        setCategorys(categorys.concat(returnedCategory))
        setErrorMessage(`a new category ${categoryObject.name} added`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const createUserForm = () => (
    <form onSubmit={handlecreateUser}>
      <div>
        name
        <input
          type="text"
          value={newName}
          name="name"
          onChange={({ target }) => setNewName(target.value)}
        />
      </div>
      <div>
        username
        <input
          type="text"
          value={newUsername}
          name="username"
          onChange={({ target }) => setNewUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={newPassword}
          name="password"
          onChange={({ target }) => setNewPassword(target.value)}
        />
      </div>
      <button type="submit">create</button>
    </form>
  )

  const userFormRef = useRef()
  const carFormRef = useRef()
  const categoryFormRef = useRef()

  if (user === null) {
    return (
      <div>
        <h2>login to application</h2>
        <Notification message={errorMessage} class="error" />
        {loginForm()}
        <br />
        <Togglable buttonLabel="new user" ref={userFormRef}>
          {createUserForm()}
        </Togglable>
      </div>
    )
  }

  return (
    <div id="app">
      <Notification message={errorMessage} class="success" />
      <form onSubmit={handleLogout}>
        <p>
          {user.name} logged in <button type="submit">logout</button>
        </p>
      </form>
      <Togglable buttonLabel="new car" ref={carFormRef}>
        <CarForm createCar={addCar} />
      </Togglable>
      <Togglable buttonLabel="new category" ref={categoryFormRef}>
        <CategoryForm createCategory={addCategory} />
      </Togglable>
      {categorys.length}
      <table>
        <tr>
          <th>ENTERED</th>
          <th>IN PROGRESS</th>
          <th>ON HOLD</th>
          <th>CAR WASH</th>
          <th>DONE</th>
        </tr>
        <tr>
          <td>
            <div className="vastaanotettu">
              {cars.sort((a, b) => {
                return (a.likes > b.likes) ? -1 : 1
              }).map(car =>
                <div key={car.id}>
                  <Car key={car.id} car={car} user={user} /> <br />
                </div>
              )}
            </div>
          </td>
          <td>
            <div className="tyonalla">
              {cars.sort((a, b) => {
                return (a.likes > b.likes) ? -1 : 1
              }).map(car =>
                <div key={car.id}>
                  <Car key={car.id} car={car} user={user} /> <br />
                </div>
              )}
            </div>
          </td>
          <td>
            <div className="odottaa">
              {cars.sort((a, b) => {
                return (a.likes > b.likes) ? -1 : 1
              }).map(car =>
                <div key={car.id}>
                  <Car key={car.id} car={car} user={user} /> <br />
                </div>
              )}
            </div>
          </td>
          <td>
            <div className="pesula">
              {cars.sort((a, b) => {
                return (a.likes > b.likes) ? -1 : 1
              }).map(car =>
                <div key={car.id}>
                  <Car key={car.id} car={car} user={user} /> <br />
                </div>
              )}
            </div>
          </td>
          <td>
            <div className="valmis">
              {cars.sort((a, b) => {
                return (a.likes > b.likes) ? -1 : 1
              }).map(car =>
                <div key={car.id}>
                  <Car key={car.id} car={car} user={user} /> <br />
                </div>
              )}
            </div>
          </td>
        </tr>
      </table>
    </div>
  )
}

export default App
