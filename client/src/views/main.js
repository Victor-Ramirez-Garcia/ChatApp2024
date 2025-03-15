import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ChatButtonComponent from '../components/ChatButtonComponent';

export function Main(props) {
    const { user } = props; // Properties given by the component
    const navigate = useNavigate(); // Function that navigates to different routes
    const [chats, setChats] = useState([]); // All user chats (excluding current user)
    const [userChats, setUserChats] = useState([]); // All current user chats

    // Empty user handler
    useEffect(() => {
        if (Object.keys(user).length === 0)
            navigate("/");
    }, [user, navigate]);

    // Get all non-user chats
    const getNonUserChats = useCallback(async() => {
        const res = await axios.get(`http://localhost:8000/api/chats/all/exclude/${user._id}`);

        // Replaces user id with user object
        const resChats = Object.keys(res.data.chats).map((key) => 
            axios.get(`http://localhost:8000/api/users/${res.data.chats[key].user}`)
            .then((res_user) => {
                // When we console log res_user, data.user is an array,
                // in here, we only want the object
                res.data.chats[key].user = res_user.data.user[0];
                return res.data.chats[key];
            })
        );

        const chatsArr = await Promise.all(resChats);
        setChats(chatsArr);
    }, [user._id, setChats]);

    // Ensures effect re-runs only when the function changes
    useEffect(() => {getNonUserChats();}, [getNonUserChats]);

    // Get all user chats
    const getUserChats = useCallback(async() => {
        const res = await axios.get(`http://localhost:8000/api/chats/${user._id}`);

        // Replaces user id with user object
        const resChats = Object.keys(res.data.chats).map((key) => {
            res.data.chats[key].user = user;
            return res.data.chats[key];
        });

        const chatsArr = await Promise.all(resChats);
        setUserChats(chatsArr);
    }, [user, setUserChats]);

    // Ensures effect re-runs only when the function changes
    useEffect(() => {getUserChats();}, [getUserChats]);

    // Logout Handler
    const onClickHandler = (e) => {
        e.preventDefault();

        axios.get("http://localhost:8000/api/users/logout")
        .then(() => {
            navigate("/");
        })
        .catch(err => {
            console.log(err);
        })
    }

    // Delete Chat Handler
    const onDeleteChatHandler = (e, chat) => {
        e.preventDefault();

        axios.delete(`http://localhost:8000/api/chats/delete/${chat}`)
        .then(() => {getUserChats();})
        .catch(err => {console.log(err)});
    }

    // Join Chat Handler
    const onJoinChatHandler = (e, chat) => {
        e.preventDefault();

        navigate("/main/chat", { state: { chat: chat._id, user: chat.user._id } });
    }

    return (
        <>
            <h1>Welcome {user.firstName} {user.lastName}!</h1>
            <button onClick={() => {navigate("/main/update")}}>Update Profile</button>
            <h2>Your Chat Rooms</h2>
            {userChats.map((userChat, key) => <ChatButtonComponent key={key} chat={userChat} onJoinChatHandler={onJoinChatHandler} onDeleteChatHandler={onDeleteChatHandler} isUser={true} />)}
            <h2>Online Chat Rooms</h2>
            {chats.map((userChat, key) => <ChatButtonComponent key={key} chat={userChat} onJoinChatHandler={onJoinChatHandler} isUser={false} />)}

            <button onClick={() => {navigate("/main/create")}}>Create Chat</button>
            <button onClick={e => onClickHandler(e)}>Logout</button>
        </>
    )
}