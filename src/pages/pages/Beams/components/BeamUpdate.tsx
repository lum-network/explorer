import React from 'react';
import { Card } from 'frontend-elements';

import beamDescLogo from 'assets/images/beamUpdateDesc.svg';
import beamImageLogo from 'assets/images/beamUpdateImage.svg';
import beamRewardLogo from 'assets/images/beamReward.svg';
import beamRatingLogo from 'assets/images/beamUpdateRating.svg';

import BeamStatusHeader from './BeamStatusHeader';
import BeamStatusUpdateCard from './BeamStatusUpdateCard';
import { i18n } from 'utils';

interface Props {
    reward?: number;
    description?: string;
    image?: { url: string };
    rating?: number;
    index: number;
    date: string;
}

const BeamUpdate = ({ index, reward, description, image, rating, date }: Props): JSX.Element => {
    const isThereNewInfos = reward || description || image || rating;

    return (
        <>
            <BeamStatusHeader date={date} status={i18n.t('update')} index={index} />
            <BeamStatusUpdateCard>
                {isThereNewInfos ? (
                    <Card className="status-update-card">
                        <div>
                            {!!description && (
                                <div className="d-flex flex-row align-items-center mb-5">
                                    <div className="status-update-icon">
                                        <img src={beamDescLogo} />
                                    </div>
                                    <h4 className="fw-normal">{i18n.t('beamDescriptionAdded')}</h4>
                                </div>
                            )}
                            {!!image && (
                                <div className="d-flex flex-row align-items-center mb-5">
                                    <div className="status-update-icon">
                                        <img src={beamImageLogo} />
                                    </div>
                                    <h4 className="fw-normal">{i18n.t('beamImageAdded')}</h4>
                                </div>
                            )}
                            {!!rating && (
                                <div className="d-flex flex-row align-items-center mb-5">
                                    <div className="status-update-icon">
                                        <img src={beamRatingLogo} />
                                    </div>
                                    <h4 className="fw-normal">{i18n.t('beamRatingAdded')}</h4>
                                </div>
                            )}
                            {reward ? (
                                <div className="d-flex flex-row align-items-center">
                                    <div className="status-update-icon">
                                        <img src={beamRewardLogo} />
                                    </div>
                                    <h4 className="fw-normal">{i18n.t('beamRewardAdded')}</h4>
                                </div>
                            ) : null}
                        </div>
                        <h1 className="display-4 mt-4 mt-lg-0 ms-2 ms-lg-0">{reward}$</h1>
                    </Card>
                ) : null}
            </BeamStatusUpdateCard>
        </>
    );
};

export default BeamUpdate;
