import React, { PureComponent } from 'react';
import './KpiCard.scss';
import { Card } from 'components/index';

interface IProps {
    className?: string;
    title: string;
    logo: string;
}

class KpiCard extends PureComponent<IProps> {
    render(): JSX.Element | null {
        const { className, children, title, logo } = this.props;

        return (
            <Card withoutPadding className={`mb-3 p-4 ${className}`}>
                <h4 className="mb-3">
                    <img alt="logo" src={logo} /> {title}
                </h4>
                <h6>{children}</h6>
            </Card>
        );
    }
}

export default KpiCard;
