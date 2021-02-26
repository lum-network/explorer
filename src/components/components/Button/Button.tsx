import React, { PureComponent } from 'react';
import './Button.scss';

interface IProps {
    outline?: boolean;
    onPress: () => void;
    className?: string;
}

class Button extends PureComponent<IProps> {
    render(): JSX.Element {
        const { children, onPress, outline, className } = this.props;

        return (
            <div onClick={onPress} className={`app-btn ${outline ? 'app-btn-outline' : 'app-btn-plain'} ${className}`}>
                {children}
            </div>
        );
    }
}

export default Button;
