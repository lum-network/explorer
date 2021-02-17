import React, { PureComponent } from 'react';
import { TextInput } from 'components';
import './Search.scss';

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

        return (
            <div className="search-container">
                <TextInput value={text} onChangeText={this.onChangeText} />
            </div>
        );
    }
}

export default Search;
