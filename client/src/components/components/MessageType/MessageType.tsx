import React, { PureComponent } from 'react';
import { MessagesType } from 'constant';
import './MessageType.scss';

interface IProps {
    type: MessagesType;
    badge?: boolean;
}

class MessageType extends PureComponent<IProps> {
    render(): JSX.Element {
        return <div></div>;
    }
}

export default MessageType;
