import React from 'react';
import { Card } from 'frontend-elements';
import star from 'assets/images/starFull.svg';
import './MerchantsOTW.scss';
import { i18n } from 'utils';
import { LUMKI } from 'constant/constant/navigation';

const shops = [
    {
        name: 'Shop 1 with a very very long name you know',
        logo: 'https://via.placeholder.com/50',
        reviews: 19281,
        stars: 4.9,
        storeIdUrlSafe: 'shop-1',
    },
    {
        name: 'Shop 2',
        logo: 'https://via.placeholder.com/50',
        reviews: 19281,
        stars: 4.9,
        storeIdUrlSafe: 'shop-2',
    },
    {
        name: 'Shop 3',
        logo: 'https://via.placeholder.com/50',
        reviews: 19281,
        stars: 4.9,
        storeIdUrlSafe: 'shop-3',
    },
    {
        name: 'Shop 4',
        logo: 'https://via.placeholder.com/50',
        reviews: 19281,
        stars: 4.9,
        storeIdUrlSafe: 'shop-4',
    },
    {
        name: 'Shop 5',
        logo: 'https://via.placeholder.com/50',
        reviews: 19281,
        stars: 4.9,
        storeIdUrlSafe: 'shop-5',
    },
];

const MerchantsOTW = (): JSX.Element => {
    const renderShop = (shop: { name: string; logo: string; reviews: number; stars: number; storeIdUrlSafe: string }, index: number): JSX.Element => {
        return (
            <div key={'merchant-otw-' + index} className="shop-card">
                <div className="d-flex flex-row align-items-center text-truncate">
                    <div className={`rank ${index === 0 ? 'first' : ''} me-2 me-sm-4`}>{index + 1}</div>
                    <img src={shop.logo} alt={shop.name} className="d-none d-sm-block me-2 me-sm-4" />
                    <a href={`${LUMKI}/shops/${shop.storeIdUrlSafe}`} target="_blank" rel="noreferrer" className="text-truncate">
                        {shop.name}
                    </a>
                </div>
                <div className="d-flex flex-row align-items-center">
                    <div className="reviews mx-2 mx-sm-4 text-nowrap">
                        {shop.reviews} {i18n.t('reviews')}
                    </div>
                    <div className="stars">
                        {shop.stars}/5
                        <img src={star} className="ms-1" alt="stars" />
                    </div>
                </div>
            </div>
        );
    };

    return (
        <Card>
            <h1 className="mb-4">{i18n.t('merchantsOTW')}</h1>
            {shops.map((shop, index) => renderShop(shop, index))}
        </Card>
    );
};

export default MerchantsOTW;
