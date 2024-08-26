import React from 'react';

type FileProps = {
    id: string;
}

function ChatToFilePage({id}: FileProps) {
    return <div>
        <h1>Chat To File Page: {id}</h1>
    </div>
    ;
}

export default ChatToFilePage;