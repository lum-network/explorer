import React, { PureComponent } from 'react';
import './Card.scss';

interface IProps {
    className?: string;
}

class Card extends PureComponent<IProps> {
    render(): JSX.Element {
        const { children, className } = this.props;

        return <div className={`p-3 shadow rounded-3 bg-white ${className}`}>{children}</div>;
    }
}

export default Card;
