import React, { useState } from 'react';

const CreateChatComponennt = props => {
    // Properties from registrationComponent
    const {onSubmitHandler, errors, onClickHandler} = props;
    
    // Form state values
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
        
    // Form state error messages by field
    let titleErrors = errors.filter((err) => {return err[0] === "title"}).map((err) => {return err[1]});
    let descriptionErrors = errors.filter((err) => {return err[0] === "description"}).map((err) => {return err[1]});

    return (
        <>
            <form onSubmit={e => onSubmitHandler(e, {title, description})}>
                <label for="title">Title:</label>
                <input  type="text"
                        name="title"
                        value={title}
                        onChange={e => setTitle(e.target.value)} /><br />
                {titleErrors.map((err, key) => <p key={key}>{err}</p>)}
                <label for="description">Description:</label>
                <input  type="text"
                        name="description"
                        value={description}
                        onChange={e => setDescription(e.target.value)} /><br />
                {descriptionErrors.map((err, key) => <p key={key}>{err}</p>)}

                <button type={"button"} onClick={onClickHandler}>Go Back</button>
                <input type="submit" value="Create Chat Room" />
            </form>
        </>
    )
}

export default CreateChatComponennt;