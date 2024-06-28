import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as Yup from 'yup';

const validationErrors = {
  fullNameTooShort: 'full name must be at least 3 characters',
  fullNameTooLong: 'full name must be at most 20 characters',
  sizeIncorrect: 'size must be S or M or L',
};

const formSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(3, validationErrors.fullNameTooShort)
    .max(20, validationErrors.fullNameTooLong)
    .required(),
  size: Yup.string()
    .oneOf(['S', 'M', 'L'], validationErrors.sizeIncorrect)
    .required(),
  toppings: Yup.array().of(Yup.number()).required(),
});

const getInitialValues = () => ({
  fullName: '',
  size: '',
  toppings: [], 
});

const getInitialErrors = () => ({
  fullName: '',
  size: '',
});

const toppings = [
  { topping_id: 1, text: 'Pepperoni' },
  { topping_id: 2, text: 'Green Peppers' },
  { topping_id: 3, text: 'Pineapple' },
  { topping_id: 4, text: 'Mushrooms' },
  { topping_id: 5, text: 'Ham' },
];

export default function Form() {
  const [values, setValues] = useState(getInitialValues());
  const [errors, setErrors] = useState(getInitialErrors());
  const [serverSuccess, setServerSuccess] = useState('');
  const [serverFailure, setServerFailure] = useState('');
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const validateForm = async () => {
      try {
        await formSchema.validate(values, { abortEarly: false });
        setIsValid(true);
      } catch (err) {
        setIsValid(false);
      }
    };
    validateForm();
  }, [values]);


  const handleSubmit = async (evt) => {
    evt.preventDefault();

    const payload = {
      fullName: values.fullName,
      size: values.size,
      toppings: values.toppings, 
    };

    try {
      await formSchema.validate(values, { abortEarly: false });
      const response = await axios.post('http://localhost:9009/api/order', payload);
      const { message } = response.data;
      setServerSuccess(message);
      setServerFailure('');
      setValues(getInitialValues());
    } catch (error) {
      if (error.inner) {
        const newErrors = error.inner.reduce((acc, err) => {
          acc[err.path] = err.message;
          return acc;
        }, {});
        setErrors(newErrors);
      } else {
        setServerFailure('Failed to place order. Please try again.');
        setServerSuccess('');
      }
    }
  };

  const handleChange = (evt) => {
    const { type, checked, name, value } = evt.target;
    const toppingId = toppings.find((topping) => topping.text === name)?.topping_id;

    if (type === 'checkbox') {
      setValues((prevValues) => {
        const updatedToppings = checked
          ? [...prevValues.toppings, toppingId]
          : prevValues.toppings.filter((id) => id !== toppingId);

        return { ...prevValues, toppings: updatedToppings };
      });
    } else {
      setValues((prevValues) => ({ ...prevValues, [name]: value }));
      
    
      try {
        Yup.reach(formSchema, name).validate(value)
          .then(() => setErrors((prevErrors) => ({ ...prevErrors, [name]: '' })))
          .catch((err) => setErrors((prevErrors) => ({ ...prevErrors, [name]: err.message })));
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Order Your Pizza</h2>
      {serverSuccess && <div className='success'>{serverSuccess}</div>}
      {serverFailure && <div className='failure'>{serverFailure}</div>}

      <div className="input-group">
        <div>
          <label htmlFor="fullName">Full Name</label><br />
          <input value={values.fullName} name="fullName" onChange={handleChange} placeholder="Type full name" id="fullName" type="text" />
        </div>
        {errors.fullName && <div className='error'>{errors.fullName}</div>}
      </div>

      <div className="input-group">
        <div>
          <label htmlFor="size">Size</label><br />
          <select 
            name="size" 
            onChange={handleChange} 
            value={values.size} 
            id="size"
          >
            <option value="">----Choose Size----</option>
            <option value="S">Small</option>
            <option value="M">Medium</option>
            <option value="L">Large</option>
          </select>
        </div>
        {errors.size && <div className='error'>{errors.size}</div>}
      </div>

      <div className="input-group">
        {toppings.map((topping) => (
          <label key={topping.topping_id}>
            <input
              type="checkbox"
              name={topping.text}
              checked={values.toppings.includes(topping.topping_id)}
              onChange={handleChange}
            />
            {topping.text}<br />
          </label>
        ))}
      </div>
      <input disabled={!isValid} type="submit" />
    </form>
  );
}
