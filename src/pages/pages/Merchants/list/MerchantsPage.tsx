import { Kpi, Rating } from 'components';
import { KpiType, NavigationConstants } from 'constant';
import React, { useEffect, useState } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { renderToString } from 'react-dom/server';
import ReactTooltip from 'react-tooltip';
import star from 'assets/images/starFull.svg';

import '../Merchants.scss';

const shops = [
    'Asos',
    'Abercrombie',
    'Acer',
    'Adidas',
    'Apple',
    'Armani',
    'Asics',
    'Asus',
    'Alexander McQueen',
    'Alice & Olivia',
    'American Eagle',
    'Armani Exchange',
    'Antonelli',
    'Antony Morato',
    'American Apparel',
    'American Vintage',
    'B&G',
    'Burberry',
    'Calvin Klein',
    'Chanel',
    'Coach',
    'Dior',
    'Dolce & Gabbana',
    'D&G',
    'Emporia',
    'Fendi',
    'Ferragamo',
    'Fila',
    'Givenchy',
    'Giorgio Armani',
    'Givens',
    'Gucci',
];

const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

interface IProps extends RouteComponentProps<{ id: string }> {}

const MerchantsPage = (props: IProps): JSX.Element => {
    const [selectedLetter, setSelectedLetter] = useState<string | null>(null);

    const { hash } = props.location;

    useEffect(() => {
        if (hash) {
            setSelectedLetter(hash.slice(1));
        }
    }, [hash]);

    const renderSection = (letter: string, showAll?: boolean) => {
        const items = shops.filter((shop) => shop.toUpperCase().startsWith(letter));

        return (
            <div className="merchants-section my-5">
                <div className="d-flex flex-row align-items-center justify-content-between">
                    <h1 className="display-1 fw-bold mb-4">{letter}</h1>
                    <div className="app-badge info">
                        <p className="text">{items.length} merchants</p>
                    </div>
                </div>
                <div className="container-fluid p-0">
                    <div className="row row-cols-2 row-cols-lg-4 gy-3 gx-0">{renderList(showAll ? items : items.slice(0, 32))}</div>
                </div>
            </div>
        );
    };

    const renderList = (shops: string[]): JSX.Element[] => {
        return shops.map((shop) => (
            <div key={shop} className="col merchant">
                <a
                    href="#"
                    data-html={true}
                    data-tip={renderToString(
                        <div className={'shop-card'}>
                            <div className={`shop-infos`}>{shop}</div>
                            <div className="information">
                                <div className={`reviews-container`}>
                                    <div className="reviews-number">28 reviews</div>
                                    <Rating size={14} initialRating={4.8} />
                                </div>
                                <div className="cashback">
                                    4.8/5{' '}
                                    <span>
                                        <img src={star} />
                                    </span>
                                </div>
                            </div>
                        </div>,
                    )}
                    data-for={`React-tooltip__${shop}`}
                    data-padding="0px 0px"
                >
                    {shop}
                    <ReactTooltip id={`React-tooltip__${shop}`} border={false} arrowColor="transparent" className="merchant-tooltip" />
                </a>
            </div>
        ));
    };

    return (
        <>
            <h2 className="mt-5">Overview</h2>
            <Kpi className="mt-3" types={[KpiType.REVIEWS, KpiType.MERCHANTS, KpiType.REWARDS, KpiType.QANDA]} />
            <div className="mt-5 d-flex flex-row justify-content-between">
                {alphabet.map((letter) => (
                    <Link key={letter} className="letter-btn" to={`${NavigationConstants.MERCHANTS}#${letter}`}>
                        {letter}
                    </Link>
                ))}
            </div>
            {selectedLetter ? renderSection(selectedLetter, true) : alphabet.map((letter) => renderSection(letter))}
        </>
    );
};

export default MerchantsPage;
