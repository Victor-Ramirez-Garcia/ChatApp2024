import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LoginComponent from '../components/LoginComponent';

export function Login(props) {
    const {setUser} = props;

    const navigate = useNavigate();
    const [errors, setErrors] = useState([]);

    const LoginHandler = (e, formInfo) => {
        e.preventDefault();

        axios.post("http://localhost:8000/api/users/login", formInfo)
        .then((user) => {
            setUser(user.data.user);
            navigate("/main");
        })
        .catch(err => {
            const errorArr = [];

            if (err.response.data.emailEmpty || err.response.data.passwordEmpty)
            {
                if (err.response.data.emailEmpty)
                    errorArr.push(["email", "Field is empty"]);
                if (err.response.data.passwordEmpty)
                    errorArr.push(["password", "Field is empty"]);
            }
            else
            {
                if (!err.response.data.passwordMatches)
                    errorArr.push(["password", "Password does not match"])
            }

            setErrors(errorArr);
        })
    }

    return (
        <>
            <h1>Instant Messaging App</h1>
            <h2>Login</h2>
            <LoginComponent onSubmitHandler={LoginHandler} errors={errors} />
            <button onClick={() => navigate("/register")}>Register to Chatapp</button>
        </>
    );
}