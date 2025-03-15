import React, {useState} from 'react';
import { Route, Routes } from 'react-router-dom';
import { Login } from './views/login.js';
import { Registration } from './views/registration.js';
import { Main } from './views/main.js';
import { CreateChat } from './views/createChat.js';
import { Update } from './views/update.js';
import { Chat } from './views/chat.js';

export default function App() {
    // This is a state variable used to check if a 
    // user has access to a route. This is used
    // as a global variable, stored in the context
    // "UserAccessContext"
    const [user, setUser] = useState({});

    return (
        <Routes>
            <Route path="/" element={<Login setUser={setUser} />}></Route>
            <Route path="/register" element={<Registration />}></Route>
            <Route path="/main" element={<Main user={user} />}></Route>
            <Route path="/main/create" element={<CreateChat user={user} />}></Route>
            <Route path="/main/update" element={<Update user={user} setUser={setUser} />}></Route>
            <Route path="/main/chat" element={<Chat user={user} />}></Route>
        </Routes>
    )
}