import { useCallback, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import io from 'socket.io-client';
import MessageComponent from '../components/MessageComponent';
import moment from 'moment';

const socket = io('http://localhost:8000', {
    transports: ['websocket'],
    withCredentials: true,
});

export function Chat(props) {
    const { user } = props; // Component properties
    const [contents, setContents] = useState([]);
    // Navigation function to go to different routes
    const navigate = useNavigate();
    // Location function, where location.state has state information
    const location = useLocation();

    // Get conversation history
    const getChatContents = useCallback(async() => {
        // Get posts
        const res = await axios.get(`http://localhost:8000/api/chats/posts/${location.state.chat}`);

        const resPosts = Object.keys(res.data.posts).map(async(key) => {
            // Post object
            const post = {
                _id: res.data.posts[key]._id,
                content: res.data.posts[key].content,
                timestamp: res.data.posts[key].timestamp,
            }

            // Format Timestamp
            post.timestamp = moment(post.timestamp).utc().format('YYYY-MM-DD HH:mm:ss');

            // Get sender object
            const res_user_1 = await axios.get(`http://localhost:8000/api/users/${res.data.posts[key]._senderID}`)
            post.sender = res_user_1.data.user[0];

            // Get recipient object
            const res_user_2 = await axios.get(`http://localhost:8000/api/users/${res.data.posts[key]._recipientID}`)
            post.recipient = res_user_2.data.user[0];

            return post;
        })

        const postsArr = await Promise.all(resPosts);
        setContents(postsArr);
    }, [location.state.chat, setContents]);
    
    // Ensures effect re-runs only when the function changes
    useEffect(() => {getChatContents();}, [getChatContents]);

    // Listen for real-time messages using Socket.io
    useEffect(() => {
        socket.on('receiveMessage', async(newContent) => {
            // Post object
            const post = {
                _id: newContent.post._id,
                content: newContent.post.content,
                timestamp: newContent.post.timestamp,
            }

            // Format Timestamp
            post.timestamp = moment(post.timestamp).utc().format('YYYY-MM-DD HH:mm:ss');

            // Get sender object
            const res_user_1 = await axios.get(`http://localhost:8000/api/users/${newContent.post._senderID}`)
            post.sender = res_user_1.data.user[0];

            // Get recipient object
            const res_user_2 = await axios.get(`http://localhost:8000/api/users/${newContent.post._recipientID}`)
            post.recipient = res_user_2.data.user[0];

            setContents((prevContent) => [...prevContent, post]);
        });

        return () => {
            socket.off('receiveMessage');
        }
    }, [setContents]);

    // Send Message Handler
    const onSendHandler = (e, formInfo) => {
        e.preventDefault();
        formInfo.sender = user._id;
        formInfo.recipient = location.state.user;
        formInfo.chat = location.state.chat;

        socket.emit('sendMessage', formInfo);
    }

    return (
        <>
            <h1>Chat</h1>
            <div>
                {contents.map((content, key) => (
                    <div key={key}><strong>({content.sender.email}) {content.content} (Send at {content.timestamp})</strong></div>
                ))}
            </div>
            <MessageComponent onSendHandler={onSendHandler} onLeaveHandler={() => navigate("/main")} />
        </>
    )
}