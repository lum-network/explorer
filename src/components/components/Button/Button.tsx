import React, { PureComponent } from 'react';
import './Button.scss';

interface IProps {
    outline?: boolean;
    onPress: () => void;
}

class Button extends PureComponent<IProps> {
    render(): JSX.Element {
        const { children, onPress, outline } = this.props;

        return (
            <div onClick={onPress} className={`app-btn ${outline ? 'app-btn-outline' : 'app-btn-plain'}`}>
                {children}
            </div>
        );
    }
}

export default Button;
