import React, { PureComponent } from 'react';
import './Input.scss';

interface IProps {
    value: string;
    onChangeText: (text: string) => void;
}

class TextInput extends PureComponent<IProps> {
    render(): JSX.Element {
        const { onChangeText, value } = this.props;

        return <input className="text" value={value} onChange={(event) => onChangeText(event.target.value)} />;
    }
}

export default TextInput;
