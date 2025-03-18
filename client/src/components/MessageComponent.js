import React, { useState } from 'react';

const MessageComponent = props => {
    const { onSendHandler, onLeaveHandler } = props;
    const [content, setContent] = useState("");
    
    return (
        <>
            <form onSubmit={(e) => {onSendHandler(e, {content}); setContent("");}}>
                <input  type="text"
                        name="content"
                        value={content}
                        onChange={e => {setContent(e.target.value);}} /><br />
                
                <input type="submit" value="Send" />
            </form>
            
            <button type={"button"} onClick={onLeaveHandler}>Go Back</button>
        </>
    )
}

export default MessageComponent;