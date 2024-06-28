import React, { useEffect, useState } from 'react'

// 👇 Here are the validation errors you will use with Yup.
const validationErrors = {
  fullNameTooShort: 'full name must be at least 3 characters',
  fullNameTooLong: 'full name must be at most 20 characters',
  sizeIncorrect: 'size must be S or M or L'
}

// 👇 Here you will create your schema.



// 👇 This array could help you construct your checkboxes using .map in the JSX.
const toppings = [
  { topping_id: '1', text: 'Pepperoni' },
  { topping_id: '2', text: 'Green Peppers' },
  { topping_id: '3', text: 'Pineapple' },
  { topping_id: '4', text: 'Mushrooms' },
  { topping_id: '5', text: 'Ham' },
]

export default function Form() {

  const [formData, setFormData] = useState({
    fullName: '',
    size: '',
    pepperoni: false,
    greenPeppers: false,
    pineapple: false,
    mushrooms: false,
    ham: false
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('form submitted')
  }

  const handleChange = (event) => {
    const { name, type, value, checked } = event.target;

    setFormData({
      ...formData,
      [name]: type == "checkbox" ? checked : value,
    });
console.log(value)
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Order Your Pizza</h2>
      {true && <div className='success'>Thank you for your order!</div>}
      {true && <div className='failure'>Something went wrong</div>}


{/* ////////////// USERNAME SECTION ////////////// */}
      <div className="input-group">
        <div>
          <label htmlFor="fullName">Full Name</label><br />
          <input onChange={handleChange} placeholder="Type full name" id="fullName" type="text" />
        </div>
        {true && <div className='error'>Bad value</div>}
      </div>


{/* ////////////// PIZZA SIZE SECTION ////////////// */}
      <div className="input-group">
        <div>
          <label htmlFor="size">Size</label><br />
          <select 
            name="size" 
            onChange={handleChange} 
            value={formData.size} 
            id="size"
            >
            <option value="">----Choose Size----</option>
            <option value="S">Small</option>
            <option value="M">Medium</option>
            <option value="L">Large</option>
          </select>
        </div>
        {true && <div className='error'>Bad value</div>}
      </div>

{/* ////////////// CHECKED BOXES SELECTIONS ////////////// */}
      <div className="input-group">
        {/* 👇 Maybe you could generate the checkboxes dynamically */}
        {toppings.map((topping) => (
              <label key={topping.topping_id}>
                <input
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
      <input disabled={!false} type="submit" />
    </form>
  )
}
