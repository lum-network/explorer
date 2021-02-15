import React, { PureComponent } from 'react';
import { MessagesType, TransactionsAction } from 'constant';
import './MessageType.scss';
import { MessagesUtils } from 'utils';

interface IProps {
    type?: MessagesType | TransactionsAction;
    badge?: boolean;
}

class MessageType extends PureComponent<IProps> {
    render(): JSX.Element {
        const { type, badge } = this.props;

        const textIcon = MessagesUtils.name(type);
        const text = textIcon.text;
        const icon = textIcon.icon;

        if (badge) {
            return (
                <div className="app-message-type">
                    <p className="text">
                        <img alt="logo" src={icon} />
                        {text}
                    </p>
                </div>
            );
        }

        return <div></div>;
    }
}

export default MessageType;
