import React from 'react';

import { Rating } from 'components';
import { Card } from 'frontend-elements';
import { i18n, NumbersUtils } from 'utils';
import { CoinModel } from 'models';

import beamDescLogo from 'assets/images/beamUpdateDesc.svg';
import beamImageLogo from 'assets/images/beamUpdateImage.svg';
import beamRatingLogo from 'assets/images/beamUpdateRating.svg';
import beamRewardLogo from 'assets/images/beamReward.svg';
import lumLogo from 'assets/images/lum.svg';

import BeamStatusUpdateCard from './BeamStatusUpdateCard';
import BeamStatusHeader from './BeamStatusHeader';
import numeral from 'numeral';

interface Props {
    infos: { hasMerchantReview?: boolean; rating?: number; amount?: CoinModel };
    productsReviews?: { id: string; hasContent: boolean; hasMedia: boolean; rating: number }[];
    date: string;
    withLine?: boolean;
}

const BeamOpen = ({ date, infos, productsReviews, withLine }: Props): JSX.Element => {
    return (
        <>
            <BeamStatusHeader date={date} status={i18n.t('open')} />
            <BeamStatusUpdateCard withLine={withLine}>
                {productsReviews && productsReviews.length > 0 && (
                    <Card className="status-update-card mb-4">
                        {productsReviews.map((productReview, index) => (
                            <div key={`product-review-${productReview.id}`}>
                                <h6 className="mb-4 text-uppercase opacity-50">{numeral(index + 1).format('0o')} Product</h6>
                                {productReview.hasContent && (
                                    <div className="d-flex flex-row align-items-center mb-5">
                                        <div className="status-update-icon">
                                            <img src={beamDescLogo} />
                                        </div>
                                        <h4 className="fw-normal">{i18n.t('beamDescriptionAdded')}</h4>
                                    </div>
                                )}
                                {productReview.hasMedia && (
                                    <div className="d-flex flex-row align-items-center mb-5">
                                        <div className="status-update-icon">
                                            <img src={beamImageLogo} />
                                        </div>
                                        <h4 className="fw-normal">{i18n.t('beamImageAdded')}</h4>
                                    </div>
                                )}
                                {productReview.rating && (
                                    <div className="d-flex flex-row align-items-center mb-5">
                                        <div className="status-update-icon">
                                            <img src={beamRatingLogo} />
                                        </div>
                                        <div className="d-flex flex-row align-items-center beam ratings-number">
                                            {`${productReview.rating / 2}/5`}
                                            <Rating className="ms-4 mb-2" size={26} initialRating={productReview.rating / 2} />
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </Card>
                )}
                <Card className="status-update-card">
                    <div>
                        {infos.rating && (
                            <div className="d-flex flex-row align-items-center mb-5">
                                <div className="status-update-icon">
                                    <img src={beamRatingLogo} />
                                </div>
                                <div className="d-flex flex-row align-items-center beam ratings-number">
                                    {`${infos.rating / 2}/5`}
                                    <Rating className="ms-4 mb-2" size={26} initialRating={infos.rating / 2} />
                                </div>
                            </div>
                        )}
                        {infos.hasMerchantReview && (
                            <div className="d-flex flex-row align-items-center mb-5">
                                <div className="status-update-icon">
                                    <img src={beamDescLogo} />
                                </div>
                                <h4 className="fw-normal">{i18n.t('beamMerchantReviewAdded')}</h4>
                            </div>
                        )}
                        {infos.amount && NumbersUtils.convertUnitNumber(infos.amount.amount) > 0 && (
                            <div className="d-flex flex-row align-items-center">
                                <div className="status-update-icon">
                                    <img src={beamRewardLogo} />
                                </div>
                                <h4 className="fw-normal">{i18n.t('beamRewardAdded')}</h4>
                            </div>
                        )}
                    </div>
                    <h1 className="display-4 mt-4 mt-lg-0 ms-2 ms-lg-0">
                        {infos.amount ? NumbersUtils.formatNumber(infos.amount, true) : 0}
                        <span className="lum-logo ms-2">
                            <img src={lumLogo} height={28} />
                        </span>
                    </h1>
                </Card>
            </BeamStatusUpdateCard>
        </>
    );
};

export default BeamOpen;
