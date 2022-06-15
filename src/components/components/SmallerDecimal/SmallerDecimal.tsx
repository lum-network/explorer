import React from 'react';
import './SmallerDecimal.scss';

interface IProps {
    nb: string;
}

const SmallerDecimal = ({ nb }: IProps): JSX.Element => {
    if (parseFloat(nb) <= 0 || !parseFloat(nb)) {
        return <span>0</span>;
    }

    const split = nb.split('.');

    if (split.length > 1) {
        return (
            <span className="smaller-decimal">
                {split[0]}
                <small>.{split[1]}</small>
            </span>
        );
    }

    return <span>{nb}</span>;
};

export default SmallerDecimal;
