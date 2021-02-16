import React, { PureComponent } from 'react';
import './Card.scss';

interface IProps {
    className?: string;
    flat?: boolean;
    badge?: JSX.Element;
}

class Card extends PureComponent<IProps> {
    render(): JSX.Element {
        const { children, className, flat, badge } = this.props;

        return (
            <div>
                <div className={`p-4 p-xl-5 position-relative app-card ${flat && 'flat'} ${className}`}>
                    <div className="badge-position">{badge}</div>
                    {children}
                </div>
            </div>
        );
    }
}

export default Card;
