import React from 'react';
import numeral from 'numeral';

import { Rating } from 'components';
import { Card } from 'frontend-elements';
import { EventModel } from 'models';
import { i18n } from 'utils';

import beamDescLogo from 'assets/images/beamUpdateDesc.svg';
import beamImageLogo from 'assets/images/beamUpdateImage.svg';
import beamRatingLogo from 'assets/images/beamUpdateRating.svg';

import BeamStatusHeader from './BeamStatusHeader';
import BeamStatusUpdateCard from './BeamStatusUpdateCard';

interface Props {
    event: EventModel;
    date: string;
    key: string;
}

const BeamUpdate = ({ event, date, key }: Props): JSX.Element => {
    return (
        <>
            <BeamStatusHeader date={date} status={i18n.t('update')} />
            <BeamStatusUpdateCard>
                {event.value.data && event.value.data.productsReviews.length > 0 ? (
                    <Card className="status-update-card mb-4">
                        {event.value.data.productsReviews.map((productReview, index) => (
                            <div key={`${key}-product-review-${productReview.reviewId}`}>
                                <h6 className="mb-4 text-uppercase opacity-50">{numeral(index + 1).format('0o')} Product</h6>
                                {!!(productReview.content.overall || productReview.content.pros || productReview.content.cons) && (
                                    <div className="d-flex flex-row align-items-center mb-5">
                                        <div className="status-update-icon">
                                            <img src={beamDescLogo} />
                                        </div>
                                        <h4 className="fw-normal">{i18n.t('beamDescriptionAdded')}</h4>
                                    </div>
                                )}
                                {!!productReview.media && (
                                    <div className="d-flex flex-row align-items-center mb-5">
                                        <div className="status-update-icon">
                                            <img src={beamImageLogo} />
                                        </div>
                                        <h4 className="fw-normal">{i18n.t('beamImageAdded')}</h4>
                                    </div>
                                )}
                                {!!productReview.ratings.overall && (
                                    <div className="d-flex flex-row align-items-center mb-5">
                                        <div className="status-update-icon">
                                            <img src={beamRatingLogo} />
                                        </div>
                                        <div className="d-flex flex-row align-items-center beam ratings-number">
                                            {`${productReview.ratings.overall}/5`}
                                            <Rating className="ms-4 mb-2" size={26} initialRating={productReview.ratings.overall} />
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                        {!!event.value.data?.reward ? (
                            <h1 className="display-4 mt-4 mt-lg-0 ms-2 ms-lg-0">
                                {event.value.data.reward.amount} {event.value.data.reward.currency}
                            </h1>
                        ) : null}
                    </Card>
                ) : null}
                {event.value.data && event.value.data.merchantReview && (
                    <Card className="status-update-card">
                        <div>
                            {event.value.data.merchantReview.ratings.overall && (
                                <div className="d-flex flex-row align-items-center mb-5">
                                    <div className="status-update-icon">
                                        <img src={beamRatingLogo} />
                                    </div>
                                    <div className="d-flex flex-row align-items-center beam ratings-number">
                                        {`${event.value.data.merchantReview.ratings.overall}/5`}
                                        <Rating className="ms-4 mb-2" size={26} initialRating={event.value.data.merchantReview.ratings.overall} />
                                    </div>
                                </div>
                            )}
                            {(event.value.data.merchantReview.content.overall || event.value.data.merchantReview.content.customerService) && (
                                <div className="d-flex flex-row align-items-center mb-5">
                                    <div className="status-update-icon">
                                        <img src={beamDescLogo} />
                                    </div>
                                    <h4 className="fw-normal">{i18n.t('beamMerchantReviewAdded')}</h4>
                                </div>
                            )}
                        </div>
                        {!!event.value.data.reward ? (
                            <h1 className="display-4 mt-4 mt-lg-0 ms-2 ms-lg-0">
                                {event.value.data.reward.amount} {event.value.data.reward.currency}
                            </h1>
                        ) : null}
                    </Card>
                )}
            </BeamStatusUpdateCard>
        </>
    );
};

export default BeamUpdate;
