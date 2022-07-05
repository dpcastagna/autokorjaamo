import { useState } from 'react'
import PropTypes from 'prop-types'

const CategoryForm = ({ createCategory }) => {
  const [newCategory, setNewCategory] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newColor, setNewColor] = useState('')

  const handleCategoryChange = (event) => {
    setNewCategory(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleColorChange = (event) => {
    setNewColor(event.target.value)
  }

  const addCategory = (event) => {
    event.preventDefault()
    const categoryObject = {
      name: newCategory,
      number: Number(newNumber),
      color: newColor,
    }
    createCategory(categoryObject)

    setNewCategory('')
    setNewNumber('')
    setNewColor('')
  }

  return (
    <form onSubmit={addCategory}>
      <h2>add new category</h2>
      category:
      <input
        value={newCategory}
        onChange={handleCategoryChange}
      /> <br />
      number:
      <input
        value={newNumber}
        onChange={handleNumberChange}
      /> <br />
      color:
      <input
        value={newColor}
        onChange={handleColorChange}
      /> <br />
      <button type="submit">create</button>
    </form>
  )
}

CategoryForm.propTypes = {
  createCategory: PropTypes.func.isRequired
}

export default CategoryForm