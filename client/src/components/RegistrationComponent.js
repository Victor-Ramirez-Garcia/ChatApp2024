import React, { useState } from 'react';

const RegistrationComponent = props => {
        // Properties from registrationComponent
        const {onSubmitHandler, errors, onClickHandler} = props;

        // Form state values
        const [firstName, setFirstName] = useState("");
        const [lastName, setLastName] = useState("");
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
        const [confirmPassword, setConfirmPassword] = useState("");

        // Return array of messages from errors due to "firstName" field
        let firstNameErrors = errors.filter((err) => {return err[0] === "firstName"}).map((err) => {return err[1]});
        let lastNameErrors = errors.filter((err) => {return err[0] === "lastName"}).map((err) => {return err[1]});
        let emailErrors = errors.filter((err) => {return err[0] === "email"}).map((err) => {return err[1]});
        let passwordErrors = errors.filter((err) => {return err[0] === "password"}).map((err) => {return err[1]});
        let confirmPasswordErrors = errors.filter((err) => {return err[0] === "confirmPassword"}).map((err) => {return err[1]});

        // HTML format for registration component
        return (
                <>
                        <form onSubmit={e => onSubmitHandler(e, {firstName, lastName, email, password, confirmPassword})}>
                                <label for="firstName">First Name:</label>
                                <input  type="text"
                                        name="firstName"
                                        value={firstName}
                                        onChange={e => setFirstName(e.target.value)} /><br />
                                {firstNameErrors.map((err, key) => <p key={key}>{err}</p>)}
                                <label for="lastName">Last Name:</label>
                                <input  type="text"
                                        name="lastName"
                                        value={lastName}
                                        onChange={e => setLastName(e.target.value)} /><br />
                                {lastNameErrors.map((err, key) => <p key={key}>{err}</p>)}
                                <label for="email">Email:</label>
                                <input  type="text"
                                        name="email"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)} /><br />
                                {emailErrors.map((err, key) => <p key={key}>{err}</p>)}
                                <label for="password">Password:</label>
                                <input  type="text"
                                        name="password"
                                        value={password}
                                        onChange={e => setPassword(e.target.value)} /><br />
                                {passwordErrors.map((err, key) => <p key={key}>{err}</p>)}
                                <label for="confirmPassword">Confirm Password:</label>
                                <input  type="text"
                                        name="confirmPassword"
                                        value={confirmPassword}
                                        onChange={e => setConfirmPassword(e.target.value)} />
                                {confirmPasswordErrors.map((err, key) => <p key={key}>{err}</p>)}

                                <button type={"button"} onClick={onClickHandler}>Go Back</button>
                                <input type="submit" value="Register" />
                        </form>
                </>
        )
}

export default RegistrationComponent;