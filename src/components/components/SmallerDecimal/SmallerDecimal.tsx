import React from 'react';

interface IProps {
    nb: string;
}

const SmallerDecimal = ({ nb }: IProps): JSX.Element => {
    const split = nb.split('.');

    if (split.length > 1) {
        return (
            <span>
                {split[0]}
                <small>.{split[1]}</small>
            </span>
        );
    }

    return <span>{nb}</span>;
};

export default SmallerDecimal;
