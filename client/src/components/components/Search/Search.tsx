import React, { PureComponent } from 'react';
import { TextInput } from 'components';

interface IProps {}

interface IState {
    text: string;
}

class Search extends PureComponent<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            text: '',
        };
    }

    onChangeText = (text: string): void => {
        this.setState({ text });
    };

    render(): JSX.Element {
        const { text } = this.state;

        return <TextInput value={text} onChangeText={this.onChangeText} />;
    }
}

export default Search;
