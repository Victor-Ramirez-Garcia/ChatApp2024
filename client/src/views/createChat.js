import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CreateChatComponent from '../components/CreateChatComponent';

export function CreateChat(props) {
    const { user } = props;
    // Navigation function to go to different routes
    const navigate = useNavigate();
    // Error state variable 
    const [errors, setErrors] = useState([]);
    
    // Empty user handler
    useEffect(() => {
        if (Object.keys(user).length === 0)
            navigate("/");
    }, [user, navigate]);
    
    const createChat = (e, formInfo) => {
        e.preventDefault();
        formInfo.user = user;
        axios.post("http://localhost:8000/api/chats/create", formInfo)
        .then(() => {
            navigate("/main");
        })
        .catch((err) => {
            console.log(err);
            const errorArr = [];

            if (err.status === 400)
            {
                for (const key of Object.keys(err.response.data.errors))
                    errorArr.push([err.response.data.errors[key].path, err.response.data.errors[key].message]);
            }
            setErrors(errorArr);
        })
    }

    return (
        <>
            <h1>Create Chat</h1>
            <CreateChatComponent onSubmitHandler={createChat} onClickHandler={() => {navigate("/main")}} errors={errors} />
        </>
    )
}