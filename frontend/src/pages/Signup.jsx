import React from 'react';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { SIGNUP_USER } from '../graphql/queries';
import { SIGNUP_QUERY } from '../graphql/queries';
import { useNavigate } from 'react-router-dom';


export default function Signup() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [signupUser, { data, loading, error }] = useMutation(SIGNUP_QUERY);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await signupUser(
        { variables: 
          {
            authData: {
              email: form.email,
              password: form.password
            },
          }, 
        } 
      );
      localStorage.setItem('authToken', data.signup.token);
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      <input type="email" placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} required />
      <input type="password" placeholder="Password" onChange={e => setForm({ ...form, password: e.target.value })} required />
      <button type="submit">Sign Up</button>
      {error && <p style={{ color: 'red' }}>{error.message}</p>}
    </form>
  );
}
