import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { REGISTER_ROUTE } from "../lib/constants";
import apiClient from "../lib/api-client";
import RegistrationComponent from "../components/RegistrationComponent";

/**
 * This is registration page. A user will be able
 * to register using a first and last name, a email,
 * and a password.
 */

export function Registration() {
    // Lets use use useNavigate() which allows us to
    // go to another route
    const navigate = useNavigate();
    // Array of state errors
    const [errors, setErrors] = useState([]);

    // Takes the form information, makes a POST HTTP request
    const register = (e, formInfo) => {
        e.preventDefault();

        apiClient.post(REGISTER_ROUTE, formInfo)
        .then(() => {navigate("/");})
        .catch((err) => {
            //console.log(err); // uncomment this to see where data is located at in inspection mode
            const errorArr = [];

            if (err.status === 400)
            {
                // Loop through each error and store path and message of error in errorArr
                for (const key of Object.keys(err.response.data.errors))
                    errorArr.push([err.response.data.errors[key].path, err.response.data.errors[key].message]);
            }
            else if (err.status === 409)
                errorArr.push(["email", "Email is already taken"]);

            setErrors(errorArr); // Store the errors
        })
    }

    return (
        <>
            <h1>Instant Messaging App</h1>
            <h2>Registration Page</h2>
            <RegistrationComponent onSubmitHandler={register} onClickHandler={() => {navigate("/")}} errors={errors} />
        </>
    );
}