import React from 'react';
import RRating, { RatingComponentProps } from 'react-rating';
import starFull from 'assets/images/starFull.svg';
import starEmpty from 'assets/images/starEmpty.svg';

interface IProps extends RatingComponentProps {
    size?: number;
}

const Rating = ({ size = 22, ...rest }: IProps): JSX.Element => {
    return (
        <RRating
            emptySymbol={<img width={size} height={size} src={starEmpty} alt={'Empty star'} />}
            fullSymbol={<img width={size} height={size} src={starFull} alt={'Full star'} />}
            readonly
            quiet
            {...rest}
        />
    );
};

export default Rating;
