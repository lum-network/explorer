import React, { PureComponent } from 'react';
import './Card.scss';

class Card extends PureComponent {
    render(): JSX.Element {
        const { children } = this.props;

        return <div className="p-3 shadow rounded-3">{children}</div>;
    }
}

export default Card;
