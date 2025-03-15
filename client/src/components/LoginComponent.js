import React, { useState } from 'react';

const LoginComponent = props => {
        // Properties from registrationComponent
        const {onSubmitHandler, errors} = props;

        // Form state values
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
        
        // Return array of messages from errors due to "firstName" field
        let emailErrors = errors.filter((err) => {return err[0] === "email"}).map((err) => {return err[1]});
        let passwordErrors = errors.filter((err) => {return err[0] === "password"}).map((err) => {return err[1]});

        return (
        <>
            <form onSubmit={e => onSubmitHandler(e, {email, password})}>
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

                <input type="submit" value="Login" />
            </form>
        </>
        )
}

export default LoginComponent;