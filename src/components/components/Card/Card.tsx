import React, { PureComponent } from 'react';
import './Card.scss';

interface IProps {
    className?: string;
    flat?: boolean;
    badge?: JSX.Element;
    dark?: boolean;
    withoutPadding?: boolean;
}

class Card extends PureComponent<IProps> {
    render(): JSX.Element {
        const { children, className, flat, badge, dark, withoutPadding } = this.props;

        return (
            <div>
                <div
                    className={`${withoutPadding ? '' : 'p-3 py-4 p-sm-4 p-xl-5'} position-relative app-card ${
                        flat && 'flat'
                    } ${dark && 'dark'} ${className}`}
                >
                    <div className="badge-position">{badge}</div>
                    {children}
                </div>
            </div>
        );
    }
}

export default Card;
