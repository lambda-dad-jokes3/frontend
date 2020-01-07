import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const Login = props => {

    const [state, setState] = useState({ credentials: { username: "", password: "" } })

    const handleChange = event => {
        setState({ credentials: { ...state.credentials, [event.target.name]: event.target.value } })
    }

    const login = event => {
        event.preventDefault();
        axiosWithAuth()
            .post("https://dadjokesdb.herokuapp.com/api/users/login", state.credentials)
            .then(res => {
                console.log(res);
                localStorage.setItem("token", res.data.payload);
                props.history.push("");

            })
            .catch(err => console.log(err));
    }



    return (
        <>
            <h2>Log in here!</h2>
            <form onSubmit={login}>
                <input type="text" name="username" placeholder="name" value={state.credentials.username} onChange={handleChange} />
                <input type="password" name="password" placeholder="password" value={state.credentials.password} onChange={handleChange} />
                <button>Log in!</button>
            </form>
        </>

    );
}

export default Login;