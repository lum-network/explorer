import React from 'react';
import './KpiCard.scss';
import { Card } from 'frontend-elements';

interface IProps {
    children?: React.ReactNode;
    className?: string;
    title: string;
    logo?: string;
    additionalInfo?: string;
    color?: string;
    flat?: boolean;
    dark?: boolean;
}

const KpiCard = (props: IProps): JSX.Element => {
    const { flat, dark, className, children, title, logo, additionalInfo, color } = props;

    return (
        <Card dark={dark} flat={flat} withoutPadding className={`p-4 ${className}`}>
            <h4 className="mb-3" style={{ color: dark ? '#FFFFFF' : color }}>
                {logo && <img style={{ filter: color ? 'inherit' : '' }} alt="logo" src={logo} />} {title}
            </h4>
            <div className="d-flex flex-row justify-content-between align-items-start">
                <h6>{children}</h6>
                <span className="text-muted kpi-additional-info">{additionalInfo}</span>
            </div>
        </Card>
    );
};

export default KpiCard;
