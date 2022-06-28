import React from 'react';
import { Rating } from 'components';
import { Card } from 'frontend-elements';
import beamRatingLogo from 'assets/images/beamUpdateRating.svg';
import beamRewardLogo from 'assets/images/beamReward.svg';

import BeamStatusUpdateCard from './BeamStatusUpdateCard';
import BeamStatusHeader from './BeamStatusHeader';
import { i18n } from 'utils';

interface Props {
    infos: { merchant: string; verifier: string; rating: number; amount: number };
    date: string;
    withLine?: boolean;
}

const BeamOpen = ({ date, infos, withLine }: Props): JSX.Element => {
    return (
        <>
            <BeamStatusHeader date={date} status="Open" />
            <BeamStatusUpdateCard withLine={withLine}>
                <Card className="status-update-card">
                    <div>
                        <div className="d-flex flex-row align-items-center mb-5">
                            <div className="status-update-icon"></div>
                            <h4 className="fw-normal">{i18n.t('beamMerchantAdded')}</h4>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-5">
                            <div className="status-update-icon"></div>
                            <h4 className="fw-normal">{i18n.t('beamVerifierAdded')}</h4>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-5">
                            <div className="status-update-icon">
                                <img src={beamRatingLogo} />
                            </div>
                            <div className="d-flex flex-row align-items-center beam ratings-number">
                                {`${infos.rating}/5`}
                                <Rating className="ms-4 mb-2" size={26} initialRating={infos.rating} />
                            </div>
                        </div>
                        <div className="d-flex flex-row align-items-center">
                            <div className="status-update-icon">
                                <img src={beamRewardLogo} />
                            </div>
                            <h4 className="fw-normal">{i18n.t('beamRewardAdded')}</h4>
                        </div>
                    </div>
                    <h1 className="display-4">{infos.amount}$</h1>
                </Card>
            </BeamStatusUpdateCard>
        </>
    );
};

export default BeamOpen;