import React, { useEffect, useState } from 'react'
import axios from 'axios'
import * as Yup from "yup";

// 👇 Here are the validation errors you will use with Yup.
const validationErrors = {
  fullNameTooShort: 'full name must be at least 3 characters',
  fullNameTooLong: 'full name must be at most 20 characters',
  sizeIncorrect: 'size must be S or M or L'
}

// 👇 Here you will create your schema.





const getInitialValues = () => ({
  fullName: '',
  size: '',
  toppings: false,
})

const getInitialErrors = () => ({
  fullName: '',
  size: '',
})

// 👇 This array could help you construct your checkboxes using .map in the JSX.
const toppings = [
  { topping_id: '1', text: 'Pepperoni' },
  { topping_id: '2', text: 'Green Peppers' },
  { topping_id: '3', text: 'Pineapple' },
  { topping_id: '4', text: 'Mushrooms' },
  { topping_id: '5', text: 'Ham' },
]

export default function Form() {

  const [enabled, setEnabled] = useState(false);
  const [values, setValues] = useState(getInitialValues());
  const [errors, setErrors] = useState(getInitialErrors());
  const [serverSuccess, setServerSucces] = useState();
  const [serverFailure, setServerFailure] = useState();
  

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('form submitted')
  }

  const handleChange = (event) => {
    let { name, type, value, checked } = event.target;
    value = type == 'checkbox' ? checked : value
    setValues({
      ...values,
      [name]: type == "checkbox" ? checked : value,
    });
console.log(value)
  };


  return (
    <form onSubmit={handleSubmit}>
      <h2>Order Your Pizza</h2>
      {serverSuccess && <div className='success'>{serverSuccess}</div>}
      {serverFailure && <div className='failure'>{serverFailure}</div>}


{/* ////////////// USERNAME SECTION ////////////// */}
      <div className="input-group">
        <div>
          <label htmlFor="fullName">Full Name</label><br />
          <input name="fullName" onChange={handleChange} placeholder="Type full name" id="fullName" type="text" />
        </div>
        {true && <div className='error'>{validationErrors.fullNameTooShort}</div>}
        {true && <div className='error'>{validationErrors.fullNameTooShort}</div>}
      </div>


{/* ////////////// PIZZA SIZE SECTION ////////////// */}
      <div className="input-group">
        <div>
          <label htmlFor="size">Size</label><br />
          <select 
            name="size" 
            onChange={handleChange} 
            // value={formData.size} 
            id="size"
            >
            <option value="">----Choose Size----</option>
            <option value="S">Small</option>
            <option value="M">Medium</option>
            <option value="L">Large</option>
          </select>
        </div>
      {true && <div className='error'>{validationErrors.sizeIncorrect}</div>}
      </div>

{/* ////////////// CHECKED BOXES SELECTIONS ////////////// */}
      <div className="input-group">
        {/* 👇 Maybe you could generate the checkboxes dynamically */}
        {toppings.map((topping) => (
              <label key={topping.topping_id}>
                <input
                  checked={values.topping}
                  type="checkbox"
                  name="toppings"
                  value={topping.text}
                  onChange={handleChange}
                />
                {topping.text}<br />
              </label>
            ))}

     
      </div>
      {/* 👇 Make sure the submit stays disabled until the form validates! */}
      <input  type="submit" />
    </form>
  )
}
