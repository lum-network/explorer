import React from 'react';
import { Card } from 'frontend-elements';

import beamDescLogo from 'assets/images/beamUpdateDesc.svg';
import beamImageLogo from 'assets/images/beamUpdateImage.svg';
import beamRatingLogo from 'assets/images/beamUpdateRating.svg';

import BeamStatusHeader from './BeamStatusHeader';
import BeamStatusUpdateCard from './BeamStatusUpdateCard';
import { i18n } from 'utils';
import { EventModel } from 'models';
import { Rating } from 'components';
import numeral from 'numeral';

interface Props {
    event: EventModel;
    index: number;
    date: string;
    key: string;
}

const BeamUpdate = ({ index, event, date, key }: Props): JSX.Element => {
    const isThereNewInfos = event.value.data && event.value.data.productsReviews && event.value.data.productsReviews.length > 0;

    return (
        <>
            <BeamStatusHeader date={date} status={i18n.t('update')} index={index} />
            <BeamStatusUpdateCard>
                {isThereNewInfos ? (
                    <Card className="status-update-card">
                        {event.value.data?.productsReviews.map((productReview, index) => (
                            <div key={`${key}-product-review-${productReview.reviewId}`}>
                                <h6 className="mb-4 text-uppercase opacity-50">{numeral(index + 1).format('0o')} Product</h6>
                                {!!productReview.content && (
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
                                            {`${productReview.ratings.overall / 2}/5`}
                                            <Rating className="ms-4 mb-2" size={26} initialRating={productReview.ratings.overall / 2} />
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
            </BeamStatusUpdateCard>
        </>
    );
};

export default BeamUpdate;
