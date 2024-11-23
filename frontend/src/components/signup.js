import React, { useState } from 'react';
import axios from 'axios';

const Signup = ({ handleSignup = () => {}, toggleForm = () => {} }) => {
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    email: '',
    password: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`Changing ${name} to: `, value); // Add logging to debug
    setFormData({ ...formData, [name]: value || '' }); // Fallback to '' to avoid undefined
  };

  const validateForm = () => {
    const { name, lastName, email, password } = formData;
    if (!name || !lastName || !email || !password) {
      return 'All fields are required!';
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setMessage(validationError);
      return;
    }

    try {
      console.log('Submitting form data:', formData);

      const response = await axios.post('http://localhost:3000/api/signup', formData);

      setMessage(response.data.message);
      handleSignup(response.data.user);
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message);
      } else if (error.request) {
        setMessage('Signup failed: No response from the server.');
      } else {
        setMessage('Signup failed. Please try again.');
      }
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name || ""}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName || ""}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email || ""}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password || ""}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
      <p>
        Already have an account? <button onClick={toggleForm}>Log in</button>
      </p>

      {message && <div className="message">{message}</div>}
    </div>
  );
};

export default Signup;
