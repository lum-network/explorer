import React from 'react';
import { Card } from 'frontend-elements';
import './PromotionCard.scss';

interface IProps {
    title: string;
    description: string;
    cta: string;
    image: string;
    link: string;
}

const PromotionCard = ({ title, cta, description, image, link }: IProps): JSX.Element => {
    return (
        <Card withoutPadding className="h-100 d-flex flex-column position-relative">
            <div className="p-3 py-4 p-sm-4 p-xl-5 d-flex justify-content-between h-100 order-2">
                <div>
                    <h3 className="promotion-title mb-2">{title}</h3>
                    <p className="mb-3" dangerouslySetInnerHTML={{ __html: description }} />
                    <a className="app-btn app-btn-plain" href={link} target="_blank" rel="noreferrer">
                        {cta}
                    </a>
                </div>
            </div>
            <div className="promotion-image-container">
                <img className="promotion-image" src={image} alt={title} />
            </div>
        </Card>
    );
};

export default PromotionCard;
