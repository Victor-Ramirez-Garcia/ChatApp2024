import React from 'react';

const ChatButtonComponent = props => {
    const { chat, onJoinChatHandler, onDeleteChatHandler, isUser } = props;

    return (
        <>
            <div>
                <p>Title: {chat.title}</p>
                <p>Description: {chat.description}</p>
                <p>Created By: {chat.user.email}</p>
                <button onClick={e => onJoinChatHandler(e, chat)}>Join Chat</button>
                {isUser && <button onClick={e => onDeleteChatHandler(e, chat._id)}>Delete Chat</button>}
            </div>
        </>
    )
}

export default ChatButtonComponent;