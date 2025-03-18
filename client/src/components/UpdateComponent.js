import React, { useState } from 'react';

const UpdateComponent = props => {
    // Properties of UpdateComponent
    const { onSubmitHandler, onClickHandler, errors } = props;

    // Form state values
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    // Error form state values
    let firstNameErrors = errors.filter((err) => {return err[0] === "firstName"}).map((err) => {return err[1]});
    let lastNameErrors = errors.filter((err) => {return err[0] === "lastName"}).map((err) => {return err[1]});

    return (
        <>
            <form onSubmit={e => onSubmitHandler(e, {firstName, lastName})}>
            <label htmlFor="firstName">First Name:</label>
            <input  type="text"
                    id="firstName"
                    name="firstName"
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)} /><br />
            {firstNameErrors.map((err, key) => <p key={key}>{err}</p>)}
            <label htmlFor="lastName">Last Name:</label>
            <input  type="text"
                    id="lastName"
                    name="lastName"
                    value={lastName}
                    onChange={e => setLastName(e.target.value)} /><br />
            {lastNameErrors.map((err, key) => <p key={key}>{err}</p>)}

            <button type={"button"} onClick={onClickHandler}>Go Back</button>
            <input type="submit" value="Update" />
            </form>
        </>
    )
}

export default UpdateComponent;