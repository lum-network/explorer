import React from 'react';
import { i18n } from 'utils';
import { Card } from 'frontend-elements';
import { Link } from 'react-router-dom';
import { NavigationConstants } from 'constant';
import { KpiCard, Rating } from 'components';
import numeral from 'numeral';

import merchantsLogo from 'assets/images/merchants.svg';
import totalReviewsLogo from 'assets/images/totalReviews.svg';
import validatedLogo from 'assets/images/validated.svg';
import pendingLogo from 'assets/images/pending.svg';
import rejectedLogo from 'assets/images/rejected.svg';
import mediaLogo from 'assets/images/media.svg';
import rewardsLogo from 'assets/images/rewards.svg';

import './MerchantPage.scss';
import ReviewsChart from './components/ReviewsChart';
import RatingsChart from './components/RatingsChart';
import CategoriesChart from './components/CategoriesChart';
import CommunityChart from './components/CommunityChart';

const merchant = {
    name: 'Camper',
    logo: 'https://via.placeholder.com/50',
    verifiedBy: {
        name: 'Net Reviews',
        url: 'https://www.netreviews.com/',
    },
    wallet: 'lum21hceakg4q4dxveygdxwz36wuwy7ak6xmc0yyt2',
    rating: 4.5,
    reviews: {
        total: 902201,
        pending: 902201,
        validated: 902201,
        rejected: 902201,
    },
    rewards: 9028201,
    medias: 2010,
};

const MerchantPage = (): JSX.Element => {
    return (
        <div className="merchant">
            <h2 className="mt-3 mb-4">
                <img alt="" src={merchantsLogo} className="merchant-title-logo" /> {i18n.t('merchantDetails')}&nbsp;&nbsp;
            </h2>
            <Card className="mb-5">
                <div className="row g-3 g-lg-4 g-xl-5">
                    <div className="col-12 col-lg-6">
                        <h4 className="mb-2">{i18n.t('merchant')}</h4>
                        <img src={merchant.logo} className="merchant-logo" />
                    </div>
                    <div className="col-12 col-lg-6">
                        <h4 className="mb-2">{i18n.t('verifiedBy')}</h4>
                        <a href={merchant.verifiedBy.url} target="_blank" rel="noreferrer">
                            {merchant.verifiedBy.name}
                        </a>
                    </div>
                    <div className="col-12 col-lg-6 text-truncate">
                        <h4 className="mb-2">{i18n.t('merchantWallet')}</h4>
                        <Link className="text-truncate" to={`${NavigationConstants.ACCOUNT}/${merchant.wallet}`}>
                            {merchant.wallet}
                        </Link>
                    </div>
                    <div className="col-12 col-lg-6">
                        <h4 className="mb-2">{i18n.t('rating')}</h4>
                        <div className="rating">
                            {merchant.rating}/5
                            <Rating className="mb-1 ms-3" initialRating={merchant.rating} size={25} />
                        </div>
                    </div>
                </div>
            </Card>
            <h2 className="mt-3 mb-4">{i18n.t('overview')}</h2>
            <div className="row mb-4">
                <div className="col-lg-3 col-sm-6">
                    <KpiCard color={'#FFC107'} title={i18n.t('totalReviews')} logo={totalReviewsLogo}>
                        {numeral(merchant.reviews.total).format('0,0')}
                    </KpiCard>
                </div>
                <div className="col-lg-3 col-sm-6">
                    <KpiCard color={'#F06451'} title={i18n.t('rewards')} logo={rewardsLogo}>
                        {numeral(merchant.reviews.total).format('0,0')}
                    </KpiCard>
                </div>
                {/* <div className="col-lg-3 col-sm-6">
                    <KpiCard color={'#FFC107'} title={i18n.t('qanda')} logo={qAndALogo}>
                        {numeral(merchant.qAndA).format('0,0')}
                    </KpiCard>
                </div> */}
                <div className="col-lg-3 col-sm-6">
                    <KpiCard color={'#000'} title={i18n.t('medias')} className="media-kpi-card" logo={mediaLogo}>
                        {numeral(merchant.medias).format('0,0')}
                    </KpiCard>
                </div>
                <div className="col-lg-3 col-sm-6">
                    <KpiCard color={'#FFC107'} title={i18n.t('validatedReviews')} logo={validatedLogo}>
                        {numeral(merchant.reviews.validated).format('0,0')}
                    </KpiCard>
                </div>
                <div className="col-lg-3 col-sm-6">
                    <KpiCard color={'#FFC107'} title={i18n.t('pendingReviews')} logo={pendingLogo}>
                        {numeral(merchant.reviews.pending).format('0,0')}
                    </KpiCard>
                </div>
                <div className="col-lg-3 col-sm-6">
                    <KpiCard color={'#FFC107'} title={i18n.t('rejectedReviews')} logo={rejectedLogo}>
                        {numeral(merchant.reviews.rejected).format('0,0')}
                    </KpiCard>
                </div>
            </div>
            <div className="row mb-4">
                <ReviewsChart />
                <RatingsChart />
                <CommunityChart />
                <CategoriesChart />
            </div>
        </div>
    );
};

export default MerchantPage;
