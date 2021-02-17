import React, { PureComponent } from 'react';
import './Input.scss';

interface IProps {
    value: string;
    onChangeText: (text: string) => void;
    onSubmit: () => void;
    icon?: string;
    placeholder?: string;
}

class TextInput extends PureComponent<IProps> {
    onSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        const { onSubmit } = this.props;

        e.preventDefault();

        onSubmit();
    };

    renderIcon(): JSX.Element | null {
        const { icon } = this.props;

        if (!icon) {
            return null;
        }

        return <img alt="icon" className="icon-input" src={icon} />;
    }

    render(): JSX.Element {
        const { onChangeText, value, placeholder } = this.props;

        return (
            <form onSubmit={this.onSubmit} className="position-relative">
                {this.renderIcon()}
                <input
                    type="text"
                    className="text w-100"
                    value={value}
                    onChange={(event) => onChangeText(event.target.value)}
                    placeholder={placeholder}
                />
            </form>
        );
    }
}

export default TextInput;
