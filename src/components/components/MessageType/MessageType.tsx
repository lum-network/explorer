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
                <div className="app-message-type-badge">
                    <p className="text-badge d-flex align-items-center">
                        <img alt="logo" src={icon} />
                        {text}
                    </p>
                </div>
            );
        }

        return (
            <div className="app-message-type">
                <p className="text d-flex align-items-center">
                    <img alt="logo" src={icon} />
                    {text}
                </p>
            </div>
        );
    }
}

export default MessageType;
