import React from 'react';
import { MessagesType } from 'constant';
import './MessageType.scss';
import { MessagesUtils } from 'utils';
import I18n from 'i18n-js';

interface IProps {
    type?: MessagesType | null;
    badge?: boolean;
    receive?: boolean;
}

const MessageType = (props: IProps): JSX.Element => {
    const { type, badge } = props;

    const textIcon = MessagesUtils.name(type);
    const text = props.receive ? I18n.t('receiveFakeMessage') : textIcon.text;
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
};

export default MessageType;
