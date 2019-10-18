import React from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';

const Login = props => {
  const [form, setForm] = React.useState({});

  const handleChanges = event => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const handleLogin = e => {
    console.log(form);
    e.preventDefault();
    axiosWithAuth()
      .post('/api/login', form)
      .then(res => {
        localStorage.setItem('token', res.data.payload);
        props.history.push('/bubbles');
      })
      .catch(err => console.log(err.response));
  };
  return (
    <>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          value={form.username}
          name="username"
          onChange={handleChanges}
        />
        <input
          type="password"
          value={form.password}
          name="password"
          onChange={handleChanges}
        />
        <button>Login</button>
      </form>
    </>
  );
};

export default Login;
