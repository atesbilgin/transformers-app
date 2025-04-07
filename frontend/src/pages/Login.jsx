import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../graphql/queries';
import { LOGIN_QUERY } from '../graphql/queries';



export default function Login(props) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loginUser, { data, loading, error }] = useMutation(LOGIN_QUERY);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await loginUser(
        { variables: 
          {
            authData: {
              email: form.email,
              password: form.password
            },
          }, 
        } 
      );
      localStorage.setItem('authToken', data.login.token);
      props.setUserEmail(form.email);
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input type="email" placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} required />
      <input type="password" placeholder="Password" onChange={e => setForm({ ...form, password: e.target.value })} required />
      <button type="submit">Login</button>
      {error && <p style={{ color: 'red' }}>{error.message}</p>}
    </form>
  );
}
