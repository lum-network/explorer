import React, { PureComponent } from 'react';
import './Card.scss';

interface IProps {
    className?: string;
    message?: boolean;
}

class Card extends PureComponent<IProps> {
    render(): JSX.Element {
        const { children, className, message } = this.props;

        return <div className={`p-4 p-xl-5 app-card ${message && 'message'} ${className}`}>{children}</div>;
    }
}

export default Card;
