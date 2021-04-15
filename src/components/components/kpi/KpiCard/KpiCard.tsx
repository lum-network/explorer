import React from 'react';
import './KpiCard.scss';
import { Card } from 'frontend-elements';

interface IProps {
    children?: React.ReactNode;
    className?: string;
    title: string;
    logo: string;
}

const KpiCard = (props: IProps): JSX.Element => {
    const { className, children, title, logo } = props;

    return (
        <Card withoutPadding className={`mb-3 p-4 ${className}`}>
            <h4 className="mb-3">
                <img alt="logo" src={logo} /> {title}
            </h4>
            <h6>{children}</h6>
        </Card>
    );
};

export default KpiCard;
