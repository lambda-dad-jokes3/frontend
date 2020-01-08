import React, { useState } from "react";
import axiosWithAuth from "../utils/axiosWithAuth";

const Login = props => {

  const [user, setUser] = useState({
    username: "",
    password: ""
  });

  const handleChange = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const login = e => {
    e.preventDefault();
    axiosWithAuth()
      .post("/users/login", user)
      .then(res => {
        localStorage.setItem("token", res.data.payload);
        props.history.push("/jokes");
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="SignIn">
      <div>
        <h1>
          Login
        </h1>
        <hr />
      </div>
      <form className="login-form" onSubmit={login}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            name="username"
            placeholder="Username"
            onChange={handleChange}
            value={user.username}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            name="password"
            placeholder="Password"
            onChange={handleChange}
            value={user.password}
          />
        </div>
        <div>
          <button className="enter">Login</button>
        </div>
      </form>
    </div>
  );
};
export default Login;
